import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { menuData } from "@/data/menuData";
import { useCart } from "@/cart/CartContext";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [tableNumber, setTableNumber] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { cart, isCartEmpty, getItemQty, addToCart, incrementItem, decrementItem } = useCart();

  const tableNumberValue = Number(tableNumber);
  const isTableNumberValid =
    tableNumber !== "" && Number.isFinite(tableNumberValue) && Number.isInteger(tableNumberValue) && tableNumberValue >= 1 && tableNumberValue <= 30;

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const gst = subtotal * 0.05;
  const subtotalRounded = Math.round(subtotal);
  const gstRounded = Math.round(gst);
  const finalTotalRounded = subtotalRounded + gstRounded;

  const handleDineInWhatsAppOrder = () => {
    if (isCartEmpty) return;
    if (!isTableNumberValid) {
      alert("Please enter a valid table number (1–30)");
      return;
    }

    const itemsText = cart.map((item) => `${item.name} - ${item.qty}`).join("\n");
    const message =
      `Hello Bahubali Restaurant,\n\n` +
      `Order Type: Dine-In\n` +
      `Table No: ${tableNumberValue}\n\n` +
      `Items:\n${itemsText}\n\n` +
      `Subtotal: ₹${subtotalRounded}\n` +
      `GST: ₹${gstRounded}\n` +
      `Total: ₹${finalTotalRounded}\n\n` +
      `Payment: Will pay at restaurant`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919035859999?text=${encodedMessage}`, "_blank");
  };

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

        {/* Dine-In Order (cart displayed below menu items) */}
        <div id="your-order" className="mt-14 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="mb-5">
            <div className="font-montserrat text-xs tracking-[0.3em] uppercase text-gray-300 mb-3">Your Order</div>

            <label className="block font-montserrat text-sm text-gray-200 mb-2">
              Enter Table Number (1–30)
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={30}
              step={1}
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              onBlur={() => {
                if (tableNumber !== "" && !isTableNumberValid) {
                  alert("Please enter a valid table number (1–30)");
                }
              }}
              className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-4">
            {isCartEmpty ? (
              <div className="font-montserrat text-gray-400">No items added</div>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-4 px-1 py-2 border-y border-gray-800/60"
                    >
                      <div className="font-montserrat text-sm text-gray-200 truncate">
                        {item.name} - {item.qty}
                      </div>
                      <div className="font-montserrat text-sm text-gray-100 tabular-nums">
                        ₹{item.qty * item.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between font-montserrat text-sm text-gray-300">
                    <span>Subtotal:</span>
                    <span className="text-gray-100 font-semibold tabular-nums">₹{subtotalRounded}</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-sm text-gray-300">
                    <span>GST (5%):</span>
                    <span className="text-gray-100 font-semibold tabular-nums">₹{gstRounded}</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-sm text-gray-300 border-t border-gray-800/60 pt-3">
                    <span>Total:</span>
                    <span className="text-gold-gradient font-semibold tabular-nums">₹{finalTotalRounded}</span>
                  </div>

                  <button
                    type="button"
                    disabled={isCartEmpty || !isTableNumberValid}
                    onClick={handleDineInWhatsAppOrder}
                    className="w-full mt-4 bg-gold-gradient text-primary-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
