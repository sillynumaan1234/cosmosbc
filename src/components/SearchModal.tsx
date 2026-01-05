import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  absoluteMin: number;
  absoluteMax: number;
};

const SearchModal = ({
  open,
  onClose,
  searchQuery,
  setSearchQuery,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  absoluteMin,
  absoluteMax,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="w-full max-w-lg bg-[#1c1c1e] rounded-2xl shadow-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-6 text-center">
                Search Products
              </h2>

              {/* Model Name Search */}
              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Model name
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type model name…"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm text-muted-foreground mb-4">
                  Price range
                </label>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={absoluteMin}
                    max={absoluteMax}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={absoluteMin}
                    max={absoluteMax}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹{minPrice}</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
