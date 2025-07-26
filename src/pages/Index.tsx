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
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse-glow">
              <Flame className="h-4 w-4" />
              Get Ready to be Roasted
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Do You Even
              </span>
              <br />
              <span className="text-foreground">Know Me?</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Test your friends and watch them get roasted! 🔥
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-16">
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="bg-gradient-primary hover:opacity-80 transition-opacity animate-pulse-glow text-lg px-8 py-4 h-auto"
              >
                <Brain className="h-5 w-5 mr-2" />
                Create Quiz
              </Button>
              <div className="flex gap-2">
                <Input
                  placeholder="Quiz code"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  className="bg-card/50 border-border uppercase tracking-wider text-center font-mono text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && joinQuiz()}
                  maxLength={6}
                />
                <Button
                  onClick={joinQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quizCode.trim()}
                  className="px-6"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>

          {/* Simple Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Create & Share</h3>
                <p className="text-muted-foreground text-sm">
                  Make a quiz, get a code, share with friends
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Get Scored</h3>
                <p className="text-muted-foreground text-sm">
                  See how well they really know you
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-quiz-danger/50 transition-all group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-quiz-danger/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Flame className="h-6 w-6 text-quiz-danger" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Get Roasted</h3>
                <p className="text-muted-foreground text-sm">
                  Epic roasts based on their score
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
