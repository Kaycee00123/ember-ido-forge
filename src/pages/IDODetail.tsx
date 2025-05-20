
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faGlobe,
  faFileAlt,
  faChartLine,
  faUsers,
  faClock,
  faCalendar,
  faMoneyBill,
  faWallet,
  faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// Mock IDO data
const mockIDO = {
  id: '1',
  name: 'MetaVerse Token',
  symbol: 'MVT',
  description: 'A next-generation metaverse platform enabling virtual reality experiences and digital asset ownership. Our platform allows users to create, experience, and monetize content and applications in the virtual world.',
  longDescription: `
    MetaVerse Token (MVT) is building a revolutionary platform that bridges the gap between virtual reality and blockchain technology.
    
    Our ecosystem allows users to:
    - Create and monetize virtual experiences
    - Trade virtual land and assets as NFTs
    - Participate in governance decisions
    - Earn rewards through gameplay and content creation
    
    With a strong focus on user experience and security, MVT aims to become the leading metaverse platform in the blockchain space.
  `,
  logo: 'https://picsum.photos/seed/mvt/200',
  banner: 'https://picsum.photos/seed/mvt-banner/1200/300',
  status: 'live',
  startTime: Date.now() - 86400000, // 1 day ago
  endTime: Date.now() + 86400000 * 5, // 5 days from now
  hardCap: 500,
  softCap: 200,
  raised: 320,
  price: 0.05,
  minAllocation: 0.1,
  maxAllocation: 5,
  totalSupply: 1000000,
  address: '0x1234567890123456789012345678901234567890',
  tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
  website: 'https://example.com',
  whitepaper: 'https://example.com/whitepaper',
  twitter: 'https://twitter.com/example',
  telegram: 'https://t.me/example',
  discord: 'https://discord.gg/example',
  tokenomics: {
    publicSale: 20,
    team: 15,
    advisors: 5,
    marketing: 10,
    development: 25,
    ecosystem: 15,
    liquidity: 10
  },
  vestingSchedule: {
    publicSale: 'No vesting, 100% unlocked at TGE',
    team: '1 year cliff, then linear vesting for 2 years',
    advisors: '6 month cliff, then linear vesting for 1.5 years',
    marketing: '10% at TGE, then linear vesting for 1 year',
    development: '20% at TGE, then linear vesting for 2 years',
    ecosystem: '15% at TGE, then linear vesting for 3 years',
    liquidity: '100% locked for 1 year'
  },
  participants: 150
};

const IDODetail = () => {
  const { address } = useParams<{address: string}>();
  const [contributionAmount, setContributionAmount] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState(0);
  
  const progress = (mockIDO.raised / mockIDO.hardCap) * 100;
  const now = Date.now();
  const isLive = now >= mockIDO.startTime && now <= mockIDO.endTime;
  const hasStarted = now >= mockIDO.startTime;
  const hasEnded = now > mockIDO.endTime;
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContributionAmount(value);
    // Calculate estimated tokens
    const ethValue = parseFloat(value) || 0;
    setEstimatedTokens(ethValue / mockIDO.price);
  };
  
  const handleMaxClick = () => {
    setContributionAmount(mockIDO.maxAllocation.toString());
    setEstimatedTokens(mockIDO.maxAllocation / mockIDO.price);
  };

  return (
    <Layout>
      {/* Banner */}
      <div className="w-full h-64 md:h-80 bg-secondary/50 relative overflow-hidden">
        {mockIDO.banner ? (
          <img 
            src={mockIDO.banner}
            alt={`${mockIDO.name} banner`}
            className="w-full h-full object-cover opacity-60"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - IDO details */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex items-center justify-center border-2 border-orange-500">
                  {mockIDO.logo ? (
                    <img src={mockIDO.logo} alt={`${mockIDO.name} logo`} className="w-full h-full object-cover" />
                  ) : (
                    <FontAwesomeIcon icon={faRocket} className="text-orange-500 h-8 w-8" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    {mockIDO.name}
                    <span className="text-lg bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full">
                      ${mockIDO.symbol}
                    </span>
                  </h1>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <a href={mockIDO.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                      Website
                    </a>
                    <a href={mockIDO.whitepaper} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                      Whitepaper
                    </a>
                    <a href={mockIDO.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FontAwesomeIcon icon={faRocket} className="mr-1" />
                      Twitter
                    </a>
                    <a href={mockIDO.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                      <FontAwesomeIcon icon={faRocket} className="mr-1" />
                      Telegram
                    </a>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-gray-400 whitespace-pre-line">{mockIDO.longDescription}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-card p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Token Price</div>
                        <div className="text-lg font-semibold">{mockIDO.price} ETH</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Total Supply</div>
                        <div className="text-lg font-semibold">{mockIDO.totalSupply.toLocaleString()}</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Token Address</div>
                        <div className="text-sm font-mono truncate">{mockIDO.tokenAddress}</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">IDO Contract</div>
                        <div className="text-sm font-mono truncate">{mockIDO.address}</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tokenomics" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Token Distribution</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(mockIDO.tokenomics).map(([key, value]) => (
                        <div key={key} className="glass-card p-4 rounded-lg">
                          <div className="text-orange-500 font-semibold">{value}%</div>
                          <div className="text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Vesting Schedule</h3>
                    <div className="space-y-4">
                      {Object.entries(mockIDO.vestingSchedule).map(([key, value]) => (
                        <div key={key} className="glass-card p-4 rounded-lg">
                          <div className="text-gray-200 font-semibold capitalize">{key}</div>
                          <div className="text-gray-400">{value}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Contribution box */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress.toFixed(2)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-secondary" indicatorClassName="bg-orange-500" />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {mockIDO.raised} ETH raised
                    </span>
                    <span className="text-sm text-gray-400">
                      Goal: {mockIDO.hardCap} ETH
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-400">Start Date</p>
                    <p className="text-sm">{formatTime(mockIDO.startTime)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">End Date</p>
                    <p className="text-sm">{formatTime(mockIDO.endTime)}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm text-gray-400">Your Contribution</label>
                    <div className="flex">
                      <Input
                        type="number"
                        value={contributionAmount}
                        onChange={handleContributionChange}
                        placeholder="0.0"
                        className="rounded-r-none"
                      />
                      <Button 
                        variant="secondary"
                        className="rounded-l-none"
                        onClick={handleMaxClick}
                      >
                        MAX
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 px-1">
                      <span>Min: {mockIDO.minAllocation} ETH</span>
                      <span>Max: {mockIDO.maxAllocation} ETH</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">You Will Receive</label>
                    <div className="bg-secondary/60 border border-border/60 rounded-md p-3 font-mono">
                      {estimatedTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} {mockIDO.symbol}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${isLive ? 'btn-primary' : 'btn-secondary'}`}
                    disabled={!isLive || !contributionAmount}
                  >
                    {!hasStarted && (
                      <>
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        IDO Not Started
                      </>
                    )}
                    {isLive && (
                      <>
                        <FontAwesomeIcon icon={faRocket} className="mr-2" />
                        Contribute
                      </>
                    )}
                    {hasEnded && (
                      <>
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        IDO Ended
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary/40 rounded-md">
                    <p className="text-xs text-gray-400">Participants</p>
                    <p className="font-semibold">{mockIDO.participants}</p>
                  </div>
                  <div className="text-center p-3 bg-secondary/40 rounded-md">
                    <p className="text-xs text-gray-400">Token Price</p>
                    <p className="font-semibold">{mockIDO.price} ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IDODetail;
