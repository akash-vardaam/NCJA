import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoColor from "@/assets/logo-color.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoColor} alt="AS Creative Services" className="h-10 md:h-12" />
          </Link>
          <span className="text-sm font-medium text-muted-foreground">Brand Guidelines</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
