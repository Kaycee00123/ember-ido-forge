
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { IDOCard, IDOProject } from '@/components/ido/IDOCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock data for all IDOs
const allIDOs: IDOProject[] = [
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
  },
  {
    id: '4',
    name: 'Data Storage Chain',
    symbol: 'DSC',
    description: 'Decentralized cloud storage solution with encrypted file sharing and automated backups.',
    logo: 'https://picsum.photos/seed/dsc/200',
    status: 'upcoming',
    startTime: Date.now() + 86400000 * 5, // 5 days from now
    endTime: Date.now() + 86400000 * 12, // 12 days from now
    hardCap: 600,
    softCap: 200,
    raised: 0,
    price: 0.08,
    totalSupply: 2000000,
    address: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '5',
    name: 'Social Media Token',
    symbol: 'SMT',
    description: 'Blockchain-based social media platform with content monetization and creator rewards.',
    logo: 'https://picsum.photos/seed/smt/200',
    status: 'live',
    startTime: Date.now() - 86400000 * 2, // 2 days ago
    endTime: Date.now() + 86400000 * 3, // 3 days from now
    hardCap: 400,
    softCap: 150,
    raised: 210,
    price: 0.065,
    totalSupply: 8000000,
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: '6',
    name: 'Supply Chain Token',
    symbol: 'SCT',
    description: 'Blockchain solution for transparent supply chain management and product verification.',
    logo: 'https://picsum.photos/seed/sct/200',
    status: 'ended',
    startTime: Date.now() - 86400000 * 20, // 20 days ago
    endTime: Date.now() - 86400000 * 13, // 13 days ago
    hardCap: 800,
    softCap: 400,
    raised: 520,
    price: 0.055,
    totalSupply: 15000000,
    address: '0x9876543210fedcba9876543210fedcba98765432'
  }
];

const IDOsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter IDOs based on search term and status filter
  const filteredIDOs = allIDOs.filter((ido) => {
    const matchesSearch = 
      ido.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ido.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || ido.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Explore IDOs</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name or symbol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* IDO Cards */}
        {filteredIDOs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredIDOs.map((project) => (
              <IDOCard 
                key={project.id} 
                project={project} 
                highlighted={project.status === 'live'} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-secondary/20 rounded-lg">
            <p className="text-gray-400">No IDOs found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IDOsList;
