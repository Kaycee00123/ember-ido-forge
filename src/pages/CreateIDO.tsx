
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faChartLine, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateIDO = () => {
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
    existingToken: false,
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
    // Here you would connect to wallet and deploy contracts
    alert('This would deploy your IDO in a real implementation!');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Create Your IDO</h1>
        
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
                <div className="step-title mt-2 text-center text-sm">Review & Deploy</div>
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
              {currentStep === 1 && "Step 1: Token Information"}
              {currentStep === 2 && "Step 2: Sale Configuration"}
              {currentStep === 3 && "Step 3: Review & Deploy"}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="mb-4">
                      <input
                        type="checkbox"
                        id="existingToken"
                        name="existingToken"
                        className="mr-2"
                        checked={tokenInfo.existingToken}
                        onChange={handleTokenInfoChange}
                      />
                      <label htmlFor="existingToken">I already have an ERC20 token</label>
                    </div>
                    
                    {tokenInfo.existingToken ? (
                      <div>
                        <Label htmlFor="tokenAddress">Token Address</Label>
                        <Input
                          id="tokenAddress"
                          name="tokenAddress"
                          placeholder="0x..."
                          value={tokenInfo.tokenAddress}
                          onChange={handleTokenInfoChange}
                          className="mt-1"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Token Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="My Token"
                            value={tokenInfo.name}
                            onChange={handleTokenInfoChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="symbol">Token Symbol</Label>
                          <Input
                            id="symbol"
                            name="symbol"
                            placeholder="TKN"
                            value={tokenInfo.symbol}
                            onChange={handleTokenInfoChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="totalSupply">Total Supply</Label>
                          <Input
                            id="totalSupply"
                            name="totalSupply"
                            type="number"
                            placeholder="1000000"
                            value={tokenInfo.totalSupply}
                            onChange={handleTokenInfoChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="decimals">Decimals</Label>
                          <Input
                            id="decimals"
                            name="decimals"
                            type="number"
                            value={tokenInfo.decimals}
                            onChange={handleTokenInfoChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="price">Token Price (ETH)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.0001"
                        value={saleConfig.price}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hardCap">Hard Cap (ETH)</Label>
                      <Input
                        id="hardCap"
                        name="hardCap"
                        type="number"
                        placeholder="100"
                        value={saleConfig.hardCap}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="softCap">Soft Cap (ETH)</Label>
                      <Input
                        id="softCap"
                        name="softCap"
                        type="number"
                        placeholder="50"
                        value={saleConfig.softCap}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minAllocation">Minimum Allocation (ETH)</Label>
                      <Input
                        id="minAllocation"
                        name="minAllocation"
                        type="number"
                        placeholder="0.1"
                        value={saleConfig.minAllocation}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxAllocation">Maximum Allocation (ETH)</Label>
                      <Input
                        id="maxAllocation"
                        name="maxAllocation"
                        type="number"
                        placeholder="5"
                        value={saleConfig.maxAllocation}
                        onChange={handleSaleConfigChange}
                        className="mt-1"
                      />
                    </div>
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
                    <h3 className="text-xl font-semibold mb-4">Review Your IDO Details</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-3 text-orange-500">Token Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {tokenInfo.existingToken ? (
                          <div className="col-span-2">
                            <p className="text-gray-400">Token Address</p>
                            <p className="font-mono">{tokenInfo.tokenAddress || 'Not provided'}</p>
                          </div>
                        ) : (
                          <>
                            <div>
                              <p className="text-gray-400">Token Name</p>
                              <p>{tokenInfo.name || 'Not provided'}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Token Symbol</p>
                              <p>{tokenInfo.symbol || 'Not provided'}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Total Supply</p>
                              <p>{tokenInfo.totalSupply || 'Not provided'}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Decimals</p>
                              <p>{tokenInfo.decimals}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-3 text-orange-500">Sale Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400">Token Price</p>
                          <p>{saleConfig.price ? `${saleConfig.price} ETH` : 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Hard Cap</p>
                          <p>{saleConfig.hardCap ? `${saleConfig.hardCap} ETH` : 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Soft Cap</p>
                          <p>{saleConfig.softCap ? `${saleConfig.softCap} ETH` : 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Allocation Range</p>
                          <p>
                            {saleConfig.minAllocation && saleConfig.maxAllocation 
                              ? `${saleConfig.minAllocation} - ${saleConfig.maxAllocation} ETH` 
                              : 'Not provided'}
                          </p>
                        </div>
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
                      <FontAwesomeIcon icon={faRocket} className="text-orange-500" />
                      Ready to Launch Your IDO
                    </h4>
                    <p className="text-sm mt-2">
                      You are about to create an IDO on the Ember platform. This will deploy smart contracts 
                      to the blockchain. Please carefully review all details before proceeding.
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
                  <Button type="button" className="btn-primary ml-auto" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="btn-primary ml-auto">
                    <FontAwesomeIcon icon={faRocket} className="mr-2" />
                    Deploy IDO
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

export default CreateIDO;
