// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 ">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} FundEase. All rights reserved.
        </p>

        <div className="flex gap-4 text-xs md:text-sm text-gray-500">
          <button className="hover:text-primary">Privacy Policy</button>
          <button className="hover:text-primary">Terms</button>
          <button className="hover:text-primary">Contact</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
