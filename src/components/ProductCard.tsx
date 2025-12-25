import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  delay?: number;
}

const ProductCard = ({ image, title, category, delay = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to="/products">
        <div className="premium-card relative overflow-hidden aspect-square">
          {/* Image */}
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
              {category}
            </span>
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              {title}
            </h3>
            <motion.div
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm text-foreground"
            >
              Explore
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Corner Accent */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
