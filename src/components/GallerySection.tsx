import { motion } from "framer-motion";
import biryani from "@/assets/biryani.png";
import tandoori from "@/assets/tandoori.png";
import chicken65 from "@/assets/chicken65.png";
import chickenRoast from "@/assets/chicken-roast.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import muttonPepperFry from "@/assets/mutton-pepper-fry.png";
import fishFry from "@/assets/fish-fry.png";
import crabMasala from "@/assets/crab-masala.png";
import fishMasalaCurry from "@/assets/fish-masala-curry.png";

const images = [
  { src: biryani, alt: "Bahubali Special Biryani" },
  { src: tandoori, alt: "Tandoori Chicken" },
  { src: muttonPepperFry, alt: "Mutton Pepper Fry" },
  { src: chickenRoast, alt: "Chicken Roast" },
  { src: fishFry, alt: "Fish Fry" },
  { src: gallery2, alt: "Chicken Grill" },
  { src: fishMasalaCurry, alt: "Fish Masala Curry" },
  { src: crabMasala, alt: "Crab Masala" },
];

const GallerySection = () => {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">The Kingdom Chronicles</p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">Gallery</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-square transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-background/40 opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-cinzel text-sm text-foreground">{img.alt}</p>
              </div>
              <div className="absolute inset-2 border border-primary/20 rounded-md group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
