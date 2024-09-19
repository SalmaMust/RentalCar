// src/components/Footer.tsx
import facebookIcon from '../../assets/images/facebook-icone.png'; 
import twitterIcon from '../../assets/images/twitter-icone.png';   
import instagramIcon from '../../assets/images/instagram-icone.png';

export default function Footer() {


  return (

    
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We offer the best car rental services tailored to your needs. Explore our wide range of vehicles and enjoy seamless experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#home" className="hover:text-gray-300">Home</a>
            </li>
            <li className="mb-2">
              <a href="#about" className="hover:text-gray-300">About</a>
            </li>
            <li className="mb-2">
              <a href="#services" className="hover:text-gray-300">Services</a>
            </li>
            <li className="mb-2">
              <a href="#contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">
            1234 Rue de la Republique, Bouhjar
          </p>
          <p className="text-gray-400 mb-2">
            Email: contact@rentalcar.com
          </p>
          <p className="text-gray-400 mb-2">
            Phone: +216 36 958 965
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2024 Rental Car. All rights reserved.</p>
      </div>
    </footer>
  );
}