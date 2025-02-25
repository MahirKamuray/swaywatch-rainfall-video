
import { useEffect, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FallingImage } from "@/components/FallingImage";

const Index = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [fallingImages, setFallingImages] = useState<number[]>([]);
  const [windDirection, setWindDirection] = useState<"left" | "right" | null>(
    null
  );

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setFallingImages((prev) => [...prev, Date.now()]);
    }, 500);

    const windInterval = setInterval(() => {
      const newDirection = Math.random() > 0.5 ? "left" : "right";
      setWindDirection(newDirection);
      setTimeout(() => setWindDirection(null), 3000);
    }, Math.random() * 10000 + 5000);

    const cleanup = setInterval(() => {
      setFallingImages((prev) => prev.slice(-20));
    }, 5000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(windInterval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/Mainpage/BackGround/background.jpeg)",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      {fallingImages.map((id) => {
        const isHeart = Math.random() > 0.7;
        const imageSrc = isHeart
          ? "/Mainpage/Others/kalp.png"
          : `/Mainpage/Others/${Math.floor(Math.random() * 10) + 1}.jpeg`;

        return (
          <FallingImage
            key={id}
            src={imageSrc}
            isHeart={isHeart}
            windDirection={windDirection}
          />
        );
      })}

      <button
        onClick={() => setIsVideoOpen(true)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-red-500 text-white px-8 py-4 rounded-full text-base
                   transition-all duration-300 animate-bounce
                   hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        WATCH
      </button>

      <VideoPlayer open={isVideoOpen} onOpenChange={setIsVideoOpen} />
    </div>
  );
};

export default Index;
