
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faChartLine, 
  faUsers, 
  faCoins,
  faWallet,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { IDOCard, IDOProject } from '@/components/ido/IDOCard';

// Mock data for user's contributions
const userContributions = [
  {
    id: '1',
    idoName: 'MetaVerse Token',
    symbol: 'MVT',
    amount: 2.5,
    tokenAmount: 50000,
    price: 0.00005,
    status: 'Claimed',
    date: '2023-05-15',
    address: '0x1234567890123456789012345678901234567890'
  },
  {
    id: '2',
    idoName: 'DeFi Protocol',
    symbol: 'DFP',
    amount: 1.8,
    tokenAmount: 24000,
    price: 0.000075,
    status: 'Claimable',
    date: '2023-06-02',
    address: '0x0987654321098765432109876543210987654321'
  },
  {
    id: '3',
    idoName: 'GameFi Platform',
    symbol: 'GFP',
    amount: 3.2,
    tokenAmount: 32000,
    price: 0.0001,
    status: 'Pending',
    date: '2023-06-10',
    address: '0xabcdef1234567890abcdef1234567890abcdef12'
  }
];

// Mock data for user's created IDOs
const creatorProjects: IDOProject[] = [
  {
    id: '1',
    name: 'My DeFi Token',
    symbol: 'MDT',
    description: 'A decentralized finance token for lending and borrowing with low fees.',
    logo: 'https://picsum.photos/seed/mdt/200',
    status: 'live',
    startTime: Date.now() - 86400000 * 3, // 3 days ago
    endTime: Date.now() + 86400000 * 4, // 4 days from now
    hardCap: 300,
    softCap: 150,
    raised: 180,
    price: 0.06,
    totalSupply: 5000000,
    address: '0x1234567890123456789012345678901234567890'
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    symbol: 'NFTM',
    description: 'A platform for trading NFTs with low fees and multi-chain support.',
    logo: 'https://picsum.photos/seed/nftm/200',
    status: 'ended',
    startTime: Date.now() - 86400000 * 30, // 30 days ago
    endTime: Date.now() - 86400000 * 23, // 23 days ago
    hardCap: 500,
    softCap: 200,
    raised: 500,
    price: 0.04,
    totalSupply: 10000000,
    address: '0x0987654321098765432109876543210987654321'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('contributions');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* User summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faWallet} className="text-orange-500" />
                </div>
                <span className="text-gray-400 text-sm">Total Contributions</span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">7.5 ETH</div>
                <p className="text-gray-400 text-sm">Across 3 projects</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCoins} className="text-orange-500" />
                </div>
                <span className="text-gray-400 text-sm">Tokens Received</span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">106,000</div>
                <p className="text-gray-400 text-sm">Across 3 tokens</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="text-orange-500" />
                </div>
                <span className="text-gray-400 text-sm">Projects Created</span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">2</div>
                <p className="text-gray-400 text-sm">
                  <span className="text-green-500">1 Active</span> • 1 Completed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contributions" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contributions">My Contributions</TabsTrigger>
                <TabsTrigger value="creations">My IDOs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contributions" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="p-3 text-left">Project</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Tokens</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userContributions.map((contribution) => (
                        <tr key={contribution.id} className="border-b border-secondary/30">
                          <td className="p-3">
                            <div className="flex items-center">
                              <div>
                                <div className="font-medium">{contribution.idoName}</div>
                                <div className="text-gray-400 text-sm">{contribution.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">{contribution.amount} ETH</td>
                          <td className="p-3">{contribution.tokenAmount.toLocaleString()} {contribution.symbol}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contribution.status === 'Claimed' 
                                ? 'bg-green-500/20 text-green-400' 
                                : contribution.status === 'Claimable' 
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {contribution.status}
                            </span>
                          </td>
                          <td className="p-3">{contribution.date}</td>
                          <td className="p-3">
                            <Link to={`/ido/${contribution.address}`}>
                              <Button size="sm" variant="outline" className="text-xs">
                                {contribution.status === 'Claimable' ? 'Claim' : 'View'}
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="creations" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatorProjects.map((project) => (
                    <IDOCard key={project.id} project={project} />
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/create">
                    <Button className="btn-primary">
                      <FontAwesomeIcon icon={faRocket} className="mr-2" />
                      Create New IDO
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* User activity chart (placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>{activeTab === 'contributions' ? 'Contribution History' : 'Project Performance'}</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-gray-400">
              Chart placeholder - In a real implementation this would show charts for
              {activeTab === 'contributions' ? ' your contribution history' : ' your project performance'}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
