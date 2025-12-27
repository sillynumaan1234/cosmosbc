import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveTap from "@/components/InteractiveTap";
import ProductCard from "@/components/ProductCard";
import AnimatedCounter from "@/components/AnimatedCounter";

import heroVideo from "@/assets/hero-video.mp4";
import productFaucet from "@/assets/product-faucet-1.jpg";
import productShower from "@/assets/product-shower-1.jpg";
import productBathtub from "@/assets/product-bathtub-1.jpg";
import productSink from "@/assets/product-sink-1.jpg";
import bathroomLifestyle from "@/assets/bathroom-lifestyle-1.jpg";

/* ---------------- TESTIMONIAL CAROUSEL ---------------- */

const testimonials = [
  {
    quote:
      "Cosmos has completely redefined our expectations from bathroom fixtures. The craftsmanship is exceptional.",
    name: "Alexandra Chen",
    role: "Interior Designer",
  },
  {
    quote:
      "From finish to performance, every Cosmos product feels meticulously engineered.",
    name: "Rahul Mehta",
    role: "Architect",
  },
  {
    quote:
      "Minimal, elegant, and durable. Our clients consistently love Cosmos installations.",
    name: "Sophia Laurent",
    role: "Luxury Home Consultant",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const t = testimonials[index];

  return (
    <div className="relative premium-card p-10 lg:p-14">
      <p className="text-xl lg:text-2xl leading-relaxed mb-8">
        “{t.quote}”
      </p>

      <div className="text-muted-foreground mb-8">
        <strong className="text-foreground">{t.name}</strong>
        <div className="text-sm">{t.role}</div>
      </div>

      <div className="flex justify-center gap-6">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-border hover:bg-primary/10 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full border border-border hover:bg-primary/10 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

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
    <div className="bg-background min-h-screen overflow-x-hidden">
      <Navigation />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="video-hero">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <span className="text-primary text-sm uppercase tracking-[0.3em] block mb-6">
              Premium Sanitaryware
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8">
              Elegance in
              <br />
              Every <span className="text-gradient-primary">Drop</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Timeless craftsmanship fused with modern engineering to elevate
              everyday rituals.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/products" className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3">
                Explore Collection
               <ArrowRight className="w-4 h-4" />
              </button>
           </Link>

           <Link to="/contact" className="w-full sm:w-auto">
              <button className="btn-ghost w-full sm:w-auto inline-flex justify-center">
                  Get in Touch
               </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedCounter end={25} suffix="+" label="Years of Excellence" />
          <AnimatedCounter end={50} suffix="k+" label="Happy Customers" />
          <AnimatedCounter end={200} suffix="+" label="Premium Products" />
          <AnimatedCounter end={35} label="Countries Served" />
        </div>
      </section>

      {/* CURATED */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-12">
            Curated for <span className="text-gradient-primary">Perfection</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.title} {...p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-16 text-center">
            Touch. Feel. <span className="text-gradient-primary">Flow.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            <InteractiveTap image={productFaucet} title="Arc Series" description="Precision engineered flow" />
            <InteractiveTap image={productShower} title="Rain Collection" description="Rainfall perfected" />
            <InteractiveTap image={productSink} title="Pure Basin" description="Sculptural elegance" />
          </div>
        </div>
      </section>

      {/* WHY COSMOS */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Where Innovation
              <br />
              Meets <span className="text-gradient-primary">Artistry</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Designed with obsessive attention to detail, Cosmos products blend
              aesthetics with engineering excellence.
            </p>
            <Link to="/about" className="btn-primary">
              Our Story
            </Link>
          </div>

          <img src={bathroomLifestyle} alt="Luxury Bathroom" className="rounded-3xl" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-12">
            What Clients <span className="text-gradient-primary">Say</span>
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* MATERIALS */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-center mb-16">
            Crafted from the <span className="text-gradient-primary">Finest</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Surgical-Grade Steel", "Corrosion-resistant, built for life"],
              ["Nano Ceramic Coating", "Water-repellent, hygienic finish"],
              ["Eco-Conscious Design", "Up to 40% water savings"],
            ].map(([title, desc]) => (
              <div key={title} className="premium-card p-8 text-center">
                <h3 className="font-semibold mb-4">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card text-center">
        <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
          Begin Your <span className="text-gradient-primary">Transformation</span>
        </h2>

        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
          Get in Touch <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
