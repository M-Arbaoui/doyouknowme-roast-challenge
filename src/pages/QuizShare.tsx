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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-slide-up">
            Quiz Created! 🎉
          </h1>
          <p className="text-muted-foreground">
            Time to test your friends and roast them based on their scores!
          </p>
        </div>

        <div className="space-y-6">
          {/* Quiz Info */}
          <Card className="p-6 bg-gradient-card border-border/50 animate-slide-up">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">{quiz.title}</h2>
              <p className="text-muted-foreground">
                {quiz.questions.length} questions • Created by {quiz.creator}
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quiz Code:</span>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded">
                    {quiz.id}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(quiz.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Share URL:</span>
                <Button
                  onClick={() => copyToClipboard(shareUrl)}
                  variant="ghost"
                  size="sm"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <code className="text-xs text-muted-foreground break-all block mt-1">
                {shareUrl}
              </code>
            </div>
          </Card>

          {/* Quick Share Messages */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Quick Share Messages
            </h3>
            <div className="space-y-3">
              {shareMessages.map((message, index) => (
                <div key={index} className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between">
                  <p className="text-sm text-foreground flex-1 mr-3">{message}</p>
                  <Button
                    onClick={() => copyToClipboard(message)}
                    variant="ghost"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Share Buttons */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Your Quiz
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => copyToClipboard(shareUrl)}
                variant="outline"
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate(`/quiz/${quizId}`)}
              className="flex-1 bg-gradient-primary hover:opacity-80"
            >
              Test Your Quiz
            </Button>
          </div>

          {/* Fun Stats */}
          <Card className="p-6 bg-gradient-card border-border/50 text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Roast Levels Awaiting Your Friends 🔥
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-quiz-success font-bold">90%+ 🧠</div>
                <div className="text-muted-foreground">Legendary</div>
              </div>
              <div>
                <div className="text-quiz-warning font-bold">60-89% 😊</div>
                <div className="text-muted-foreground">Friend Level</div>
              </div>
              <div>
                <div className="text-quiz-danger font-bold">&lt;60% 💀</div>
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