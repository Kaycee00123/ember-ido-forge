
import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useConnectWallet } from '@/hooks/useConnectWallet';

export const ConnectButton = () => {
  const { 
    address, 
    ensName,
    chainId,
    isConnected, 
    isConnecting, 
    connectWallet, 
    disconnectWallet
  } = useConnectWallet();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // For demo purposes, this component will show a mock connected state
  // until we implement the actual wallet connection
  
  if (isConnected) {
    return (
      <div className="flex items-center">
        <Button 
          variant="outline"
          className="border-orange-500/50 bg-secondary text-white hover:bg-orange-500/20"
          onClick={disconnectWallet}
        >
          <span className="flex items-center">
            <FontAwesomeIcon icon={faCircle} className="h-2 w-2 text-green-500 mr-2" />
            {ensName || formatAddress(address || '')}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className="bg-secondary hover:bg-secondary/80 text-white"
      disabled={isConnecting}
    >
      <FontAwesomeIcon icon={faWallet} className="mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};
