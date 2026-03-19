import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">Visit the Kingdom</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">Contact Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-cinzel text-foreground text-sm mb-1">Address</h3>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Reva Circle, Yelahanka, Bangalore
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-cinzel text-foreground text-sm mb-1">Call Us</h3>
                <a href="tel:+919035714449" className="font-montserrat text-muted-foreground text-sm hover:text-primary transition-colors">
                  +91 9035714449
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-cinzel text-foreground text-sm mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/919035859999?text=Hello%20Bahubali%20Restaurant,%20I%20want%20to%20order%20something"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  +91 9035859999
                </a>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a
                href="tel:+919035714449"
                className="bg-gold-gradient text-primary-foreground font-montserrat font-semibold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-gold hover:scale-105"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/919035859999?text=Hello%20Bahubali%20Restaurant,%20I%20want%20to%20order%20something"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary/40 text-primary font-montserrat font-semibold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 hover:bg-primary/10"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden border border-primary/10 h-72 lg:h-auto"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d77.6315593!3d13.1227362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175e21ff8853%3A0xc79773ef5ee6802c!2sBahubali%20Family%20Restaurant!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bahubali Family Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
