import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, MapPin, Calendar, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import showroomInterior from "@/assets/showroom-interior.jpg";
import bathroomLifestyle from "@/assets/bathroom-lifestyle-1.jpg";
import productBathtub from "@/assets/product-bathtub-1.jpg";
import productFaucet from "@/assets/product-faucet-1.jpg";
import productShower from "@/assets/product-shower-1.jpg";
import { toast } from "sonner";

const Showroom = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const galleries = [
    {
      image: showroomInterior,
      title: "Main Exhibition Hall",
      description: "Experience our complete product range in an immersive setting",
    },
    {
      image: bathroomLifestyle,
      title: "Luxury Bathroom Suites",
      description: "Curated installations showcasing complete bathroom designs",
    },
    {
      image: productBathtub,
      title: "Bathtub Gallery",
      description: "Explore our sculptural freestanding and built-in tubs",
    },
    {
      image: productShower,
      title: "Shower Experience Zone",
      description: "Interactive water flow demonstrations",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Visit booked! Check your email for confirmation.");
    setBookingData({ name: "", email: "", date: "", time: "" });
  };

  const experiences = [
    {
      title: "Guided Tours",
      description: "Personal consultations with our design experts",
      duration: "60 min",
    },
    {
      title: "Water Flow Experience",
      description: "Interactive demonstrations of our shower systems",
      duration: "30 min",
    },
    {
      title: "Material Workshop",
      description: "Touch and compare our premium finishes",
      duration: "45 min",
    },
    {
      title: "Design Consultation",
      description: "One-on-one planning for your project",
      duration: "90 min",
    },
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
              Visit Us
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
              The Cosmos <span className="text-gradient-gold">Showroom</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Step into a world of refined luxury. Our flagship showroom offers an 
              immersive journey through the art of premium sanitaryware.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-[16/9] rounded-3xl overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  src={galleries[currentSlide].image}
                  alt={galleries[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Content */}
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-8 lg:p-12"
              >
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2">
                  {galleries[currentSlide].title}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {galleries[currentSlide].description}
                </p>
              </motion.div>

              {/* Controls */}
              <div className="absolute bottom-8 right-8 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-8 left-8 flex items-center gap-2">
                {galleries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
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
              Experiences
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Immerse <span className="text-gradient-gold">Yourself</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card p-8 text-center group hover:scale-[1.02] transition-transform duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <span className="text-primary text-sm font-medium">
                  {exp.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Promo */}
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
                Virtual Experience
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">
                Can't Visit? <span className="text-gradient-gold">Tour Remotely</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Experience our showroom from anywhere in the world. Our virtual tour 
                offers an immersive 360° experience of our complete collection.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "360° panoramic views of all galleries",
                  "Interactive product information",
                  "Live video consultations available",
                  "AR product visualization",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center gap-3"
              >
                <Play className="w-4 h-4" />
                Start Virtual Tour
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden"
            >
              <img
                src={showroomInterior}
                alt="Virtual tour preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center animate-pulse-glow"
                >
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book a Visit */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                Book a Visit
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">
                Schedule Your <span className="text-gradient-gold">Experience</span>
              </h2>
              
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    required
                    className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    required
                    className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      required
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      required
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary w-full inline-flex items-center justify-center gap-3"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your Visit
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Location Card */}
              <div className="premium-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Flagship Showroom</h3>
                    <p className="text-muted-foreground">
                      123 Design Avenue<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="h-48 rounded-xl bg-secondary flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Map view</p>
                </div>
              </div>

              {/* Hours */}
              <div className="premium-card p-8">
                <h3 className="font-display font-semibold mb-4">Opening Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Showroom;
