import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface BlurIntProps {
  word: string | number;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: 0.5;
}
const BlurIn = ({ word, className, variant, duration }: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(className, " drop-shadow-sm")}
    >
      {word}
    </motion.h1>
  );
};

export default BlurIn;
