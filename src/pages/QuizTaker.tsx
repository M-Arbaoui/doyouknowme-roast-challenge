import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Trophy, Skull } from "lucide-react";
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
          title: "TARGET NOT FOUND",
          description: "This launch code is invalid or has been terminated.",
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
    const roastProtocol = {
      0: {
        level: "CRITICAL SYSTEM FAILURE ☢️",
        emoji: "☢️",
        messages: [
          "You know me like a firewall knows empathy.",
          "FATAL ERROR: Personality recognition software not found.",
          "Connection to reality: TERMINATED.",
          "Your accuracy level: CATASTROPHICALLY LOW."
        ]
      },
      10: {
        level: "NUCLEAR MELTDOWN 💀",
        emoji: "💀",
        messages: [
          "Achievement unlocked: Maximum Incompetence.",
          "Did you answer while experiencing system lag?",
          "Your responses were so random I checked for malware.",
          "You operated like ransomware - destructive and pointless."
        ]
      },
      20: {
        level: "SYSTEM COMPROMISED 🔪",
        emoji: "🔪",
        messages: [
          "That wasn't even close. You played with negative processing power.",
          "I've seen chatbots with better pattern recognition.",
          "Status: TOTALLY PWNED.",
          "You're not just wrong — you're maliciously wrong."
        ]
      },
      30: {
        level: "SECURITY BREACH 🔥",
        emoji: "🔥",
        messages: [
          "Your responses felt like a DDoS attack on friendship.",
          "We must exist in parallel universes with zero data sync.",
          "ERROR 404: Friendship protocols not found.",
          "You guessed like spam comments on a deleted post."
        ]
      },
      40: {
        level: "LOW BANDWIDTH ☕",
        emoji: "☕",
        messages: [
          "Almost half-functional. Like most of your life choices.",
          "Your friendship.exe needs a serious update.",
          "Still better than 0%, but running on dial-up speed.",
          "Your knowledge operates like software from 1995."
        ]
      },
      50: {
        level: "BASIC CONNECTIVITY 🫖",
        emoji: "🫖",
        messages: [
          "50% knowing me is like having half a password — useless.",
          "You're running on minimal system requirements.",
          "You're that friend who's 'online' but always away.",
          "Performance: ADEQUATE. Barely."
        ]
      },
      60: {
        level: "SUSPICIOUS ACTIVITY 🤨",
        emoji: "🤨",
        messages: [
          "Decent processing power detected. Still room for optimization.",
          "Solid performance. Your friendship OS is mostly stable.",
          "Acceptable results. Premium version might help.",
          "Like a Netflix algorithm: functional but occasionally weird."
        ]
      },
      70: {
        level: "ENHANCED MODE 🙃",
        emoji: "🙃",
        messages: [
          "High performance detected. Need better emotional drivers.",
          "Impressive. For someone running legacy friendship software.",
          "Bronze tier unlocked. No admin privileges yet.",
          "You've earned standard user access. No root permissions."
        ]
      },
      80: {
        level: "ADVANCED PROTOCOL 🦊",
        emoji: "🦊",
        messages: [
          "Premium tier activated. You're running quality software.",
          "Impressive metrics. You've been monitoring my data streams.",
          "Your pattern recognition rivals professional surveillance.",
          "If this were employment, you'd get the position — standard benefits."
        ]
      },
      90: {
        level: "ELITE ACCESS 💎",
        emoji: "💎",
        messages: [
          "You're either running advanced AI, or we're quantum entangled.",
          "Dangerously accurate. Should I check for keyloggers?",
          "Top-tier performance. You've basically hacked my personality matrix.",
          "This level of data access should require security clearance."
        ]
      },
      100: {
        level: "ADMIN PRIVILEGES 🧠",
        emoji: "🧠",
        messages: [
          "You ARE my operating system. Are you accessing my core files?",
          "That's not friendship — that's total system integration.",
          "You know me better than my own debugging protocols.",
          "This isn't just victory. It's complete system takeover."
        ]
      }
    };

    // Find appropriate threat level
    let level = 0;
    for (const threshold of [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]) {
      if (percentage >= threshold) {
        level = threshold;
        break;
      }
    }

    const roastData = roastProtocol[level];
    const randomMessage = roastData.messages[Math.floor(Math.random() * roastData.messages.length)];

    return {
      message: randomMessage,
      level: roastData.level,
      emoji: roastData.emoji
    };
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-quiz-electric border-t-transparent rounded-full mx-auto mb-4 shadow-electric"></div>
          <p className="text-muted-foreground font-mono">LOADING TARGET DATA...</p>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Cyberpunk background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-electric rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-cyber rounded-full blur-3xl opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <Card className="relative w-full max-w-md p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 text-center shadow-electric">
          <div className="mb-8">
            <h1 className="text-4xl font-black bg-gradient-electric bg-clip-text text-transparent mb-3 tracking-wider">
              {quiz.title}
            </h1>
            <p className="text-muted-foreground mb-2">
              Deployed by <span className="text-foreground font-bold">{quiz.creator}</span>
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              {quiz.questions.length} ATTACK VECTORS • PREPARE FOR OBLITERATION ⚡
            </p>
          </div>

          <div className="space-y-6">
            <Input
              placeholder="ENTER AGENT DESIGNATION"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="bg-gradient-glass border-quiz-electric/50 text-center font-mono h-14 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
            />
            <Button
              onClick={startQuiz}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-electric hover:opacity-80 transition-opacity animate-pulse-glow h-14 font-black tracking-wider shadow-electric"
            >
              INITIATE ASSESSMENT
              <ChevronRight className="h-5 w-5 ml-2" />
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
      <div className="min-h-screen bg-background p-4 relative overflow-hidden">
        {/* Results background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-electric rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-cyber rounded-full blur-3xl opacity-25 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-sunset rounded-full blur-3xl opacity-35 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <Card className="p-12 bg-gradient-glass backdrop-blur-glass border border-white/20 text-center animate-bounce-in shadow-mega">
            <div className="mb-12">
              <div className="text-9xl mb-8 animate-bounce-in" style={{animationDelay: '0.3s'}}>{roast.emoji}</div>
              <div className="relative">
                <h1 className="text-7xl md:text-8xl font-black mb-6 animate-glow-pulse">
                  <span className="bg-gradient-electric bg-clip-text text-transparent">
                    {score}%
                  </span>
                </h1>
                <div className="text-lg font-black text-quiz-electric mb-4 tracking-wider animate-pulse">
                  {roast.level}
                </div>
              </div>
            </div>

            <div className="bg-gradient-glass backdrop-blur-sm rounded-2xl p-10 mb-10 border border-white/10 animate-slide-up" style={{animationDelay: '0.7s'}}>
              <p className="text-foreground leading-relaxed text-xl font-medium">
                {roast.message}
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-sm text-muted-foreground space-y-2 font-mono">
                <div>SUCCESSFUL OPERATIONS: {selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} / {quiz.questions.length}</div>
                <div>FAILED ATTEMPTS: {quiz.questions.length - selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}</div>
              </div>
              
              <div className="flex gap-6">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1 h-14 font-black tracking-wider bg-gradient-glass border-white/20 hover:border-quiz-cyan hover:bg-quiz-cyan/10"
                >
                  CREATE YOUR WEAPON
                </Button>
                <Button
                  onClick={() => {
                    setGameStarted(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowResults(false);
                    setPlayerName("");
                  }}
                  className="flex-1 bg-gradient-electric hover:opacity-80 h-14 font-black tracking-wider shadow-electric"
                >
                  RETRY MISSION
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
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Active assessment background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-electric rounded-full blur-3xl opacity-15 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-cyber rounded-full blur-2xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground font-mono tracking-wider">
              VECTOR {currentQuestion + 1} OF {quiz.questions.length}
            </span>
            <span className="text-sm font-bold text-foreground font-mono tracking-wider">
              AGENT: {playerName}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-secondary/50" 
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
            <span>{Math.round(progress)}% COMPLETE</span>
            <span>THREAT LEVEL: {currentQuestion < quiz.questions.length / 2 ? 'MODERATE' : 'CRITICAL'}</span>
          </div>
        </div>

        <Card className="p-10 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-electric">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => selectAnswer(index)}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className={`p-6 h-auto text-left justify-start transition-all hover:scale-[1.02] font-medium text-lg ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-gradient-electric text-primary-foreground shadow-electric border-quiz-electric'
                    : 'hover:border-quiz-electric/50 hover:text-quiz-electric bg-gradient-glass border-white/20'
                }`}
              >
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-black">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="w-full bg-gradient-electric hover:opacity-80 transition-opacity h-16 font-black text-xl tracking-wider shadow-electric"
          >
            {currentQuestion < quiz.questions.length - 1 ? (
              <>
                DEPLOY NEXT VECTOR
                <ChevronRight className="h-6 w-6 ml-3" />
              </>
            ) : (
              <>
                EXECUTE ASSESSMENT
                <Skull className="h-6 w-6 ml-3" />
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuizTaker;