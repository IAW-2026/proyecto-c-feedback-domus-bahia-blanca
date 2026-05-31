"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react"; 
import { useIsMobile } from "@/hooks/useIsMobile";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const handleClick = (star: number) => {
    setRating(star);
  };
  const isMobile = useIsMobile();
  return (
    <div className="flex gap-2 sm:gap-3 items-center justify-center w-full">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={isMobile ? {} : { scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(star)}
          className="focus:outline-none"
        >
          <Star
            size={36}
            className="md:w-10 lg:h-12"
            style={{
              fill: star <= rating ? "rgb(255, 215, 37)" : "transparent",
              color: star <= rating ? "rgb(255, 215, 37)" : "#EDE6DD",
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}