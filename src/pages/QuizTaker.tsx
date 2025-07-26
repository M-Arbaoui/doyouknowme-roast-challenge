import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Trophy, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  creator: string;
  questions: Question[];
  createdAt: string;
}

const QuizTaker = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (quizId) {
      const quizData = localStorage.getItem(`quiz_${quizId}`);
      if (quizData) {
        setQuiz(JSON.parse(quizData));
      } else {
        toast({
          title: "Quiz Not Found",
          description: "This quiz code doesn't exist or has expired.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [quizId, navigate, toast]);

  const startQuiz = () => {
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    const correct = selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const getRoastMessage = (percentage: number) => {
    if (percentage >= 90) return {
      message: "🔥 DAMN! You actually know them! Are you secretly living in their brain? This is borderline stalker level knowledge! 😂",
      level: "Legendary",
      emoji: "🧠"
    };
    if (percentage >= 80) return {
      message: "💯 Impressive! You're definitely in their inner circle. Time to update your resume with 'Professional Best Friend' 😎",
      level: "Bestie Status",
      emoji: "👑"
    };
    if (percentage >= 70) return {
      message: "✨ Not bad! You know them pretty well. Maybe spend less time on your phone and more time listening? 😉",
      level: "Good Friend",
      emoji: "😊"
    };
    if (percentage >= 60) return {
      message: "😬 Yikes... You know them about as well as their delivery driver does. Time for some real conversations!",
      level: "Acquaintance",
      emoji: "🤷‍♀️"
    };
    if (percentage >= 40) return {
      message: "💀 OUCH! Did you two just meet yesterday? This is embarrassing. Group chat is gonna have a field day! 😂",
      level: "Stranger Danger",
      emoji: "👻"
    };
    if (percentage >= 20) return {
      message: "🔥 SAVAGE ROAST INCOMING: You know NOTHING! Jon Snow has more knowledge than you about this person! 😭",
      level: "Complete Stranger",
      emoji: "🤡"
    };
    return {
      message: "💀💀💀 ABSOLUTE DESTRUCTION: Are you sure you didn't accidentally take the wrong quiz? This is painful to watch! 😂💀",
      level: "WHO ARE YOU?",
      emoji: "💀"
    };
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-gradient-card border-border/50 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {quiz.title}
            </h1>
            <p className="text-muted-foreground">
              Created by <span className="text-foreground font-semibold">{quiz.creator}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {quiz.questions.length} questions • Get ready to be roasted! 🔥
            </p>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="bg-secondary/50 border-border text-center"
              onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
            />
            <Button
              onClick={startQuiz}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-primary hover:opacity-80 transition-opacity animate-pulse-glow"
            >
              Start the Challenge
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const roast = getRoastMessage(score);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-gradient-card border-border/50 text-center animate-slide-up">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-float">{roast.emoji}</div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {score}%
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-quiz-warning" />
                <span className="text-lg font-semibold text-quiz-warning">
                  {roast.level}
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Roast Level: {roast.level}</span>
              </div>
              <p className="text-foreground leading-relaxed">
                {roast.message}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                You got {selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} out of {quiz.questions.length} questions right
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1"
                >
                  Create Your Own
                </Button>
                <Button
                  onClick={() => {
                    setGameStarted(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowResults(false);
                    setPlayerName("");
                  }}
                  className="flex-1 bg-gradient-primary hover:opacity-80"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {playerName}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary/50" />
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 animate-slide-up">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => selectAnswer(index)}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className={`p-4 h-auto text-left justify-start transition-all hover:scale-[1.02] ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-gradient-primary text-primary-foreground shadow-lg border-primary'
                    : 'hover:border-primary/50 hover:text-primary'
                }`}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="w-full bg-gradient-primary hover:opacity-80 transition-opacity"
          >
            {currentQuestion < quiz.questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                See Results
                <Trophy className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuizTaker;