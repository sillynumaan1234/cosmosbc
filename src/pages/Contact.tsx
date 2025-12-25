import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (234) 567-890", "+1 (234) 567-891"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@cosmos.com", "support@cosmos.com"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Design Avenue", "New York, NY 10001"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9am - 6pm", "Sat: 10am - 4pm"],
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
              Get In Touch
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
              Let's Create <span className="text-gradient-gold">Together</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a question or ready to start your project? Our team is here 
              to help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request a Quote</option>
                      <option value="support">Product Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Map / Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-card border border-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map coming soon</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-semibold mb-2">Flagship Showroom</h3>
                  <p className="text-muted-foreground text-sm">
                    123 Design Avenue, New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="premium-card p-8">
                <h3 className="text-xl font-display font-semibold mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <a
                    href="/showroom"
                    className="flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-muted transition-colors group"
                  >
                    <span className="font-medium">Book Showroom Visit</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/products"
                    className="flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-muted transition-colors group"
                  >
                    <span className="font-medium">Download Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center justify-between p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors group"
                  >
                    <span className="font-medium text-primary">Schedule a Call</span>
                    <Phone className="w-4 h-4 text-primary" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Common <span className="text-gradient-gold">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What is the warranty on Cosmos products?",
                a: "All Cosmos products come with a 10-year warranty covering manufacturing defects. Extended warranties are available for commercial installations.",
              },
              {
                q: "Do you offer installation services?",
                a: "Yes, we partner with certified installers nationwide. Installation can be arranged at the time of purchase or through our customer service team.",
              },
              {
                q: "Can I request custom finishes?",
                a: "Absolutely. Our bespoke program allows you to customize finishes, dimensions, and features. Contact us for details on custom orders.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unused products in original packaging. Custom orders are non-refundable.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-2xl border border-border"
              >
                <h3 className="font-display font-semibold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
