import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default GalleryPage;
