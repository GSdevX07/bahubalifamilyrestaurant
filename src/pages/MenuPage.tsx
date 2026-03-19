import Navbar from "@/components/Navbar";
import MenuSection from "@/components/MenuSection";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <MenuSection />
      <OrderSection />
      <Footer />
    </div>
  );
};

export default MenuPage;
