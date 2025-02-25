
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
  const size = isHeart ? "w-4 h-4" : "w-12 h-12"; // Görsel boyutlarını artıralım

  const getPath = () => {
    const baseY = window.innerHeight + 100;
    const windForce = windDirection ? (windDirection === "left" ? -200 : 200) : 0;
    
    // Daha belirgin bir düşme hareketi için yolu güncelleyelim
    const path = [
      [startX, -100], // Başlangıç noktası
      [startX + (Math.random() * 200 - 100), baseY * 0.3], // İlk kontrol noktası
      [startX + (Math.random() * 200 - 100) + windForce, baseY * 0.6], // İkinci kontrol noktası
      [startX + windForce * 1.5, baseY] // Bitiş noktası
    ];
    
    return path;
  };

  return (
    <motion.img
      src={src}
      className={`absolute ${size} object-cover rounded-full select-none pointer-events-none`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        offsetDistance: "100%",
      }}
      style={{
        offsetPath: `path("M ${getPath()
          .map((point) => point.join(" "))
          .join(" L ")}")`,
      }}
      transition={{
        duration: 8, // Düşme süresini artıralım
        ease: "linear",
        offsetDistance: {
          duration: 8,
          ease: "linear"
        }
      }}
    />
  );
};
