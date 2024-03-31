import { X } from "lucide-react";
import VideoPlayer from "@/components/video-player";
import { useEffect, useState } from "react";

interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPopup = ({ videoUrl, onClose }: VideoPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          ></div>
          <div className="bg-white p-5 rounded-lg rounded-t-md relative">
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 z-10 p-2 text-gray-700"
            >
              <X size={20} />
            </button>
            <div
              className="relative rounded-md overflow-hidden"
              style={{ width: "785px", height: "440px" }}
            >
              <VideoPlayer videoUrl={videoUrl} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
