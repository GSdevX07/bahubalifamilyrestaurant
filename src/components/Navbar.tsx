import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import logo from "@/assets/bahubali-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
    </nav>
  );
};

export default Navbar;
