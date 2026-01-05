import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  productName: string;
  category: string;
  price: number;
};

const WHATSAPP_NUMBER = "9606954425"; // no +, no spaces

const QuoteModal = ({ open, onClose, productName, category, price }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [usage, setUsage] = useState("");
  const [city, setCity] = useState("");
  const [detectingCity, setDetectingCity] = useState(false);

  // Auto-detect city via IP
  useEffect(() => {
    if (!open) return;

    setDetectingCity(true);
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city) {
          setCity(data.city);
        }
      })
      .catch(() => {})
      .finally(() => setDetectingCity(false));
  }, [open]);

  const generateQuoteMessage = () => {
    return `
📄 QUOTATION REQUEST — COSMOS BUSINESS CENTRAL
────────────────────────────

PRODUCT DETAILS
• Product Name : ${productName}
• Category     : ${category}
• Listed Price : ₹${price}

REQUIREMENT DETAILS
• Quantity     : ${quantity}
• Usage        : ${usage}
• City         : ${city || "—"}

────────────────────────────
Generated via cosmosbc.in
`.trim();
  };

  const handleSendToWhatsApp = () => {
    if (!quantity || !usage) return;

    const message = encodeURIComponent(generateQuoteMessage());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div
              className="w-full max-w-lg bg-[#1c1c1e] rounded-2xl shadow-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-6 text-center">
                Request a Quote
              </h2>

              {/* Product summary */}
              <div className="mb-6 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Product</span>
                  <span>{productName}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Category</span>
                  <span>{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span>₹{price}</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <label className="block text-sm text-muted-foreground mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Usage */}
              <div className="mb-5">
                <label className="block text-sm text-muted-foreground mb-2">
                  Usage
                </label>
                <select
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select usage</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Project">Project</option>
                  <option value="Dealer">Dealer</option>
                </select>
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  City {detectingCity && "(detecting…)"}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* CTA */}
              <button
                disabled={!quantity || !usage}
                onClick={handleSendToWhatsApp}
                className={`w-full py-3 rounded-full text-sm font-medium transition ${
                  quantity && usage
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Generate Quote on WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
