import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  previewUrls: string[] | null;
  isUploading: boolean;
}

const UploadButton = ({
  onClick,
  previewUrls,
  isUploading,
}: UploadButtonProps) => {
  return (
    <div>
      <Button
        variant="sky"
        onClick={onClick}
        disabled={!previewUrls?.length || isUploading}
        className={cn("", isUploading ? "bg-emerald-500 text-white" : "")}
      >
        {isUploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
};

export default UploadButton;
