import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
import productSink from "@/assets/product-sink-1.jpg";
import bathroomLifestyle from "@/assets/bathroom-lifestyle-1.jpg";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

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

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <motion.video autoPlay muted loop playsInline className="video-hero">
            <source src={heroVideo} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-primary text-sm font-medium uppercase tracking-[0.3em] block mb-6"
            >
              Premium Sanitaryware
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8"
            >
              Elegance in
              <br />
              Every <span className="text-gradient-primary">Drop</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Discover the perfect fusion of timeless craftsmanship and modern innovation.
              Cosmos Sanitaryware transforms everyday rituals into luxurious experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/products">
                <motion.button className="btn-primary inline-flex items-center gap-3">
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button className="btn-ghost">
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedCounter end={25} suffix="+" label="Years of Excellence" />
          <AnimatedCounter end={50} suffix="k+" label="Happy Customers" />
          <AnimatedCounter end={200} suffix="+" label="Premium Products" />
          <AnimatedCounter end={35} label="Countries Served" />
        </div>
      </section>

      {/* Interactive Section */}
      <ScrollLockSection>
        <div className="container mx-auto px-6 lg:px-12 text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] block mb-4">
            Interactive Experience
          </span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Touch. Feel. <span className="text-gradient-primary">Flow.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          <InteractiveTap image={productFaucet} title="Arc Series" description="Precision engineering" />
          <InteractiveTap image={productShower} title="Rain Collection" description="Reimagined flow" />
          <InteractiveTap image={productSink} title="Pure Basin" description="Modern elegance" />
        </div>
      </ScrollLockSection>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Begin Your <span className="text-gradient-primary">Transformation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Speak with our experts and discover the perfect solution for your space.
          </p>
          <Link to="/contact">
            <motion.button className="btn-primary inline-flex items-center gap-2">
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
