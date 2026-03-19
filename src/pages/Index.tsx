import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StarDishes from "@/components/StarDishes";
import ReviewsSection from "@/components/ReviewsSection";
import OrderSection from "@/components/OrderSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StarDishes />
      <ServicesSection />
      <ReviewsSection />
      <OrderSection />
      <Footer />
    </div>
  );
};

export default Index;
