
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faChartLine, faRocket, faClock, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const CreateIDO = () => {
  const { toast } = useToast();
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
    // New token features
    isBurnable: false,
    isPausable: false,
    hasMinting: false,
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
    // Whitelist settings
    useWhitelist: false,
    whitelistedAddresses: '',
  });

  // Animation states
  const [animateStep, setAnimateStep] = useState(1);

  const handleTokenInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTokenInfo(prev => ({ ...prev, [name]: checked }));
    } else {
      setTokenInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSaleConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name.startsWith('token')) {
      const propName = name.replace('token', '');
      const camelCaseProp = propName.charAt(0).toLowerCase() + propName.slice(1);
      setTokenInfo(prev => ({ ...prev, [camelCaseProp]: checked }));
    } else {
      setSaleConfig(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleNextStep = () => {
    setAnimateStep(currentStep + 1);
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }, 200);
  };

  const handlePreviousStep = () => {
    setAnimateStep(currentStep - 1);
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Token Info:', tokenInfo);
    console.log('Sale Config:', saleConfig);
    // Here you would connect to wallet and deploy contracts
    toast({
      title: "IDO Deployment initiated",
      description: "Your IDO is being deployed to the blockchain.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Your IDO
        </motion.h1>
        
        <div className="mb-10">
          <div className="flex mb-4 relative">
            <div className="flex-1">
              <motion.div 
                className={`step-item ${currentStep >= 1 ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`step-circle ${currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors duration-300`}>
                  <FontAwesomeIcon icon={faCoins} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Token Info</div>
              </motion.div>
            </div>
            
            <div className="flex-1">
              <motion.div 
                className={`step-item ${currentStep >= 2 ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`step-circle ${currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors duration-300`}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Sale Configuration</div>
              </motion.div>
            </div>
            
            <div className="flex-1">
              <motion.div 
                className={`step-item ${currentStep >= 3 ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`step-circle ${currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-secondary text-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors duration-300`}>
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <div className="step-title mt-2 text-center text-sm">Review & Deploy</div>
              </motion.div>
            </div>
            
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary z-0">
              <motion.div
                className="h-full bg-orange-500"
                initial={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial="hidden"
          animate={currentStep === animateStep ? "visible" : "hidden"}
          variants={fadeIn}
        >
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
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="mb-6">
                      <div className="mb-4 flex items-center space-x-2">
                        <Switch
                          id="existingToken"
                          checked={tokenInfo.existingToken}
                          onCheckedChange={(checked) => 
                            setTokenInfo(prev => ({ ...prev, existingToken: checked }))
                          }
                        />
                        <Label htmlFor="existingToken">I already have an ERC20 token</Label>
                      </div>
                      
                      {tokenInfo.existingToken ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Label htmlFor="tokenAddress">Token Address</Label>
                          <Input
                            id="tokenAddress"
                            name="tokenAddress"
                            placeholder="0x..."
                            value={tokenInfo.tokenAddress}
                            onChange={handleTokenInfoChange}
                            className="mt-1"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, staggerChildren: 0.1 }}
                          className="space-y-6"
                        >
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

                          {/* Token features section */}
                          <div className="bg-secondary/30 p-4 rounded-md">
                            <h3 className="font-semibold mb-3 flex items-center">
                              <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-orange-500" />
                              Token Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="tokenIsBurnable"
                                  checked={tokenInfo.isBurnable}
                                  onCheckedChange={(checked) => 
                                    handleSwitchChange('tokenIsBurnable', checked)
                                  }
                                />
                                <Label htmlFor="tokenIsBurnable">Burnable</Label>
                                <div className="text-xs text-gray-400 ml-1">(Allow tokens to be burned)</div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="tokenIsPausable"
                                  checked={tokenInfo.isPausable}
                                  onCheckedChange={(checked) => 
                                    handleSwitchChange('tokenIsPausable', checked)
                                  }
                                />
                                <Label htmlFor="tokenIsPausable">Pausable</Label>
                                <div className="text-xs text-gray-400 ml-1">(Allow pausing transfers)</div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="tokenHasMinting"
                                  checked={tokenInfo.hasMinting}
                                  onCheckedChange={(checked) => 
                                    handleSwitchChange('tokenHasMinting', checked)
                                  }
                                />
                                <Label htmlFor="tokenHasMinting">Mintable</Label>
                                <div className="text-xs text-gray-400 ml-1">(Allow minting new tokens)</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
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
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
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
                    
                    {/* Whitelist Section */}
                    <motion.div 
                      className="bg-secondary/50 p-4 rounded-md"
                      whileHover={{ backgroundColor: "hsl(228, 16%, 18%)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold mb-3 flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="mr-2 text-orange-500" />
                        Whitelist Configuration
                      </h3>
                      
                      <div className="mb-4 flex items-center space-x-2">
                        <Switch
                          id="useWhitelist"
                          checked={saleConfig.useWhitelist}
                          onCheckedChange={(checked) => setSaleConfig(prev => ({ ...prev, useWhitelist: checked }))}
                        />
                        <Label htmlFor="useWhitelist">Enable whitelist for this IDO</Label>
                      </div>
                      
                      {saleConfig.useWhitelist && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Label htmlFor="whitelistedAddresses">Whitelisted Addresses (one per line)</Label>
                          <Textarea
                            id="whitelistedAddresses"
                            name="whitelistedAddresses"
                            placeholder="0x1234...&#10;0x5678...&#10;0xabcd..."
                            value={saleConfig.whitelistedAddresses}
                            onChange={handleSaleConfigChange}
                            className="mt-1 h-32 font-mono"
                          />
                          <div className="text-xs text-gray-400 mt-1">
                            Enter one Ethereum address per line. Only these addresses will be able to participate in the IDO.
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="bg-secondary/50 p-4 rounded-md"
                      whileHover={{ backgroundColor: "hsl(228, 16%, 18%)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold mb-3 flex items-center">
                        <FontAwesomeIcon icon={faClock} className="mr-2 text-orange-500" />
                        Vesting Configuration
                      </h3>
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
                    </motion.div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="bg-secondary/30 p-6 rounded-lg"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
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
                              <div className="col-span-2">
                                <p className="text-gray-400">Features</p>
                                <p>
                                  {[
                                    tokenInfo.isBurnable && 'Burnable',
                                    tokenInfo.isPausable && 'Pausable',
                                    tokenInfo.hasMinting && 'Mintable'
                                  ].filter(Boolean).join(', ') || 'None'}
                                </p>
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
                          <div className="col-span-2">
                            <p className="text-gray-400">Whitelist</p>
                            <p>{saleConfig.useWhitelist ? `Enabled (${saleConfig.whitelistedAddresses.split('\n').filter(a => a.trim()).length} addresses)` : 'Disabled'}</p>
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
                    </motion.div>
                    
                    <motion.div 
                      className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-md"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-semibold flex items-center gap-2">
                        <FontAwesomeIcon icon={faRocket} className="text-orange-500" />
                        Ready to Launch Your IDO
                      </h4>
                      <p className="text-sm mt-2">
                        You are about to create an IDO on the Ember platform. This will deploy smart contracts 
                        to the blockchain. Please carefully review all details before proceeding.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button type="button" variant="outline" onClick={handlePreviousStep}>
                        Previous
                      </Button>
                    </motion.div>
                  )}
                  
                  {currentStep < 3 ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-auto">
                      <Button type="button" className="btn-primary" onClick={handleNextStep}>
                        Next
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      className="ml-auto"
                    >
                      <Button type="submit" className="btn-primary">
                        <FontAwesomeIcon icon={faRocket} className="mr-2" />
                        Deploy IDO
                      </Button>
                    </motion.div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateIDO;
