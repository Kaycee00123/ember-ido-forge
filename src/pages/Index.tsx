
import React from 'react';
import Layout from '@/components/layout/Layout';
import { IDOCard, IDOProject } from '@/components/ido/IDOCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faChartLine, faShield, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data for featured IDOs
const featuredIDOs: IDOProject[] = [
  {
    id: '1',
    name: 'MetaVerse Token',
    symbol: 'MVT',
    description: 'A next-generation metaverse platform enabling virtual reality experiences and digital asset ownership.',
    logo: 'https://picsum.photos/seed/mvt/200',
    banner: 'https://picsum.photos/seed/mvt-banner/800/200',
    status: 'live',
    startTime: Date.now() - 86400000, // 1 day ago
    endTime: Date.now() + 86400000 * 5, // 5 days from now
    hardCap: 500,
    softCap: 200,
    raised: 320,
    price: 0.05,
    totalSupply: 1000000,
    address: '0x1234567890123456789012345678901234567890'
  },
  {
    id: '2',
    name: 'DeFi Protocol',
    symbol: 'DFP',
    description: 'An innovative DeFi protocol offering yield farming, lending, and borrowing services with minimal fees.',
    logo: 'https://picsum.photos/seed/dfp/200',
    banner: 'https://picsum.photos/seed/dfp-banner/800/200',
    status: 'upcoming',
    startTime: Date.now() + 86400000 * 2, // 2 days from now
    endTime: Date.now() + 86400000 * 7, // 7 days from now
    hardCap: 1000,
    softCap: 500,
    raised: 0,
    price: 0.075,
    totalSupply: 5000000,
    address: '0x0987654321098765432109876543210987654321'
  },
  {
    id: '3',
    name: 'GameFi Platform',
    symbol: 'GFP',
    description: 'A blockchain gaming platform where players can earn tokens through gameplay and trade in-game assets.',
    logo: 'https://picsum.photos/seed/gfp/200',
    banner: 'https://picsum.photos/seed/gfp-banner/800/200',
    status: 'filled',
    startTime: Date.now() - 86400000 * 10, // 10 days ago
    endTime: Date.now() - 86400000, // 1 day ago
    hardCap: 750,
    softCap: 300,
    raised: 750,
    price: 0.1,
    totalSupply: 3000000,
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Launch</span> Your Token with 
              <span className="gradient-text ml-2">Confidence</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Secure, transparent, and efficient token launches on the 
              decentralized launchpad built for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/idos">
                <Button className="btn-primary text-lg px-8 py-6">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Explore IDOs
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="outline" className="btn-outline text-lg px-8 py-6">
                  Create Your IDO
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-orange-500 font-bold text-3xl">35+</div>
                <div className="text-gray-400">Projects Launched</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 font-bold text-3xl">$12M+</div>
                <div className="text-gray-400">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 font-bold text-3xl">28K+</div>
                <div className="text-gray-400">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 font-bold text-3xl">99.9%</div>
                <div className="text-gray-400">Security Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured IDOs Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured IDOs</h2>
            <Link to="/idos" className="text-orange-500 hover:text-orange-400">
              View All
              <FontAwesomeIcon icon={faRocket} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredIDOs.map((project) => (
              <IDOCard key={project.id} project={project} highlighted={project.status === 'live'} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">
              Our platform makes it easy to launch or participate in token sales with a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faRocket} className="text-orange-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create & Launch</h3>
              <p className="text-gray-400">
                Configure your token and IDO parameters, deploy smart contracts, and launch your project.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-orange-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manage & Track</h3>
              <p className="text-gray-400">
                Monitor your token sale progress, track contributions, and manage project details.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faLock} className="text-orange-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Distribute & Claim</h3>
              <p className="text-gray-400">
                Distribute tokens to participants according to vesting schedules using our secure system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Token?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the growing list of successful projects that have launched on our platform.
            </p>
            <Link to="/create">
              <Button className="btn-primary text-lg px-8 py-6">
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Start Your IDO Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
