
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faTelegram, faMedium } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Ember IDO</span>
            </div>
            <p className="text-gray-400">
              A decentralized launchpad for token sales and IDOs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FontAwesomeIcon icon={faDiscord} className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FontAwesomeIcon icon={faTelegram} className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FontAwesomeIcon icon={faMedium} className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/idos" className="text-gray-400 hover:text-orange-500">
                  Explore IDOs
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-400 hover:text-orange-500">
                  Create IDO
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-orange-500">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Ember IDO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
