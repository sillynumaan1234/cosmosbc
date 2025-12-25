import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productFaucet from "@/assets/product-faucet-1.jpg";
import productShower from "@/assets/product-shower-1.jpg";
import productBathtub from "@/assets/product-bathtub-1.jpg";
import productToilet from "@/assets/product-toilet-1.jpg";
import productSink from "@/assets/product-sink-1.jpg";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Faucets", "Showers", "Bathtubs", "Basins", "Toilets"];

  const products = [
    { image: productFaucet, title: "Arc Basin Mixer", category: "Faucets", price: "$489" },
    { image: productShower, title: "Rainfall Shower Head", category: "Showers", price: "$1,299" },
    { image: productBathtub, title: "Onyx Freestanding Tub", category: "Bathtubs", price: "$4,999" },
    { image: productSink, title: "Pure Vessel Basin", category: "Basins", price: "$699" },
    { image: productToilet, title: "Float Wall-Hung WC", category: "Toilets", price: "$1,199" },
    { image: productFaucet, title: "Cascade Kitchen Mixer", category: "Faucets", price: "$549" },
    { image: productShower, title: "Mist Shower System", category: "Showers", price: "$2,199" },
    { image: productBathtub, title: "Pearl Corner Tub", category: "Bathtubs", price: "$3,799" },
    { image: productSink, title: "Curve Undermount Basin", category: "Basins", price: "$459" },
    { image: productToilet, title: "Zen Smart Toilet", category: "Toilets", price: "$2,899" },
    { image: productFaucet, title: "Mono Tall Mixer", category: "Faucets", price: "$629" },
    { image: productShower, title: "Cascade Shower Panel", category: "Showers", price: "$1,899" },
  ];

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
              Our Collection
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
              Products That <span className="text-gradient-gold">Inspire</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our complete range of premium sanitaryware. Each piece is crafted 
              with precision and designed to elevate your space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-border sticky top-20 bg-background/80 backdrop-blur-xl z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category)}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeFilter === category
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-foreground"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>

            {/* Results Count */}
            <div className="text-muted-foreground text-sm">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="flex flex-wrap gap-3 pt-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveFilter(category);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={`${product.title}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="group">
                    <div className="premium-card relative overflow-hidden aspect-square mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <span className="text-primary text-xs font-medium uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-display font-semibold mt-1">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Our design consultants are here to help you find the perfect pieces for your space.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex"
            >
              Schedule Consultation
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
