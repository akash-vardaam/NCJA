import logo from "@/assets/logo-color.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-wide mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="AS Creative Services" className="h-8" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AS Creative Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
