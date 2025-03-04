
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FallingImageProps {
  src: string;
  isHeart?: boolean;
  windDirection: "left" | "right" | null;
}

export const FallingImage: React.FC<FallingImageProps> = ({
  src,
  isHeart = false,
  windDirection,
}) => {
  const [startX] = useState(() => Math.random() * window.innerWidth);
  const size = isHeart ? "w-2 h-2" : "w-4 h-4";

  const getPath = () => {
    const baseY = window.innerHeight + 100;
    const windForce = windDirection ? (windDirection === "left" ? -200 : 200) : 0;
    return [
      [startX, -100],
      [startX + (Math.random() > 0.5 ? 50 : -50), baseY * 0.25],
      [startX + (Math.random() > 0.5 ? 50 : -50) + windForce, baseY * 0.75],
      [startX + windForce, baseY],
    ];
  };

  return (
    <motion.img
      src={src}
      className={`absolute ${size} object-cover rounded-full ${
        !isHeart && "animate-glow"
      }`}
      initial={{ 
        opacity: 0,
        y: -100,
        x: startX 
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, window.innerHeight],
        x: [
          startX,
          startX + (windDirection === "left" ? -100 : windDirection === "right" ? 100 : 0)
        ]
      }}
      transition={{
        duration: 5,
        ease: "linear",
        opacity: {
          times: [0, 0.1, 0.9, 1]
        }
      }}
    />
  );
};
