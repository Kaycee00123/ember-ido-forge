import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCoins, faWallet, faChartLine, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

// Mock data for demonstration purposes
const mockOverviewData = {
  totalInvested: 15000,
  activeIdos: 5,
  upcomingIdos: 3,
  totalWalletBalance: 5.25,
};

// Mock data for investments
const mockInvestments = [
  {
    id: 1,
    name: 'Alpha Token',
    symbol: 'ALP',
    amountInvested: 1000,
    currentValue: 1200,
    roi: 20,
  },
  {
    id: 2,
    name: 'Beta Coin',
    symbol: 'BTC',
    amountInvested: 5000,
    currentValue: 4500,
    roi: -10,
  },
];

const Dashboard = () => {
  // Mock data for user's created IDOs
  const myCreatedIDOs = [
    {
      id: 1,
      name: 'Rocket Token',
      symbol: 'RKT',
      status: 'active',
      address: '0x1234567890abcdef1234567890abcdef12345678',
      progress: 75,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-15'),
    },
    {
      id: 2,
      name: 'Moon Token',
      symbol: 'MOON',
      status: 'upcoming',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      progress: 0,
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-15'),
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="created">Created IDOs</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faWallet} />
                    Total Invested
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">${mockOverviewData.totalInvested}</div>
                  <p className="text-sm text-gray-500">Across all IDOs</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faChartLine} />
                    Active IDOs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{mockOverviewData.activeIdos}</div>
                  <p className="text-sm text-gray-500">Currently participating</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faRocket} />
                    Upcoming IDOs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{mockOverviewData.upcomingIdos}</div>
                  <p className="text-sm text-gray-500">Opportunities awaiting</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCoins} />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{mockOverviewData.totalWalletBalance} ETH</div>
                  <p className="text-sm text-gray-500">Total in connected wallet</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faWallet} />
                  My Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockInvestments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No investments yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockInvestments.map(investment => (
                      <div key={investment.id} className="border border-border/50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{investment.name} ({investment.symbol})</h3>
                            <p className="text-sm text-gray-400">Invested: ${investment.amountInvested}</p>
                          </div>
                          <div>
                            <p className="text-right">Current Value: ${investment.currentValue}</p>
                            <p className={`text-sm ${investment.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              ROI: {investment.roi}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="created">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faRocket} />
                  My Created IDOs
                </CardTitle>
              </CardHeader>
              <CardContent>
                {myCreatedIDOs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't created any IDOs yet.</p>
                    <Button asChild>
                      <Link to="/create">Create Your First IDO</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myCreatedIDOs.map(ido => (
                      <div key={ido.id} className="border border-border/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-secondary/50 h-10 w-10 rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faRocket} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{ido.name} ({ido.symbol})</h3>
                              <p className="text-sm text-gray-400">{ido.address.substring(0, 8)}...{ido.address.substring(ido.address.length - 6)}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/ido/${ido.address}`}>
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/edit/${ido.address}`} className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faEdit} className="text-xs" />
                                Edit
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-400">Status</p>
                            <p className="capitalize">{ido.status}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Start Date</p>
                            <p>{ido.startDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">End Date</p>
                            <p>{ido.endDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faWallet} />
                  Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect your wallet to view your balance and manage your funds.</p>
                <Button>Connect Wallet</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
