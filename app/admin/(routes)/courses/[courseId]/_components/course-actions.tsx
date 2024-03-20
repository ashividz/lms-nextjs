"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseActionsProps {
  courseId: string;
  disabled?: boolean;
  isPublished?: boolean;
}

export const CourseActions = ({
  courseId,
  disabled,
  isPublished,
}: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published successfully", {
          position: "top-center",
          autoClose: 5000,
        });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong while unpublishing course", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully", {
        position: "top-center",
        autoClose: 5000,
      });

      router.push(`/admin/courses`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong while deleting course", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="destructive" size="sm" disabled={isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
