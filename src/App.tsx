
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IDOsList from "./pages/IDOsList";
import IDODetail from "./pages/IDODetail";
import CreateIDO from "./pages/CreateIDO";
import EditIDO from "./pages/EditIDO";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core';
// Import solid icons
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
  faLock,
  faUnlock,
  faShield,
  faCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

// Import brand icons
import {
  faTwitter,
  faDiscord,
  faTelegram,
  faMedium
} from '@fortawesome/free-brands-svg-icons';

// Add FontAwesome icons to the library
library.add(
  // Solid icons
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
  faLock,
  faUnlock,
  faShield,
  faCircle,
  faEdit,
  // Brand icons
  faTwitter,
  faDiscord,
  faTelegram,
  faMedium
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
          <Route path="/edit/:address" element={<EditIDO />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
