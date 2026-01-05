import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const product = productsData.find(
    (p: any) => p.category === category && p.id === id
  );

  if (!product) {
    return (
      <div className="bg-background min-h-screen">
        <Navigation />
        <div className="pt-40 text-center text-muted-foreground">
          Product not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <section className="pt-28 pb-20 sm:pt-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image */}
            <div className="aspect-square bg-black rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <span className="text-primary text-xs uppercase tracking-wider">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mt-3">
                {product.name}
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground mt-4">
                ₹{product.price}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Enquire */}
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium"
                >
                  Enquire on WhatsApp
                </button>

                {/* Contact — Netlify safe */}
                <button
                  onClick={() => navigate("/contact")}
                  className="flex-1 border border-border py-3 rounded-full text-sm font-medium text-foreground"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productName={product.name}
        category={product.category}
        price={product.price}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
