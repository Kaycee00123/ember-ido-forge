
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IDOsList from "./pages/IDOsList";
import IDODetail from "./pages/IDODetail";
import CreateIDO from "./pages/CreateIDO";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faRocket, 
  faChartLine, 
  faUsers, 
  faCoins, 
  faWallet, 
  faChevronRight,
  faSearch,
  faFilter,
  faGlobe,
  faFileAlt,
  faMoneyBill,
  faExchangeAlt,
  faClock,
  faCalendar,
  faBars,
  faTimes,
  faTwitter,
  faDiscord,
  faTelegram,
  faMedium,
  faLock,
  faUnlock,
  faShield,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(
  faRocket, 
  faChartLine, 
  faUsers, 
  faCoins, 
  faWallet, 
  faChevronRight,
  faSearch,
  faFilter,
  faGlobe,
  faFileAlt,
  faMoneyBill,
  faExchangeAlt,
  faClock,
  faCalendar,
  faBars,
  faTimes,
  faTwitter,
  faDiscord,
  faTelegram,
  faMedium,
  faLock,
  faUnlock,
  faShield,
  faCircle
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/idos" element={<IDOsList />} />
          <Route path="/ido/:address" element={<IDODetail />} />
          <Route path="/create" element={<CreateIDO />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
