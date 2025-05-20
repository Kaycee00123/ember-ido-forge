
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faWallet, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ConnectButton } from '../wallet/ConnectButton';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faRocket} className="text-orange-500 h-6 w-6 mr-2" />
              <span className="text-xl font-bold text-white">Ember IDO</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
                  Home
                </Link>
                <Link to="/idos" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
                  IDOs
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md font-medium">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <ConnectButton />
              <Link to="/create">
                <Button className="btn-primary">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Launch Token
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-secondary focus:outline-none"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary/80 backdrop-blur-sm">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/idos" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
              IDOs
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
              Dashboard
            </Link>
            <div className="mt-4 flex flex-col space-y-3 px-3">
              <ConnectButton />
              <Link to="/create" className="w-full">
                <Button className="btn-primary w-full">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Launch Token
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
