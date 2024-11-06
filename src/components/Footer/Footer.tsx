import React from "react";

import { FacebookIcon, LinkedInIcon, PhoneIcon } from "../../assets/icon/icon";

import Logo from "../../assets/images/rentic-logo.png";

import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-white p-3 rounded-xl transition-transform group-hover:scale-105">
                <img src={Logo} alt="Rentic Logo" className="w-10 h-10" />
              </div>

              <span className="text-2xl font-bold text-white">Rentic</span>
            </div>

            <p className="text-sm text-gray-400">
              Your trusted platform for finding the perfect property
            </p>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                  <FacebookIcon className="w-5 h-5" />
                </div>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                  <LinkedInIcon className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-yellow-500" />

                <span>+84 85 8601 303</span>
              </div>

              <p className="text-sm">24/7 Customer Support</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contributors</h3>

            <div className="space-y-3">
              <div>
                <p className="font-medium">Nguyen Quy Son Tung</p>

                <a
                  href="mailto:thanhlamtainguyen@gmail.com"
                  className="text-sm text-yellow-500 hover:text-yellow-400"
                >
                  thanhlamtainguyen@gmail.com
                </a>
              </div>

              <div>
                <p className="font-medium">Vu Ky Anh</p>

                <a
                  href="mailto:prodkydz@gmail.com"
                  className="text-sm text-yellow-500 hover:text-yellow-400"
                >
                  prodkydz@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Properties
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} Rentic. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>

              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
