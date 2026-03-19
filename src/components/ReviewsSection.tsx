import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Rajesh Kumar", stars: 5, text: "Best biryani in Yelahanka! The Bahubali Special Chicken Biryani is absolutely phenomenal. Worthy of its royal name." },
  { name: "Priya Sharma", stars: 5, text: "Amazing ambience and food quality. The tandoori chicken melts in your mouth. A must-visit for family dinners." },
  { name: "Mohammed Farhan", stars: 4, text: "Great variety in the menu. The mutton biryani and butter chicken are top-notch. Reasonable prices for the quality." },
  { name: "Sneha Reddy", stars: 5, text: "Love the royal theme! Food is consistently delicious. Paneer 555 is our family favorite. Highly recommended." },
  { name: "Vikram Patel", stars: 4, text: "Excellent non-veg starters. Chicken 65 and Dragon Chicken are fire! Service is prompt and staff is courteous." },
  { name: "Ananya Rao", stars: 5, text: "The family pack is great value for money. Every dish tastes authentic and fresh. Our go-to restaurant now." },
];

const ReviewsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">Royal Reviews</h2>
          <p className="font-montserrat text-muted-foreground mt-3">4.5 Rating from 85+ Happy Customers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="bg-card rounded-xl p-6 border border-primary/10 glow-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <p className="font-montserrat text-sm text-muted-foreground leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-sm text-foreground">{review.name}</span>
                <div className="flex gap-0.5">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
