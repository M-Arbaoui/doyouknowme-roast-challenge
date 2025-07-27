import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Copy, MessageCircle, Home, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  id: string;
  title: string;
  creator: string;
  questions: any[];
  createdAt: string;
}

const QuizShare = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (quizId) {
      const quizData = localStorage.getItem(`quiz_${quizId}`);
      if (quizData) {
        setQuiz(JSON.parse(quizData));
      } else {
        navigate('/');
      }
    }
  }, [quizId, navigate]);

  const shareUrl = `${window.location.origin}/quiz/${quizId}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "DATA COPIED ⚡",
      description: "Deploy this weapon to your targets",
    });
  };

  const shareProtocols = [
    `Think you know me? 😏 Take my psychological assessment and prepare for obliteration! ${shareUrl}`,
    `I've engineered a quiz about me... your ego won't survive! 🔥 ${shareUrl}`,
    `Assessment protocol activated! Let's see how badly you'll fail 😈 ${shareUrl}`,
    `Challenge accepted? Take my "Do You Know Me" test and face annihilation! 💀 ${shareUrl}`,
    `Time to separate the real operatives from the imposters 👀 ${shareUrl}`
  ];

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-quiz-electric border-t-transparent rounded-full mx-auto mb-4 shadow-electric"></div>
          <p className="text-muted-foreground font-mono">LOADING DEPLOYMENT PROTOCOLS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Cyberpunk deployment background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-electric rounded-full blur-3xl opacity-25 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-cyber rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-sunset rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce-in">🚀</div>
          <h1 className="text-6xl font-black bg-gradient-electric bg-clip-text text-transparent mb-4 animate-glow-pulse tracking-wider">
            WEAPON DEPLOYED!
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{animationDelay: '0.2s'}}>
            Time to test your targets and watch them get absolutely obliterated!
          </p>
        </div>

        <div className="space-y-8">
          {/* Weapon Status */}
          <Card className="p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-electric hover:shadow-mega transition-all duration-300" style={{animationDelay: '0.3s'}}>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-foreground mb-3 animate-shimmer tracking-wider">{quiz.title}</h2>
              <p className="text-muted-foreground text-xl font-mono">
                {quiz.questions.length} ATTACK VECTORS • Engineered by <span className="text-quiz-electric font-bold">{quiz.creator}</span>
              </p>
            </div>
            
            <div className="bg-gradient-glass backdrop-blur-sm rounded-xl p-8 mb-6 border border-white/10 hover:border-quiz-electric/30 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-mono tracking-wider">LAUNCH CODE:</span>
                <div className="flex items-center gap-4">
                  <code className="text-3xl font-black text-quiz-electric bg-quiz-electric/20 px-6 py-3 rounded-lg animate-pulse-glow font-mono">
                    {quiz.id}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(quiz.id)}
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-200 hover:bg-quiz-electric/20 border border-quiz-electric/50"
                  >
                    <Copy className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-glass backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-quiz-electric/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground font-mono tracking-wider">DEPLOYMENT URL:</span>
                <Button
                  onClick={() => copyToClipboard(shareUrl)}
                  variant="ghost"
                  size="sm"
                  className="hover:scale-110 transition-transform duration-200 hover:bg-quiz-electric/20 border border-quiz-electric/50"
                >
                  <Copy className="h-6 w-6" />
                </Button>
              </div>
              <code className="text-sm text-muted-foreground break-all block p-4 bg-secondary/30 rounded-lg font-mono">
                {shareUrl}
              </code>
            </div>
          </Card>

          {/* Transmission Protocols */}
          <Card className="p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-cyan" style={{animationDelay: '0.4s'}}>
            <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-4 tracking-wider">
              <MessageCircle className="h-7 w-7 text-quiz-cyan animate-pulse" />
              TRANSMISSION PROTOCOLS
            </h3>
            <div className="space-y-4">
              {shareProtocols.map((message, index) => (
                <div key={index} className="bg-gradient-glass backdrop-blur-sm rounded-xl p-6 flex items-center justify-between border border-white/10 hover:border-quiz-electric/30 transition-all duration-300 hover:scale-[1.02] group">
                  <p className="text-sm text-foreground flex-1 mr-4 leading-relaxed font-medium">{message}</p>
                  <Button
                    onClick={() => copyToClipboard(message)}
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-200 hover:bg-quiz-electric/20 opacity-0 group-hover:opacity-100 border border-quiz-electric/50"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Deployment Interface */}
          <Card className="p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-pink" style={{animationDelay: '0.5s'}}>
            <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-4 tracking-wider">
              <Share2 className="h-7 w-7 text-quiz-pink animate-pulse" />
              DEPLOYMENT INTERFACE
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <Button
                onClick={() => {
                  const message = shareProtocols[0];
                  if (navigator.share) {
                    navigator.share({
                      title: quiz.title,
                      text: message,
                      url: shareUrl,
                    });
                  } else {
                    copyToClipboard(message);
                  }
                }}
                variant="outline"
                className="w-full h-16 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-electric hover:bg-quiz-electric/10 font-black tracking-wider text-lg"
              >
                <Share2 className="h-6 w-6 mr-3" />
                BROADCAST
              </Button>
              <Button
                onClick={() => copyToClipboard(shareUrl)}
                variant="outline"
                className="w-full h-16 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-cyan hover:bg-quiz-cyan/10 font-black tracking-wider text-lg"
              >
                <Copy className="h-6 w-6 mr-3" />
                EXTRACT URL
              </Button>
            </div>
          </Card>

          {/* Command Center */}
          <div className="flex gap-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 h-16 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-cyan hover:bg-quiz-cyan/10 font-black tracking-wider text-lg"
            >
              <Home className="h-6 w-6 mr-3" />
              RETURN TO BASE
            </Button>
            <Button
              onClick={() => navigate(`/quiz/${quizId}`)}
              className="flex-1 h-16 bg-gradient-electric hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow font-black tracking-wider text-lg shadow-electric"
            >
              <Zap className="h-6 w-6 mr-3" />
              TEST WEAPON
            </Button>
          </div>

          {/* Devastation Levels */}
          <Card className="p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 text-center animate-slide-up shadow-mega" style={{animationDelay: '0.7s'}}>
            <h4 className="text-3xl font-black text-foreground mb-8 animate-shimmer tracking-wider">
              DEVASTATION LEVELS AWAITING YOUR TARGETS ⚡
            </h4>
            <div className="grid grid-cols-3 gap-8">
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-black text-quiz-lime mb-3 animate-bounce-in">🧠</div>
                <div className="text-quiz-lime font-black text-xl">90%+</div>
                <div className="text-muted-foreground font-bold tracking-wider">ADMIN ACCESS</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-black text-quiz-cyan mb-3 animate-bounce-in" style={{animationDelay: '0.2s'}}>😎</div>
                <div className="text-quiz-cyan font-black text-xl">60-89%</div>
                <div className="text-muted-foreground font-bold tracking-wider">USER LEVEL</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-black text-quiz-pink mb-3 animate-bounce-in" style={{animationDelay: '0.4s'}}>💀</div>
                <div className="text-quiz-pink font-black text-xl">&lt;60%</div>
                <div className="text-muted-foreground font-bold tracking-wider">TOTAL ANNIHILATION</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizShare;