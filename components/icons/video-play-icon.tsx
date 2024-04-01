import { useState } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import VideoPopup from "../courses/video-popup";

interface VideoPlayIconProps {
  isFree: boolean;
  videoUrl: string | null;
}
const VideoPlayIcon = ({ isFree, videoUrl }: VideoPlayIconProps) => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const openVideoPopup = () => {
    if (isFree) {
      setShowVideoPopup(true);
    }
    // Here you can add logic to open the video popup
  };
  const closeVideoPopup = () => {
    setShowVideoPopup(false);
  };
  return (
    <div className="relative inline-block">
      <IoMdPlayCircle className="w-20 h-20 text-rose-500 cursor-pointer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full animate-ping absolute inset-0 border-2 border-rose-500 cursor-pointer"
          onClick={openVideoPopup}
        ></div>
      </div>
      {showVideoPopup && (
        <VideoPopup videoUrl={videoUrl as string} onClose={closeVideoPopup} />
      )}
    </div>
  );
};

export default VideoPlayIcon;
