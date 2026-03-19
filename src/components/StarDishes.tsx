import { motion } from "framer-motion";
import biryani from "@/assets/biryani.png";
import tandoori from "@/assets/tandoori.png";
import chicken65 from "@/assets/chicken65.png";

const dishes = [
  { name: "Bahubali Special Chicken Biryani", price: "279", image: biryani, tag: "SIGNATURE" },
  { name: "Tandoori Chicken", price: "449", image: tandoori, tag: "ROYAL PICK" },
  { name: "Chicken 65", price: "179", image: chicken65, tag: "BESTSELLER" },
];

const StarDishes = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">The Royal Jewels</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">Star Dishes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              className="group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <img
                src={dish.image}
                alt={dish.name}
                className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 z-20 p-6 w-full">
                <p className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-primary mb-1">{dish.tag}</p>
                <h3 className="font-cinzel text-lg text-foreground leading-snug">{dish.name}</h3>
                <p className="mt-2 font-montserrat font-semibold text-primary tabular-nums">Rs. {dish.price}</p>
              </div>
              {/* Border glow */}
              <div className="absolute inset-0 rounded-xl border border-primary/10 group-hover:border-primary/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarDishes;
