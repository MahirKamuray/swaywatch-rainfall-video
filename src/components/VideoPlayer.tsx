
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface VideoPlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ open, onOpenChange }) => {
  const [currentVideo, setCurrentVideo] = useState(1);
  const totalVideos = 3;

  const handlePrevVideo = () => {
    setCurrentVideo((prev) => (prev === 1 ? totalVideos : prev - 1));
  };

  const handleNextVideo = () => {
    setCurrentVideo((prev) => (prev === totalVideos ? 1 : prev + 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[80vh] p-0 border-none bg-transparent">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={handlePrevVideo}
            className="absolute left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNextVideo}
            className="absolute right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <video
            className="w-auto h-full rounded-lg"
            src={`mainpage/Videos/${currentVideo}.mp4`}
            controls
            autoPlay
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
