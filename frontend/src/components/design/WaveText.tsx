import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "../../utils/cn";

interface WavyTextProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
}
const WavyText = ({
  word,
  className,
  variant,
  duration = 0.5,
  delay = 0.05,
}: WavyTextProps) => {
  const defaultVariants = {
    hidden: { y: 20 },
    visible: { y: 0 },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => word.split(""), [word]);
  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {characters.map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={combinedVariants}
            transition={{
              yoyo: Infinity,
              duration: duration,
              delay: i * delay,
            }}
            className={cn(className)}
          >
            {char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WavyText;
