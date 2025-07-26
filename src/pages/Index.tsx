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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Quiz Challenge Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-glow">
              <Flame className="h-4 w-4" />
              Get Ready to be Roasted
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Do You Even
              </span>
              <br />
              <span className="text-foreground">Know Me?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Create quizzes about yourself and watch your friends get roasted based on how poorly they score. 
              The ultimate test of friendship! 🔥
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="bg-gradient-primary hover:opacity-80 transition-opacity animate-pulse-glow"
              >
                <Brain className="h-5 w-5 mr-2" />
                Create Quiz
              </Button>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter quiz code"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  className="bg-secondary/50 border-border uppercase tracking-wider"
                  onKeyPress={(e) => e.key === 'Enter' && joinQuiz()}
                  maxLength={6}
                />
                <Button
                  onClick={joinQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quizCode.trim()}
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-colors group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Test Your Friends</h3>
                <p className="text-muted-foreground text-sm">
                  Create personalized quizzes and see who really knows you best
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 hover:border-accent/50 transition-colors group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                  <Flame className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Epic Roasts</h3>
                <p className="text-muted-foreground text-sm">
                  Get savage roasts based on scores - from cute to absolutely brutal
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 hover:border-quiz-success/50 transition-colors group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-quiz-success/10 rounded-lg mb-4 group-hover:bg-quiz-success/20 transition-colors">
                  <Trophy className="h-6 w-6 text-quiz-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Score & Share</h3>
                <p className="text-muted-foreground text-sm">
                  Get percentage scores and shareable codes to challenge everyone
                </p>
              </div>
            </Card>
          </div>

          {/* How It Works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", icon: Brain, title: "Create", desc: "Make questions about yourself" },
                { step: "2", icon: Code, title: "Share", desc: "Get a unique quiz code" },
                { step: "3", icon: Users, title: "Challenge", desc: "Friends take your quiz" },
                { step: "4", icon: Flame, title: "Roast", desc: "Watch them get roasted!" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 animate-float" style={{animationDelay: `${index * 0.5}s`}}>
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Roast Levels Preview */}
          <Card className="p-8 bg-gradient-card border-border/50 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center justify-center gap-2">
              <Flame className="h-6 w-6 text-accent" />
              Roast Intensity Levels
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-quiz-success/10 rounded-lg border border-quiz-success/20">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold text-quiz-success">90%+ Legendary</div>
                <div className="text-xs text-muted-foreground">Borderline stalker level</div>
              </div>
              <div className="p-4 bg-quiz-warning/10 rounded-lg border border-quiz-warning/20">
                <div className="text-2xl mb-2">😊</div>
                <div className="font-semibold text-quiz-warning">70-89% Good Friend</div>
                <div className="text-xs text-muted-foreground">Pretty decent knowledge</div>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="text-2xl mb-2">😬</div>
                <div className="font-semibold text-accent">40-69% Acquaintance</div>
                <div className="text-xs text-muted-foreground">Delivery driver level</div>
              </div>
              <div className="p-4 bg-quiz-danger/10 rounded-lg border border-quiz-danger/20">
                <div className="text-2xl mb-2">💀</div>
                <div className="font-semibold text-quiz-danger">&lt;40% Stranger</div>
                <div className="text-xs text-muted-foreground">Absolutely brutal roasts</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
