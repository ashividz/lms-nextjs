import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { currentUser } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseSlug: string; chapterId: string };
}) => {
  const user = await currentUser();
  const userId = user?.id!;
  if (!user) {
    return redirect("/auth/login");
  }
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseSlug: params.courseSlug,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !userProgress?.isCompleted;
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-7xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={course.id}
            courseSlug={params.courseSlug}
            videoUrl={chapter.videoUrl!}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-md mx-4">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={course.id}
              courseSlug={params.courseSlug}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          </div>

          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
