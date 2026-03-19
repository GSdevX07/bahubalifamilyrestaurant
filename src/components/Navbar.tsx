import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import logo from "@/assets/bahubali-logo-header.png";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/cart/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  const {
    cart,
    cartCount,
    totalPrice,
    incrementItem,
    decrementItem,
    isCartEmpty,
    getWhatsAppOrderUrl,
    clearCart,
  } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/20">
      <div className="w-full flex items-center justify-between px-4 py-3">
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Bahubali Family Restaurant logo"
            className="h-14 sm:h-16 w-auto drop-shadow-[0_0_16px_rgba(0,0,0,0.7)]"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-montserrat text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/bahubali_family_restaurant_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="font-montserrat text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Open cart. Total items: ${cartCount}`}
          >
            Cart: {cartCount}
          </button>
          <a
            href="https://www.zomato.com/bangalore/bahubali-family-restaurant-yelahanka-bangalore/order"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient text-primary-foreground font-montserrat font-semibold px-5 py-2 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-gold hover:scale-105"
          >
            Order Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              <button
                type="button"
                onClick={() => {
                  setCartOpen(true);
                  setOpen(false);
                }}
                className="font-montserrat text-sm tracking-[0.15em] uppercase transition-colors text-muted-foreground hover:text-primary text-left"
                aria-label={`Open cart. Total items: ${cartCount}`}
              >
                Cart: {cartCount}
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`font-montserrat text-sm tracking-[0.15em] uppercase transition-colors ${
                    pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/bahubali_family_restaurant_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-montserrat text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.zomato.com/bangalore/bahubali-family-restaurant-yelahanka-bangalore/order"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient text-primary-foreground font-montserrat font-semibold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase text-center"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart panel */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              className="fixed top-16 right-0 md:right-4 bottom-4 w-[320px] bg-background/95 backdrop-blur-md border border-primary/10 z-[61] rounded-xl shadow-royal overflow-hidden"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
                <div className="font-montserrat text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Your Cart ({cartCount})
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-auto">
                {isCartEmpty ? (
                  <div className="p-4 text-muted-foreground font-montserrat text-sm">Cart is empty</div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 px-4 py-3 border-b border-primary/10"
                    >
                      <div className="min-w-0">
                        <div className="font-montserrat text-sm text-foreground truncate">{item.name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.name)}
                          className="bg-accent text-foreground font-montserrat font-semibold px-2 py-1 rounded-lg tracking-wider text-[14px] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          -
                        </button>
                        <span className="font-montserrat text-sm text-primary tabular-nums min-w-[22px] text-center">
                          {item.qty}
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
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              <div className="px-4 py-3 border-t border-primary/10">
                <div className="font-montserrat text-sm uppercase tracking-[0.15em] text-muted-foreground">
                  Total:{" "}
                  <span className="text-gold-gradient font-semibold">
                    ₹ {Math.round(totalPrice)}
                  </span>
                </div>
                <div className="font-montserrat text-xs text-muted-foreground mt-1">(Excluding taxes)</div>
              </div>

              {/* Order actions */}
              <div className="px-4 py-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isCartEmpty) {
                      window.alert("Your cart is empty. Go to Dashboard and Menu, then add items to cart.");
                      return;
                    }
                    const url = getWhatsAppOrderUrl();
                    window.open(url, "_blank");
                    clearCart();
                    setCartOpen(false);
                  }}
                  className="w-full bg-[hsl(140,40%,20%)] text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,100,50,0.3)] hover:scale-105 border border-[hsl(140,30%,30%)]/50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  WhatsApp Order
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      "https://www.zomato.com/bangalore/bahubali-family-restaurant-yelahanka-bangalore/order",
                      "_blank",
                    );
                    setCartOpen(false);
                  }}
                  className="w-full bg-accent text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,16,16,0.4)] hover:scale-105 border border-accent/50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Order on Zomato
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      "https://www.swiggy.com/city/bangalore/bahubali-family-restauant-yelahanka-rest1280002",
                      "_blank",
                    );
                    setCartOpen(false);
                  }}
                  className="w-full bg-[hsl(30,80%,30%)] text-foreground font-montserrat font-semibold px-8 py-3.5 rounded-lg tracking-wider text-sm uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(180,100,20,0.3)] hover:scale-105 border border-[hsl(30,60%,40%)]/50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Order on Swiggy
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
