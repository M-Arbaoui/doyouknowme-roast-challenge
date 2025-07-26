import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Users, Flame, Code, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-quiz.jpg";

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float opacity-60"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float opacity-40" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 animate-bounce-in shadow-lg">
              <Flame className="h-4 w-4 animate-pulse" />
              Get Ready to be Roasted
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Do You Even
              </span>
              <br />
              <span className="text-foreground relative">
                Know Me?
                <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-lg rounded-lg"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
              Test your friends and watch them get 
              <span className="text-accent font-bold"> roasted! 🔥</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto mb-16">
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="relative overflow-hidden bg-gradient-primary hover:opacity-90 transition-all duration-300 text-lg px-10 py-6 h-auto font-semibold text-primary-foreground shadow-2xl hover:shadow-primary/25 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Brain className="h-6 w-6 mr-3" />
                Create Quiz
              </Button>
              
              <div className="flex gap-3">
                <div className="relative">
                  <Input
                    placeholder="ABC123"
                    value={quizCode}
                    onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                    className="bg-white/5 backdrop-blur-md border-white/10 uppercase tracking-wider text-center font-mono text-lg h-16 w-32 text-foreground placeholder:text-muted-foreground/50 shadow-lg focus:shadow-primary/25 transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && joinQuiz()}
                    maxLength={6}
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-primary opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <Button
                  onClick={joinQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quizCode.trim()}
                  className="px-8 h-16 font-semibold border-white/10 bg-white/5 backdrop-blur-md hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 disabled:opacity-40"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Create & Share", desc: "Make a quiz, get a code, share with friends", color: "primary", delay: "0s" },
              { icon: Trophy, title: "Get Scored", desc: "See how well they really know you", color: "accent", delay: "0.2s" },
              { icon: Flame, title: "Get Roasted", desc: "Epic roasts based on their score", color: "quiz-danger", delay: "0.4s" }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group p-8 bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 animate-slide-up cursor-pointer relative"
                style={{animationDelay: feature.delay}}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.color}/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-32 left-10 text-4xl animate-float opacity-30">🔥</div>
        <div className="absolute top-40 right-16 text-3xl animate-float opacity-40" style={{animationDelay: '1s'}}>😂</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float opacity-20" style={{animationDelay: '2s'}}>💀</div>
        <div className="absolute bottom-40 right-32 text-3xl animate-float opacity-35" style={{animationDelay: '1.5s'}}>🧠</div>
      </div>
    </div>
  );
};

export default Index;
