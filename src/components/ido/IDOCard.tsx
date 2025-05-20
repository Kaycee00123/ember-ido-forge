
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faRocket, 
  faMoneyBill, 
  faUsers,
  faLock,
  faUnlock
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export interface IDOProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logo: string;
  banner?: string;
  status: 'upcoming' | 'live' | 'ended' | 'filled';
  startTime: number;
  endTime: number;
  hardCap: number;
  softCap: number;
  raised: number;
  price: number;
  totalSupply: number;
  address: string;
}

interface IDOCardProps {
  project: IDOProject;
  highlighted?: boolean;
}

export const IDOCard: React.FC<IDOCardProps> = ({ project, highlighted }) => {
  const progress = (project.raised / project.hardCap) * 100;
  const now = Date.now();
  const isLive = now >= project.startTime && now <= project.endTime;
  const hasStarted = now >= project.startTime;
  const hasEnded = now > project.endTime;
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = () => {
    switch (project.status) {
      case 'upcoming': return 'text-blue-400';
      case 'live': return 'text-green-400';
      case 'ended': return 'text-gray-400';
      case 'filled': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (project.status) {
      case 'upcoming': return faClock;
      case 'live': return faRocket;
      case 'ended': return faLock;
      case 'filled': return faUsers;
      default: return faClock;
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:border-orange-500/50 ${highlighted ? 'card-highlight' : ''}`}>
      {project.banner && (
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={project.banner} 
            alt={`${project.name} banner`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary/50 flex items-center justify-center">
          {project.logo ? (
            <img src={project.logo} alt={`${project.name} logo`} className="w-full h-full object-cover" />
          ) : (
            <FontAwesomeIcon icon={faRocket} className="text-orange-500 h-6 w-6" />
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold">{project.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">${project.symbol}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor()} bg-secondary/60 ml-2`}>
              <FontAwesomeIcon icon={getStatusIcon()} className="h-3 w-3" />
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress.toFixed(2)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-secondary" indicatorClassName="bg-orange-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Raised</p>
              <p className="font-semibold">{project.raised} / {project.hardCap} ETH</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className="font-semibold">{project.price} ETH</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Start</p>
              <p className="text-sm">{formatTime(project.startTime)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">End</p>
              <p className="text-sm">{formatTime(project.endTime)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/ido/${project.address}`} className="w-full">
          <Button className={`w-full ${isLive ? 'btn-primary' : 'btn-secondary'}`}>
            {!hasStarted && (
              <>
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                View Details
              </>
            )}
            {isLive && (
              <>
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Participate Now
              </>
            )}
            {hasEnded && (
              <>
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                View Results
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
