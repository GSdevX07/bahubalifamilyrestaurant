import { motion } from "framer-motion";

const OrderSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">Feast Like Royalty</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient mb-4">
            Order Your Royal Feast
          </h2>
          <p className="font-montserrat text-muted-foreground mb-10 max-w-md mx-auto">
            Have the flavours of the kingdom delivered to your doorstep
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://www.zomato.com/bangalore/bahubali-family-restaurant-yelahanka-bangalore/order"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-accent text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50"
          >
            Order on Zomato
          </a>
          <a
            href="https://www.swiggy.com/city/bangalore/bahubali-family-restauant-yelahanka-rest1280002"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[hsl(30,80%,30%)] text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(180,100,20,0.3)] hover:scale-105 border border-[hsl(30,60%,40%)]/50"
          >
            Order on Swiggy
          </a>
          <a
            href="https://wa.me/919035859999?text=Hello%20Bahubali%20Restaurant,%20I%20want%20to%20order%20something"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[hsl(140,40%,20%)] text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,100,50,0.3)] hover:scale-105 border border-[hsl(140,30%,30%)]/50"
          >
            Order via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderSection;
