import { Instagram } from "lucide-react";
import logo from "@/assets/bahubali-logo.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
          <img
            src={logo}
            alt="Bahubali Family Restaurant logo"
            className="h-10 w-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]"
          />
        </div>

        <nav className="flex items-center gap-6">
          <a href="/" className="font-montserrat text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Home</a>
          <a href="/menu" className="font-montserrat text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Menu</a>
          <a href="/gallery" className="font-montserrat text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Gallery</a>
          <a href="/contact" className="font-montserrat text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Contact</a>
          <a
            href="https://www.instagram.com/bahubali_family_restaurant_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </nav>

        <p className="font-montserrat text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Bahubali Family Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
