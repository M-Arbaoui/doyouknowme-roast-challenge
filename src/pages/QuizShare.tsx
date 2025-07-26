import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Copy, MessageCircle, QrCode, Home } from "lucide-react";
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
      title: "Copied! 📋",
      description: "Share this with your friends",
    });
  };

  const shareMessages = [
    `Think you know me? 😏 Take my quiz and get roasted! ${shareUrl}`,
    `I created a quiz about me... prepare to be humbled! 🔥 ${shareUrl}`,
    `Quiz time! Let's see how well you really know me 😈 ${shareUrl}`,
    `Challenge accepted? Take my "Do You Know Me" quiz! 💀 ${shareUrl}`,
    `Time to separate the real friends from the fake ones 👀 ${shareUrl}`
  ];

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-quiz-success/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
          <h1 className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 animate-glow-pulse">
            Quiz Created!
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{animationDelay: '0.2s'}}>
            Time to test your friends and roast them based on their scores!
          </p>
        </div>

        <div className="space-y-6">
          {/* Quiz Info */}
          <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl hover:shadow-quiz-primary/20 transition-all duration-300" style={{animationDelay: '0.3s'}}>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2 animate-shimmer">{quiz.title}</h2>
              <p className="text-muted-foreground text-lg">
                {quiz.questions.length} questions • Created by <span className="text-primary font-semibold">{quiz.creator}</span>
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-4 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quiz Code:</span>
                <div className="flex items-center gap-3">
                  <code className="text-2xl font-black text-primary bg-primary/20 px-4 py-2 rounded-lg animate-pulse-glow">
                    {quiz.id}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(quiz.id)}
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-200 hover:bg-primary/20"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Share URL:</span>
                <Button
                  onClick={() => copyToClipboard(shareUrl)}
                  variant="ghost"
                  size="sm"
                  className="hover:scale-110 transition-transform duration-200 hover:bg-primary/20"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <code className="text-xs text-muted-foreground break-all block p-3 bg-secondary/30 rounded-lg">
                {shareUrl}
              </code>
            </div>
          </Card>

          {/* Quick Share Messages */}
          <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-accent animate-pulse" />
              Quick Share Messages
            </h3>
            <div className="space-y-4">
              {shareMessages.map((message, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group">
                  <p className="text-sm text-foreground flex-1 mr-3 leading-relaxed">{message}</p>
                  <Button
                    onClick={() => copyToClipboard(message)}
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-200 hover:bg-primary/20 opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Share Buttons */}
          <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl" style={{animationDelay: '0.5s'}}>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Share2 className="h-6 w-6 text-quiz-success animate-pulse" />
              Share Your Quiz
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => {
                  const message = shareMessages[0];
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
                className="w-full h-12 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-primary hover:bg-primary/10"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => copyToClipboard(shareUrl)}
                variant="outline"
                className="w-full h-12 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-quiz-success hover:bg-quiz-success/10"
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy Link
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 h-12 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-accent hover:bg-accent/10"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate(`/quiz/${quizId}`)}
              className="flex-1 h-12 bg-gradient-primary hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow"
            >
              Test Your Quiz
            </Button>
          </div>

          {/* Fun Stats */}
          <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 text-center animate-slide-up shadow-2xl" style={{animationDelay: '0.7s'}}>
            <h4 className="text-2xl font-bold text-foreground mb-6 animate-shimmer">
              Roast Levels Awaiting Your Friends 🔥
            </h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-black text-quiz-success mb-2 animate-bounce-in">🧠</div>
                <div className="text-quiz-success font-bold text-lg">90%+</div>
                <div className="text-muted-foreground">Legendary</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-black text-quiz-warning mb-2 animate-bounce-in" style={{animationDelay: '0.2s'}}>😊</div>
                <div className="text-quiz-warning font-bold text-lg">60-89%</div>
                <div className="text-muted-foreground">Friend Level</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-3xl font-black text-quiz-danger mb-2 animate-bounce-in" style={{animationDelay: '0.4s'}}>💀</div>
                <div className="text-quiz-danger font-bold text-lg">&lt;60%</div>
                <div className="text-muted-foreground">Roast Zone</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizShare;