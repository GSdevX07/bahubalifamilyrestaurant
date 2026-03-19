import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { menuData } from "@/data/menuData";
import { useCart } from "@/cart/CartContext";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getItemQty, addToCart, incrementItem, decrementItem } = useCart();

  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">The Royal Decree</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">Our Menu</h2>
        </motion.div>

        {/* Category tabs */}
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-8">
          {menuData.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg font-montserrat text-xs tracking-wider uppercase transition-all duration-300 border shrink-0 ${
                activeCategory === i
                  ? "bg-oxblood text-foreground border-accent shadow-[0_0_15px_rgba(102,16,16,0.5)]"
                  : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {menuData[activeCategory].items.map((item) => (
              <div
                key={item.name}
                className={`flex justify-between items-baseline border-b border-foreground/5 py-4 group ${
                  item.isSpecial ? "border-l-2 border-l-accent pl-4" : ""
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {item.isSpecial && <Crown className="w-3.5 h-3.5 text-primary shrink-0" />}
                  <span className={`font-montserrat text-sm ${item.isSpecial ? "text-primary font-semibold" : "text-foreground"}`}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-4 ml-4 shrink-0">
                  <span className="font-montserrat text-sm text-primary tabular-nums">
                    Rs. {item.price}
                  </span>
                  {getItemQty(item.name) === 0 ? (
                    <button
                      type="button"
                    onClick={() => addToCart(item.name, parseInt(item.price, 10))}
                      className="bg-accent text-foreground font-montserrat font-semibold px-3 py-1.5 rounded-lg tracking-wider text-[11px] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrementItem(item.name)}
                        className="bg-accent text-foreground font-montserrat font-semibold px-2 py-1 rounded-lg tracking-wider text-[14px] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </button>
                      <span className="font-montserrat text-sm text-primary tabular-nums min-w-[20px] text-center">
                        {getItemQty(item.name)}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementItem(item.name)}
                        className="bg-accent text-foreground font-montserrat font-semibold px-2 py-1 rounded-lg tracking-wider text-[14px] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
