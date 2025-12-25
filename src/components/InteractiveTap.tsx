import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WaterDropProps {
  delay: number;
}

const WaterDrop = ({ delay }: WaterDropProps) => (
  <motion.div
    initial={{ y: 0, opacity: 0, scale: 0.5 }}
    animate={{
      y: [0, 120, 240],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.8],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: "easeIn",
    }}
    className="absolute left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-gradient-to-b from-blue-300/80 to-blue-500/60"
    style={{ top: "100%" }}
  />
);

interface InteractiveTapProps {
  image: string;
  title: string;
  description: string;
}

const InteractiveTap = ({ image, title, description }: InteractiveTapProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Tap Container */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsActive(!isActive)}
          className="cursor-pointer relative"
        >
          {/* Glow Effect */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl"
              />
            )}
          </AnimatePresence>

          {/* Product Image */}
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden premium-card">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            
            {/* Tap Button Indicator */}
            <motion.div
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isActive ? Infinity : 0,
                repeatDelay: 1,
              }}
              className={`absolute top-4 right-4 w-4 h-4 rounded-full transition-colors duration-300 ${
                isActive ? "bg-primary" : "bg-muted-foreground/50"
              }`}
            />
          </div>

          {/* Water Flow Effect */}
          <AnimatePresence>
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-60 pointer-events-none">
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((delay, i) => (
                  <WaterDrop key={i} delay={delay} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ripple Effect at Base */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 h-8 bg-blue-400/30 rounded-full blur-sm"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="mt-8 text-center">
        <h3 className="text-xl lg:text-2xl font-display font-semibold mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-xs">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={`mt-4 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {isActive ? "Turn Off" : "Tap to Flow"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InteractiveTap;
