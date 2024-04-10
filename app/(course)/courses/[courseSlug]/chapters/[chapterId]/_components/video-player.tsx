"use client";

import axios from "axios";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  courseSlug: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  videoUrl?: string;
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  courseSlug,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        if (nextChapterId) {
          router.push(`/courses/${courseSlug}/chapters/${nextChapterId}`);
        }

        toast.success("Progress updated");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  return (
    <div className="relative aspect-video rounded-md">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-md flex-col">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          <p className="text-sm text-white font-bold mt-2">Loading video...</p>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary rounded-md">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={videoUrl}
          onCanPlay={() => setIsReady(true)}
          playing={true}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                onContextMenu: (e: any) => e.preventDefault(),
              },
            },
          }}
          width="100%"
          height="100%"
          controls={true}
          light={false}
          pip={true}
          onEnded={onEnd}
        />
        // <MuxPlayer
        //   title={title}
        //   className={cn(!isReady && "hidden")}
        //   onCanPlay={() => setIsReady(true)}
        //   onEnded={onEnd}
        //   autoPlay
        //   playbackId={playbackId}
        // />
      )}
    </div>
  );
};
