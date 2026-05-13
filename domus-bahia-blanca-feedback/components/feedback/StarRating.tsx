"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react"; 

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRating(star)}
          className="focus:outline-none"
        >
          <Star
            size={32}
            className={`transition-colors ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-transparent text-gray-300"
            }`}
          />
        </motion.button>
      ))}
      <span className="ml-2 text-sm font-medium text-gray-500">
        {rating > 0 ? `${rating} de 5 estrellas` : "Selecciona una nota"}
      </span>
    </div>
  );
}