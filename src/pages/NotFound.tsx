import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-quiz-danger/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-md w-full">
        <Card className="p-12 bg-white/5 backdrop-blur-md border-white/10 text-center animate-bounce-in shadow-2xl">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="text-8xl font-black mb-4 animate-glow-pulse">
              <span className="bg-gradient-primary bg-clip-text text-transparent">404</span>
            </div>
            <div className="text-6xl mb-6 animate-bounce-in" style={{animationDelay: '0.3s'}}>😵</div>
          </div>

          {/* Error message */}
          <div className="mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Oops! Page Not Found
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Maybe you mistyped the URL?
            </p>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <code className="text-xs text-quiz-danger break-all">
                {location.pathname}
              </code>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.7s'}}>
            <Button
              onClick={() => navigate('/')}
              className="w-full h-12 bg-gradient-primary hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 h-10 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-accent hover:bg-accent/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate('/create')}
                variant="outline"
                className="flex-1 h-10 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-primary hover:bg-primary/10"
              >
                <Search className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </div>
          </div>

          {/* Fun message */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 animate-slide-up" style={{animationDelay: '0.9s'}}>
            <p className="text-xs text-muted-foreground">
              "Even our 404 page knows you better than a 10% quiz score! 🔥"
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;