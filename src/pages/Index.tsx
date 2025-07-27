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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-electric rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-cyber rounded-full blur-3xl opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-gradient-sunset rounded-full blur-3xl opacity-35 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-lime rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        
        {/* Neon Floating Elements */}
        <div className="absolute top-32 left-16 text-quiz-pink text-4xl animate-bounce opacity-80">⚡</div>
        <div className="absolute top-48 right-24 text-quiz-cyan text-3xl animate-pulse opacity-70">💎</div>
        <div className="absolute bottom-40 left-32 text-quiz-lime text-4xl animate-float opacity-60">🚀</div>
        <div className="absolute bottom-24 right-48 text-quiz-orange text-3xl animate-bounce opacity-75">🔥</div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white/[0.02] to-transparent"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Neon Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-glass border border-quiz-electric/30 text-quiz-electric px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-electric animate-bounce-in">
            <Sparkles className="h-5 w-5 animate-pulse text-quiz-pink" />
            Ready to Destroy Your Friends?
          </div>
          
          {/* Cyberpunk Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-electric bg-clip-text text-transparent relative">
              DO YOU
              <div className="absolute -inset-2 bg-gradient-electric opacity-20 blur-3xl rounded-3xl"></div>
            </span>
            <br />
            <span className="bg-gradient-cyber bg-clip-text text-transparent relative">
              EVEN KNOW
              <div className="absolute -inset-2 bg-gradient-cyber opacity-20 blur-3xl rounded-3xl"></div>
            </span>
            <br />
            <span className="bg-gradient-sunset bg-clip-text text-transparent relative">
              ME?
              <div className="absolute -inset-2 bg-gradient-sunset opacity-20 blur-3xl rounded-3xl"></div>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Create <span className="text-quiz-electric font-bold">devastating quizzes</span> about yourself and watch your friends get 
            <span className="text-quiz-pink font-bold"> absolutely obliterated </span>
            based on their pathetic scores! 
            <span className="text-quiz-cyan text-3xl ml-2">⚡</span>
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-16">
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              className="relative overflow-hidden bg-gradient-electric hover:scale-110 transition-all duration-300 text-xl px-16 py-8 h-auto font-black text-primary-foreground shadow-electric hover:shadow-mega group border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <Brain className="h-7 w-7 mr-4 animate-pulse" />
              CREATE DESTRUCTION
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground font-bold text-lg">or infiltrate with code:</div>
              <div className="flex gap-3">
                <Input
                  placeholder="ABC123"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  className="bg-gradient-glass backdrop-blur-glass border-quiz-electric/50 uppercase tracking-wider text-center font-mono text-xl h-16 w-40 text-foreground placeholder:text-muted-foreground/60 shadow-electric focus:shadow-mega transition-all duration-300 focus:border-quiz-pink"
                  onKeyPress={(e) => e.key === 'Enter' && joinQuiz()}
                  maxLength={6}
                />
                <Button
                  onClick={joinQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quizCode.trim()}
                  className="px-10 h-16 font-black border-quiz-cyan/50 bg-gradient-glass backdrop-blur-glass hover:bg-quiz-cyan/20 hover:border-quiz-cyan text-quiz-cyan hover:text-primary-foreground transition-all duration-300 disabled:opacity-40 text-lg"
                >
                  <Zap className="h-6 w-6 mr-3 animate-pulse" />
                  INFILTRATE
                </Button>
              </div>
            </div>
          </div>

          {/* Cyberpunk Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Users, 
                title: "CREATE & DEPLOY", 
                desc: "Build devastating personality assessments and deploy them with military precision", 
                gradient: "bg-gradient-electric",
                shadow: "shadow-electric",
                delay: "0s" 
              },
              { 
                icon: Trophy, 
                title: "PSYCHOLOGICAL WARFARE", 
                desc: "Expose the depths of your friends' ignorance about who you really are", 
                gradient: "bg-gradient-cyber",
                shadow: "shadow-cyan",
                delay: "0.2s" 
              },
              { 
                icon: Flame, 
                title: "TACTICAL ANNIHILATION", 
                desc: "Watch as AI-generated roasts obliterate their confidence based on failure levels", 
                gradient: "bg-gradient-sunset",
                shadow: "shadow-pink",
                delay: "0.4s" 
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`group relative p-8 bg-gradient-glass backdrop-blur-glass border border-white/20 hover:border-quiz-electric/50 transition-all duration-500 hover:scale-110 hover:${feature.shadow} cursor-pointer animate-slide-up overflow-hidden`}
                style={{animationDelay: feature.delay}}
              >
                {/* Neon border effect */}
                <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}></div>
                
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-glass border border-white/30 rounded-2xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ${feature.shadow}`}>
                    <feature.icon className={`h-10 w-10 text-white group-hover:scale-125 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-quiz-electric transition-colors duration-300 tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300 font-medium">
                    {feature.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Nuclear Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "MINDS INFILTRATED", value: "10K+", icon: Brain, color: "text-quiz-electric" },
              { label: "SOULS DESTROYED", value: "50K+", icon: Flame, color: "text-quiz-pink" },
              { label: "EGOS SHATTERED", value: "∞", icon: Star, color: "text-quiz-cyan" },
              { label: "BONDS TESTED", value: "25K+", icon: Users, color: "text-quiz-lime" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-glass backdrop-blur-glass border border-white/20 rounded-2xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-electric">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.color} animate-pulse`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground font-bold tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;