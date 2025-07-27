import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Users, Flame, Sparkles, Trophy, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [quizCode, setQuizCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const joinQuiz = () => {
    if (quizCode.trim()) {
      const quizData = localStorage.getItem(`quiz_${quizCode.toUpperCase()}`);
      if (quizData) {
        navigate(`/quiz/${quizCode.toUpperCase()}`);
      } else {
        toast({
          title: "Quiz Not Found",
          description: "This quiz code doesn't exist. Double-check and try again!",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-ice via-background to-quiz-lavender relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-ocean rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-coral rounded-full blur-2xl opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-gradient-mint rounded-full blur-3xl opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-sky rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 left-16 text-quiz-coral text-3xl animate-bounce opacity-60">✨</div>
        <div className="absolute top-48 right-24 text-quiz-ocean text-2xl animate-pulse opacity-50">🌊</div>
        <div className="absolute bottom-40 left-32 text-quiz-mint text-3xl animate-float opacity-40">🌿</div>
        <div className="absolute bottom-24 right-48 text-quiz-coral text-2xl animate-bounce opacity-45">🔥</div>
      </div>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-glass border border-white/30 text-quiz-ocean px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-soft animate-bounce-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Ready to Test Your Friends?
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight leading-none">
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              Do You
            </span>
            <br />
            <span className="bg-gradient-coral bg-clip-text text-transparent relative">
              Even Know
              <div className="absolute -inset-1 bg-gradient-coral opacity-10 blur-2xl rounded-2xl"></div>
            </span>
            <br />
            <span className="bg-gradient-mint bg-clip-text text-transparent">
              Me?
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Create epic quizzes about yourself and watch your friends get 
            <span className="text-quiz-coral font-bold"> hilariously roasted </span>
            based on their scores! 🔥
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-16">
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              className="relative overflow-hidden bg-gradient-ocean hover:scale-105 transition-all duration-300 text-lg px-12 py-6 h-auto font-bold text-white shadow-large hover:shadow-glow group border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Brain className="h-6 w-6 mr-3" />
              Create Your Quiz
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground font-medium">or join with code:</div>
              <div className="flex gap-3">
                <Input
                  placeholder="ABC123"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  className="bg-gradient-glass backdrop-blur-glass border-white/30 uppercase tracking-wider text-center font-mono text-lg h-14 w-36 text-foreground placeholder:text-muted-foreground/60 shadow-soft focus:shadow-glow transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && joinQuiz()}
                  maxLength={6}
                />
                <Button
                  onClick={joinQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quizCode.trim()}
                  className="px-8 h-14 font-semibold border-white/30 bg-gradient-glass backdrop-blur-glass hover:bg-quiz-ocean/10 hover:border-quiz-ocean/50 transition-all duration-300 disabled:opacity-40"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Users, 
                title: "Create & Share", 
                desc: "Build personalized quizzes and share them instantly with a simple code", 
                gradient: "from-quiz-ocean/20 to-quiz-ice",
                iconBg: "bg-quiz-ocean/10",
                iconColor: "text-quiz-ocean",
                delay: "0s" 
              },
              { 
                icon: Trophy, 
                title: "Test Knowledge", 
                desc: "See how well your friends really know you with fun questions", 
                gradient: "from-quiz-mint/20 to-quiz-ice",
                iconBg: "bg-quiz-mint/10",
                iconColor: "text-quiz-mint",
                delay: "0.2s" 
              },
              { 
                icon: Flame, 
                title: "Epic Roasts", 
                desc: "Get hilarious, personalized roasts based on their quiz performance", 
                gradient: "from-quiz-coral/20 to-quiz-ice",
                iconBg: "bg-quiz-coral/10",
                iconColor: "text-quiz-coral",
                delay: "0.4s" 
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`group p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-glass border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-large cursor-pointer animate-slide-up`}
                style={{animationDelay: feature.delay}}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-quiz-ocean transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-ocean opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { label: "Quizzes Created", value: "1000+", icon: Brain },
              { label: "Friends Roasted", value: "5000+", icon: Flame },
              { label: "Laughs Generated", value: "∞", icon: Star },
              { label: "Friendships Tested", value: "2500+", icon: Users }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-glass backdrop-blur-glass border border-white/30 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-quiz-ocean" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;