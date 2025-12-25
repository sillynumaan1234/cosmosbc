import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import bathroomLifestyle from "@/assets/bathroom-lifestyle-1.jpg";
import showroomInterior from "@/assets/showroom-interior.jpg";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const timeline = [
    { year: "1999", title: "The Beginning", description: "Founded in a small workshop with a vision for perfection." },
    { year: "2005", title: "First Export", description: "Expanded to international markets across 5 countries." },
    { year: "2012", title: "Innovation Lab", description: "Established R&D center for next-generation products." },
    { year: "2018", title: "Sustainability", description: "Achieved carbon-neutral manufacturing operations." },
    { year: "2024", title: "Global Leader", description: "Recognized as a top premium sanitaryware brand worldwide." },
  ];

  const values = [
    { title: "Precision", description: "Every detail matters. Our products undergo 47 quality checks." },
    { title: "Innovation", description: "Pioneering water-saving technology and smart features." },
    { title: "Sustainability", description: "Committed to reducing environmental impact at every step." },
    { title: "Craftsmanship", description: "Blending traditional artistry with modern manufacturing." },
  ];

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
              Our Story
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
              25 Years of <span className="text-gradient-gold">Excellence</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From a humble workshop to a global name in luxury sanitaryware, 
              Cosmos has always been driven by one goal: perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section ref={containerRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <img
            src={bathroomLifestyle}
            alt="Cosmos craftsmanship"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Where Every Detail Tells a Story
            </h2>
            <p className="text-lg text-muted-foreground">
              Our artisans spend countless hours perfecting each curve, each finish, 
              each mechanism—because we believe that true luxury lies in the details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <AnimatedCounter end={25} suffix="+" label="Years Experience" />
            <AnimatedCounter end={500} suffix="+" label="Skilled Artisans" />
            <AnimatedCounter end={35} label="Countries Served" />
            <AnimatedCounter end={200} suffix="k" label="Products Sold" />
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Milestones That <span className="text-gradient-gold">Define Us</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative pl-8 lg:pl-0 pb-12 lg:pb-16 ${
                  index % 2 === 0 ? "lg:pr-[55%]" : "lg:pl-[55%]"
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-0 lg:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background ${
                  index % 2 === 0 ? "lg:-translate-x-1/2" : "lg:-translate-x-1/2"
                }`} />

                <div className="premium-card p-6 lg:p-8">
                  <span className="text-primary text-2xl font-display font-bold">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-display font-semibold mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
              What Drives Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                Our People
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">
                Passionate <span className="text-gradient-gold">Craftsmen</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Behind every Cosmos product is a team of dedicated professionals who 
                share a common passion: creating the finest sanitaryware in the world.
              </p>
              <p className="text-muted-foreground mb-8">
                From our master craftsmen with decades of experience to our young 
                engineers pushing the boundaries of innovation, every team member 
                plays a vital role in our success.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex"
              >
                Join Our Team
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="aspect-square rounded-3xl overflow-hidden"
            >
              <img
                src={showroomInterior}
                alt="Cosmos team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
