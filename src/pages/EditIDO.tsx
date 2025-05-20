
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faChartLine, faRocket, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const EditIDO = () => {
  const { address } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Token info state
  const [tokenInfo, setTokenInfo] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '18',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    existingToken: true,
    tokenAddress: '',
  });
  
  // Sale configuration state
  const [saleConfig, setSaleConfig] = useState({
    price: '',
    hardCap: '',
    softCap: '',
    minAllocation: '',
    maxAllocation: '',
    startTime: '',
    endTime: '',
    vestingPeriod: '0',
    vestingCliff: '0',
    vestingInitialRelease: '100',
  });

  // Load existing IDO data
  useEffect(() => {
    // In a real implementation, this would fetch data from the blockchain or API
    // For now, we'll use a mock data fetch with a timeout
    const fetchIDOData = async () => {
      setIsLoading(true);
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on the address
        setTokenInfo({
          name: 'Sample Token',
          symbol: 'STKN',
          totalSupply: '1000000',
          decimals: '18',
          description: 'This is a sample token for the Ember IDO platform.',
          website: 'https://example.com',
          twitter: 'https://twitter.com/example',
          telegram: 'https://t.me/example',
          existingToken: true,
          tokenAddress: address || '0x1234...5678',
        });
        
        setSaleConfig({
          price: '0.001',
          hardCap: '100',
          softCap: '50',
          minAllocation: '0.1',
          maxAllocation: '5',
          startTime: '2025-06-01T12:00',
          endTime: '2025-06-08T12:00',
          vestingPeriod: '30',
          vestingCliff: '7',
          vestingInitialRelease: '20',
        });
      } catch (error) {
        console.error('Failed to fetch IDO data:', error);
        toast({
          title: "Error",
          description: "Failed to load IDO data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIDOData();
  }, [address, toast]);

  const handleTokenInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTokenInfo(prev => ({ ...prev, [name]: checked }));
    } else {
      setTokenInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSaleConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Token Info:', tokenInfo);
    console.log('Sale Config:', saleConfig);
    
    // Mock update operation
    toast({
      title: "Success",
      description: "IDO updated successfully!",
    });
    
    // Redirect to IDO detail page
    setTimeout(() => {
      navigate(`/ido/${address}`);
    }, 1500);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">Edit IDO</h1>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-500">Loading IDO data...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FontAwesomeIcon icon={faEdit} className="mr-3 text-orange-500" />
          Edit IDO
        </h1>
        <p className="text-gray-400 mb-8">Address: {address}</p>
        
        <div className="mb-10">
          <div className="flex mb-4 relative">
            <div className="flex-1">
              <div className={`step-item ${currentStep >= 1 ? 'active' : ''}`}>
                <div className={`step-circle ${currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto`}>
                  <FontAwesomeIcon icon={faCoins} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Token Info</div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
                <div className={`step-circle ${currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto`}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Sale Configuration</div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                <div className={`step-circle ${currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto`}>
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Review & Save</div>
              </div>
            </div>
            
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary z-0">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Step 1: Edit Token Information"}
              {currentStep === 2 && "Step 2: Edit Sale Configuration"}
              {currentStep === 3 && "Step 3: Review & Save Changes"}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  {tokenInfo.existingToken ? (
                    <div className="bg-secondary/30 p-4 rounded-md mb-4">
                      <p className="text-sm">
                        <span className="font-semibold">Note:</span> This IDO uses an existing ERC20 token. 
                        The token address cannot be changed after creation.
                      </p>
                    </div>
                  ) : null}
                  
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your project..."
                      value={tokenInfo.description}
                      onChange={handleTokenInfoChange}
                      className="mt-1 h-32"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://example.com"
                        value={tokenInfo.website}
                        onChange={handleTokenInfoChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        placeholder="https://twitter.com/example"
                        value={tokenInfo.twitter}
                        onChange={handleTokenInfoChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telegram">Telegram</Label>
                      <Input
                        id="telegram"
                        name="telegram"
                        placeholder="https://t.me/example"
                        value={tokenInfo.telegram}
                        onChange={handleTokenInfoChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-secondary/30 p-4 rounded-md mb-4">
                    <p className="text-sm">
                      <span className="font-semibold">Note:</span> Some parameters may not be editable if the IDO has already started.
                      Changes to sale parameters may require approval from the platform administrator.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="datetime-local"
                        value={saleConfig.startTime}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="datetime-local"
                        value={saleConfig.endTime}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <h3 className="font-semibold mb-3">Vesting Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="vestingInitialRelease">Initial Release (%)</Label>
                        <Input
                          id="vestingInitialRelease"
                          name="vestingInitialRelease"
                          type="number"
                          placeholder="100"
                          value={saleConfig.vestingInitialRelease}
                          onChange={handleSaleConfigChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vestingCliff">Cliff Period (days)</Label>
                        <Input
                          id="vestingCliff"
                          name="vestingCliff"
                          type="number"
                          placeholder="0"
                          value={saleConfig.vestingCliff}
                          onChange={handleSaleConfigChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vestingPeriod">Vesting Period (days)</Label>
                        <Input
                          id="vestingPeriod"
                          name="vestingPeriod"
                          type="number"
                          placeholder="0"
                          value={saleConfig.vestingPeriod}
                          onChange={handleSaleConfigChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Review Your Changes</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-3 text-orange-500">Token Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <p className="text-gray-400">Token Address</p>
                          <p className="font-mono">{tokenInfo.tokenAddress}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400">Project Description</p>
                          <p className="text-sm">{tokenInfo.description || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Website</p>
                          <p className="text-sm break-all">{tokenInfo.website || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Twitter</p>
                          <p className="text-sm break-all">{tokenInfo.twitter || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Telegram</p>
                          <p className="text-sm break-all">{tokenInfo.telegram || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-3 text-orange-500">Sale Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400">Start Time</p>
                          <p>{saleConfig.startTime ? new Date(saleConfig.startTime).toLocaleString() : 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">End Time</p>
                          <p>{saleConfig.endTime ? new Date(saleConfig.endTime).toLocaleString() : 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-3 text-orange-500">Vesting Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400">Initial Release</p>
                          <p>{saleConfig.vestingInitialRelease}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Cliff Period</p>
                          <p>{saleConfig.vestingCliff} days</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Vesting Period</p>
                          <p>{saleConfig.vestingPeriod} days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-md">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faEdit} className="text-orange-500" />
                      Save Your Changes
                    </h4>
                    <p className="text-sm mt-2">
                      You are about to update your IDO on the Ember platform. Some changes may require 
                      approval from the platform administrators. Please review all details before proceeding.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button type="button" className="ml-auto" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditIDO;
