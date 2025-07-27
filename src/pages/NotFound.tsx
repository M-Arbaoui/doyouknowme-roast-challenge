import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "SYSTEM ERROR 404: Unauthorized access attempt to restricted sector:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyberpunk error background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-destructive/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-quiz-electric/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-quiz-cyan/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-lg w-full">
        <Card className="p-16 bg-gradient-glass backdrop-blur-glass border border-white/20 text-center animate-bounce-in shadow-mega">
          {/* Animated Error Code */}
          <div className="mb-12">
            <div className="text-9xl font-black mb-6 animate-glow-pulse">
              <span className="bg-gradient-electric bg-clip-text text-transparent">404</span>
            </div>
            <div className="text-7xl mb-8 animate-bounce-in" style={{animationDelay: '0.3s'}}>🚫</div>
          </div>

          {/* Error Protocol */}
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <h1 className="text-3xl font-black text-foreground mb-4 tracking-wider">
              ACCESS DENIED
            </h1>
            <p className="text-muted-foreground leading-relaxed font-medium mb-6">
              The sector you're attempting to access doesn't exist or has been terminated. 
              Check your coordinates and try again.
            </p>
            <div className="mt-6 p-4 bg-gradient-glass rounded-lg border border-destructive/30">
              <div className="text-xs text-destructive font-mono tracking-wider mb-2">ERROR LOG:</div>
              <code className="text-xs text-destructive break-all font-mono">
                {location.pathname}
              </code>
            </div>
          </div>

          {/* Recovery Protocols */}
          <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.7s'}}>
            <Button
              onClick={() => navigate('/')}
              className="w-full h-16 bg-gradient-electric hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow font-black tracking-wider text-lg shadow-electric"
            >
              <Home className="h-6 w-6 mr-3" />
              RETURN TO BASE
            </Button>
            
            <div className="flex gap-4">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 h-12 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-cyan hover:bg-quiz-cyan/10 font-black tracking-wider"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                FALLBACK
              </Button>
              <Button
                onClick={() => navigate('/create')}
                variant="outline"
                className="flex-1 h-12 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-electric hover:bg-quiz-electric/10 font-black tracking-wider"
              >
                <Zap className="h-5 w-5 mr-2" />
                CREATE WEAPON
              </Button>
            </div>
          </div>

          {/* System Message */}
          <div className="mt-12 p-6 bg-gradient-glass rounded-lg border border-white/10 animate-slide-up" style={{animationDelay: '0.9s'}}>
            <p className="text-xs text-muted-foreground font-mono tracking-wider">
              "Even our 404 protocol has better accuracy than a 10% quiz score! ⚡"
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;