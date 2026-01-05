import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import productsData from "../data/products.json";
import SearchModal from "@/components/SearchModal";

const PAGE_SIZE = 16;

const Products = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Normalize product data for UI
  const products = productsData.map((p: any) => ({
    id: p.id,
    image: p.image,
    title: p.name,
    category: p.category,
    price: `₹${p.price}`,
    rawPrice: p.price,
  }));

  // Categories from folders
  const categories = [
    "All",
    ...Array.from(new Set(productsData.map((p: any) => p.category))),
  ];

  // Price bounds
  const prices = products.map((p) => p.rawPrice);
  const absoluteMin = Math.min(...prices);
  const absoluteMax = Math.max(...prices);

  const [minPrice, setMinPrice] = useState(absoluteMin);
  const [maxPrice, setMaxPrice] = useState(absoluteMax);

  const resetPagination = () => setVisibleCount(PAGE_SIZE);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeFilter === "All" || product.category === activeFilter;

    const matchesName =
      searchQuery.trim() === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      product.rawPrice >= minPrice && product.rawPrice <= maxPrice;

    return matchesCategory && matchesName && matchesPrice;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-[0.3em] mb-3 block">
              Our Collection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-5">
              Products That <span className="text-gradient-gold">Inspire</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Explore our complete range of premium sanitaryware.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="py-6 sm:py-8 border-y border-border sticky top-16 bg-background/80 backdrop-blur-xl z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveFilter(category);
                    resetPagination();
                  }}
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

            {/* Search CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSearchOpen(true)}
              className="
                flex-1 sm:flex-none
                rounded-full
                px-6 py-2.5
                text-sm font-medium
                transition
                text-center
                border border-border
                text-muted-foreground
                hover:text-foreground

                lg:bg-primary
                lg:text-primary-foreground
                lg:border-primary
                lg:hover:brightness-110
                lg:shadow-md
              "
            >
              Search products
            </motion.button>

            {/* Mobile Filter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-foreground"
              >
                <Filter className="w-4 h-4" />
              </button>

              <div className="hidden sm:block text-muted-foreground text-sm whitespace-nowrap">
                {filteredProducts.length} products
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() =>
                    navigate(`/products/${product.category}/${product.id}`)
                  }
                  className="cursor-pointer"
                >
                  <div className="group">
                    <div className="premium-card relative overflow-hidden aspect-square mb-3 sm:mb-4">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-primary text-xs font-medium uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-display font-semibold mt-1">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-12 sm:mt-16">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="w-full sm:w-auto px-10 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition"
              >
                Load more
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        absoluteMin={absoluteMin}
        absoluteMax={absoluteMax}
      />

      <Footer />
    </div>
  );
};

export default Products;
