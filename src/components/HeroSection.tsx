import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Palace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Welcome to the Kingdom
          </p>
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-gold-gradient tracking-[0.05em] leading-tight">
            BAHUBALI
          </h1>
          <p className="font-cinzel text-lg md:text-2xl text-primary/80 tracking-[0.15em] mt-2">
            FAMILY RESTAURANT
          </p>
          <p className="font-montserrat text-muted-foreground mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Experience the Royal Taste of Kingdom Flavours. Where ancient spice meets modern culinary mastery.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/menu"
            className="bg-gold-gradient text-primary-foreground font-cinzel font-semibold px-8 py-3 rounded-lg tracking-[0.1em] text-sm uppercase transition-all duration-300 hover:shadow-gold hover:scale-105 border border-primary/20"
          >
            View Menu
          </a>
          <a
            href="https://www.zomato.com/bangalore/bahubali-family-restaurant-yelahanka-bangalore/order"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/40 text-primary font-montserrat font-semibold px-8 py-3 rounded-lg tracking-[0.1em] text-sm uppercase transition-all duration-300 hover:bg-primary/10 hover:border-primary/60"
          >
            Order on Zomato
          </a>
          <a
            href="https://www.swiggy.com/city/bangalore/bahubali-family-restauant-yelahanka-rest1280002"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/40 text-primary font-montserrat font-semibold px-8 py-3 rounded-lg tracking-[0.1em] text-sm uppercase transition-all duration-300 hover:bg-primary/10 hover:border-primary/60"
          >
            Order on Swiggy
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-primary/40 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-primary/60" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
