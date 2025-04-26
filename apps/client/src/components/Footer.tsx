import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-gray-400 hover:text-white">
                Our Team
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-gray-400 hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400 text-sm">© 2023 Coffee Career. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
