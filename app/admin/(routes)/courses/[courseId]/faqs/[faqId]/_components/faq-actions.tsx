"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FaqActionProps {
  courseId: string;
  faqId: string;
  disabled?: boolean;
  isPublished?: boolean;
}

export const FaqActions = ({
  courseId,
  faqId,
  disabled,
  isPublished,
}: FaqActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/faqs/${faqId}/unpublish`);
        toast.success("Faq unpublished successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/faqs/${faqId}/publish`);
        toast.success("Faq published successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/faqs/${faqId}`);
      toast.success("Faq deleted successfully", {
        position: "top-center",
        autoClose: 5000,
      });

      router.push(`/admin/courses/${courseId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong while deleting faq", {
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
