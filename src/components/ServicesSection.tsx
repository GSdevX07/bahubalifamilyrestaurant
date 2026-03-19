import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const serviceGroups = [
  {
    title: "Service Options",
    items: [
      "Kerbside pickup",
      "No-contact delivery",
      "Delivery",
      "Drive-through",
      "Takeaway",
      "Dine-in",
    ],
  },
  {
    title: "Popular For",
    items: ["Solo dining"],
  },
  {
    title: "Offerings",
    items: ["Quick bite", "Small plates"],
  },
  {
    title: "Atmosphere",
    items: ["Casual"],
  },
  {
    title: "Crowd",
    items: ["Groups"],
  },
  {
    title: "Children",
    items: ["Good for kids"],
  },
  {
    title: "Parking",
    items: ["Free parking lot", "Plenty of parking"],
  },
];

const ServicesSection = () => {
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
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Royal Hospitality
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className="bg-card rounded-xl p-6 border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="font-cinzel text-lg text-gold-gradient mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-montserrat text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

