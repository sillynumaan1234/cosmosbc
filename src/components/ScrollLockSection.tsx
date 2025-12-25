import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollLockSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollLockSection = ({ children, className = "" }: ScrollLockSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Debounced state update to reduce forced reflows
  const updateLockState = useCallback((value: number) => {
    requestAnimationFrame(() => {
      setIsLocked(value > 0 && value < 0.8);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", updateLockState);
    return () => unsubscribe();
  }, [scrollYProgress, updateLockState]);

  return (
    <div ref={containerRef} className={`relative h-[200vh] ${className}`}>
      <motion.div
        style={{ opacity, willChange: "opacity" }}
        className={`sticky top-0 h-screen w-full flex items-center justify-center ${
          isLocked ? "z-10" : "z-0"
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollLockSection;
