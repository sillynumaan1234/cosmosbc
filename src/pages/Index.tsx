import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollLockSection from "@/components/ScrollLockSection";
import InteractiveTap from "@/components/InteractiveTap";
import ProductCard from "@/components/ProductCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroVideo from "@/assets/hero-video.mp4";
import productFaucet from "@/assets/product-faucet-1.jpg";
import productShower from "@/assets/product-shower-1.jpg";
import productBathtub from "@/assets/product-bathtub-1.jpg";
import productToilet from "@/assets/product-toilet-1.jpg";
import productSink from "@/assets/product-sink-1.jpg";
import bathroomLifestyle from "@/assets/bathroom-lifestyle-1.jpg";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const products = [
    { image: productFaucet, title: "Precision Faucets", category: "Faucets" },
    { image: productShower, title: "Rainfall Systems", category: "Showers" },
    { image: productBathtub, title: "Sculptural Tubs", category: "Bathtubs" },
    { image: productSink, title: "Vessel Basins", category: "Basins" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* Hero Section with Video */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0"
        >
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-hero"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6"
            >
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em]">
                Premium Sanitaryware
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 text-balance"
            >
              Elegance in
              <br />
              Every <span className="text-gradient-gold">Drop</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Discover the perfect fusion of timeless craftsmanship and modern innovation. 
              Cosmos Sanitaryware transforms everyday rituals into luxurious experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-3"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/showroom">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost inline-flex items-center gap-3"
                >
                  <Play className="w-4 h-4" />
                  Virtual Tour
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 lg:py-32 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <AnimatedCounter end={25} suffix="+" label="Years of Excellence" />
            <AnimatedCounter end={50} suffix="k+" label="Happy Customers" />
            <AnimatedCounter end={200} suffix="+" label="Premium Products" />
            <AnimatedCounter end={35} label="Countries Served" />
          </div>
        </div>
      </section>

      {/* Interactive Tap Section - Scroll Lock */}
      <ScrollLockSection>
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
              Interactive Experience
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Touch. Feel. <span className="text-gradient-gold">Flow.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Click on any faucet to experience the perfect water flow. 
              Our precision-engineered systems deliver consistent, beautiful streams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
            <InteractiveTap
              image={productFaucet}
              title="Arc Series"
              description="Sleek design meets precision engineering"
            />
            <InteractiveTap
              image={productShower}
              title="Rain Collection"
              description="Rainfall experience, reimagined"
            />
            <InteractiveTap
              image={productSink}
              title="Pure Basin"
              description="Sculptural elegance for modern spaces"
            />
          </div>
        </div>
      </ScrollLockSection>

      {/* Featured Products */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16"
          >
            <div>
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                Our Collection
              </span>
              <h2 className="text-4xl lg:text-6xl font-display font-bold">
                Curated for
                <br />
                <span className="text-gradient-gold">Perfection</span>
              </h2>
            </div>
            <Link to="/products">
              <motion.button
                whileHover={{ x: 4 }}
                className="mt-8 lg:mt-0 inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                View All Products
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                {...product}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                Why Cosmos
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">
                Where Innovation
                <br />
                Meets <span className="text-gradient-gold">Artistry</span>
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Every Cosmos product is born from a passion for perfection. Our master craftsmen 
                  combine traditional techniques with cutting-edge technology to create sanitaryware 
                  that transcends the ordinary.
                </p>
                <p>
                  From the precision of our faucet mechanisms to the sculptural beauty of our 
                  freestanding tubs, each piece is designed to transform your daily rituals into 
                  moments of pure luxury.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Our Story
                  </motion.button>
                </Link>
                <Link to="/showroom">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost"
                  >
                    Visit Showroom
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={bathroomLifestyle}
                  alt="Luxury bathroom with Cosmos fixtures"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 lg:-left-12 bg-background p-6 rounded-2xl shadow-2xl max-w-xs"
              >
                <div className="text-4xl font-display font-bold text-gradient-gold mb-2">
                  99.7%
                </div>
                <div className="text-muted-foreground text-sm">
                  Customer satisfaction rate across all product lines
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
              Premium Materials
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Crafted from the <span className="text-gradient-gold">Finest</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Surgical-Grade Steel",
                description: "Our faucets feature 316L stainless steel, resistant to corrosion and built to last a lifetime.",
                icon: "◈",
              },
              {
                title: "Nano Ceramic Coating",
                description: "Revolutionary surface treatment that repels water, dirt, and bacteria for pristine hygiene.",
                icon: "◇",
              },
              {
                title: "Eco-Conscious Design",
                description: "Water-saving technology without compromising performance. Up to 40% reduction in water usage.",
                icon: "○",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card p-8 lg:p-10 text-center"
              >
                <div className="text-4xl text-primary mb-6">{item.icon}</div>
                <h3 className="text-xl font-display font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-6xl text-primary mb-8">"</div>
            <blockquote className="text-2xl lg:text-4xl font-display font-medium leading-relaxed mb-8">
              Cosmos has redefined what we expect from bathroom fixtures. 
              The attention to detail is extraordinary, and the quality speaks for itself.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div className="text-left">
                <div className="font-display font-semibold">Alexandra Chen</div>
                <div className="text-muted-foreground text-sm">Interior Designer, Chen Studios</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Begin Your <span className="text-gradient-gold">Transformation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Experience the Cosmos difference. Book a consultation with our design experts 
              or visit our showroom to see our collections in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/showroom">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                >
                  Explore Showroom
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
