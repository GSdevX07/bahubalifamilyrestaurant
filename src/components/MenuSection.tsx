import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { menuData } from "@/data/menuData";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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
                <span className="font-montserrat text-sm text-primary tabular-nums ml-4 shrink-0">
                  Rs. {item.price}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
