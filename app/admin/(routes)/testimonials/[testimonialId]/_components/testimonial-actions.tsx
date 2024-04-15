"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface TestimonialActionsProps {
  testimonialId: string;
  disabled?: boolean;
  isPublished?: boolean;
}

export const TestimonialActions = ({
  testimonialId,
  disabled,
  isPublished,
}: TestimonialActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/testimonials/${testimonialId}/unpublish`);
        toast.success("Testimonial unpublished successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        await axios.patch(`/api/testimonials/${testimonialId}/publish`);
        toast.success("Testimonial published successfully", {
          position: "top-center",
          autoClose: 5000,
        });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong while unpublishing testimonial", {
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
      await axios.delete(`/api/testimonials/${testimonialId}`);
      toast.success("Testimonial deleted successfully", {
        position: "top-center",
        autoClose: 5000,
      });

      router.push(`/admin/testimonials`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong while deleting testimonial", {
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
