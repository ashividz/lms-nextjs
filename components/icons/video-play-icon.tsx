import { useState } from "react";
import { IoMdPlayCircle } from "react-icons/io";

const VideoPlayIcon = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handlePlayClick = () => {
    setShowPopup(true);
    // Here you can add logic to open the video popup
  };
  return (
    <div className="relative inline-block">
      <IoMdPlayCircle className="w-20 h-20 text-rose-500 cursor-pointer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full animate-ping absolute inset-0 border-2 border-rose-500 cursor-pointer"
          onClick={handlePlayClick}
        ></div>
      </div>
      {showPopup && (
        // Add your video player popup component here
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          {/* Your video player component goes here */}
          <div className="text-white">Video Player Popup</div>
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayIcon;
