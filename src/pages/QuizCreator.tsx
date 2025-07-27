import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, ArrowLeft, Zap, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizCreator = () => {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === optionIndex ? value : opt)),
            }
          : q
      )
    );
  };

  const saveQuiz = () => {
    // Validation
    if (!title.trim() || !creator.trim()) {
      toast({
        title: "SYSTEM ERROR",
        description: "Mission parameters incomplete. Enter target data.",
        variant: "destructive",
      });
      return;
    }

    const invalidQuestions = questions.some(
      (q) =>
        !q.question.trim() ||
        q.options.some((opt) => !opt.trim()) ||
        q.correctAnswer === undefined
    );

    if (invalidQuestions) {
      toast({
        title: "INCOMPLETE PROTOCOL",
        description: "All warfare components must be fully armed.",
        variant: "destructive",
      });
      return;
    }

    // Save quiz
    const quizId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const quiz = {
      id: quizId,
      title,
      creator,
      questions,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`quiz_${quizId}`, JSON.stringify(quiz));

    toast({
      title: "WEAPON DEPLOYED! ⚡",
      description: `Launch code: ${quizId}`,
    });

    navigate(`/quiz/${quizId}/share`);
  };

  const questionSuggestions = [
    "What's my biggest fear?",
    "What would I do with unlimited power?", 
    "What's my ultimate destination?",
    "How do I achieve maximum satisfaction?",
    "What triggers my rage mode?",
    "What's my primary fuel source?",
    "What genre defines my existence?",
    "What superpower would complete me?",
    "How do I enter recovery mode?",
    "What's my greatest achievement unlocked?"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-electric rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-cyber rounded-full blur-3xl opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-sunset rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent"></div>
      </div>

      <div className="relative max-w-4xl mx-auto p-4">
        <div className="mb-12 text-center">
          <div className="text-8xl mb-6 animate-bounce-in">🎯</div>
          <h1 className="text-6xl font-black bg-gradient-electric bg-clip-text text-transparent mb-4 animate-glow-pulse tracking-wider">
            WEAPON FORGE
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{animationDelay: '0.2s'}}>
            Engineer the perfect psychological warfare tool!
          </p>
        </div>

        <div className="space-y-8">
          {/* Weapon Configuration */}
          <Card className="p-8 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-electric" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3 tracking-wider">
              <Target className="h-7 w-7 text-quiz-electric animate-pulse" />
              TARGET CONFIGURATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground tracking-wider">MISSION TITLE</label>
                <Input
                  placeholder="PSYCHOLOGICAL ASSESSMENT PROTOCOL"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gradient-glass border-quiz-electric/50 focus:border-quiz-pink h-14 text-lg hover:bg-white/10 transition-all duration-300 font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground tracking-wider">OPERATOR DESIGNATION</label>
                <Input
                  placeholder="AGENT_NAME"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  className="bg-gradient-glass border-quiz-electric/50 focus:border-quiz-pink h-14 text-lg hover:bg-white/10 transition-all duration-300 font-mono"
                />
              </div>
            </div>
          </Card>

          {/* Attack Vectors */}
          <div className="space-y-8">
            {questions.map((question, questionIndex) => (
              <Card
                key={question.id}
                className="p-8 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-cyan hover:shadow-electric transition-all duration-300 group"
                style={{animationDelay: `${0.4 + questionIndex * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-foreground flex items-center gap-3 tracking-wider">
                    <span className="w-10 h-10 bg-gradient-electric rounded-full flex items-center justify-center text-primary-foreground font-black text-sm shadow-electric">
                      {questionIndex + 1}
                    </span>
                    ATTACK VECTOR {questionIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <Button
                      onClick={() => removeQuestion(question.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/20 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 border border-destructive/50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground tracking-wider">INTERROGATION PROTOCOL</label>
                    <Textarea
                      placeholder="Enter your psychological probe here..."
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, "question", e.target.value)
                      }
                      className="bg-gradient-glass border-quiz-electric/50 focus:border-quiz-pink min-h-[100px] text-lg hover:bg-white/10 transition-all duration-300 font-mono"
                    />
                    {/* Protocol suggestions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {questionSuggestions.slice(0, 3).map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuestion(question.id, "question", suggestion)}
                          className="text-xs text-muted-foreground hover:text-quiz-electric hover:bg-quiz-electric/10 transition-all duration-200 hover:scale-105 border border-white/20 font-mono"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              updateQuestion(question.id, "correctAnswer", optionIndex)
                            }
                            className="text-quiz-electric focus:ring-quiz-electric w-5 h-5"
                          />
                          <label className="text-sm font-bold text-foreground tracking-wider">
                            OPTION {String.fromCharCode(65 + optionIndex)} 
                            {question.correctAnswer === optionIndex && (
                              <span className="text-quiz-lime ml-2 animate-pulse">✓ CORRECT TARGET</span>
                            )}
                          </label>
                        </div>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, optionIndex, e.target.value)
                          }
                          className={`bg-gradient-glass border-quiz-electric/50 focus:border-quiz-pink h-14 transition-all duration-200 hover:bg-white/10 font-mono ${
                            question.correctAnswer === optionIndex 
                              ? 'ring-2 ring-quiz-lime/50 bg-quiz-lime/10 border-quiz-lime/50 shadow-cyan' 
                              : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Attack Vector */}
          <Card className="p-8 bg-gradient-glass backdrop-blur-glass border border-dashed border-quiz-electric/50 hover:border-quiz-pink/50 transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{animationDelay: '0.8s'}}>
            <Button
              onClick={addQuestion}
              variant="ghost"
              className="w-full h-20 text-xl hover:bg-quiz-electric/10 hover:text-quiz-electric transition-all duration-200 font-black tracking-wider"
            >
              <Plus className="h-8 w-8 mr-4" />
              DEPLOY NEW ATTACK VECTOR ({questions.length}/20)
            </Button>
          </Card>

          {/* Command Center */}
          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{animationDelay: '0.9s'}}>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 h-14 hover:scale-105 transition-all duration-200 bg-gradient-glass border-white/20 hover:border-quiz-cyan hover:bg-quiz-cyan/10 font-black tracking-wider text-lg"
            >
              <ArrowLeft className="h-6 w-6 mr-3" />
              ABORT MISSION
            </Button>

            <Button
              onClick={saveQuiz}
              className="flex-1 h-14 bg-gradient-electric hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow font-black tracking-wider text-lg shadow-electric"
              disabled={questions.length === 0}
            >
              <Save className="h-6 w-6 mr-3" />
              DEPLOY WEAPON
            </Button>
          </div>

          {/* Tactical Manual */}
          <Card className="p-8 bg-gradient-glass backdrop-blur-glass border border-white/20 animate-slide-up shadow-pink" style={{animationDelay: '1s'}}>
            <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-3 tracking-wider">
              <Zap className="h-6 w-6 text-quiz-orange animate-pulse" />
              TACTICAL MANUAL FOR MAXIMUM DEVASTATION ⚡
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3 hover:text-quiz-lime transition-colors duration-200">
                <span className="text-quiz-lime font-black">▶</span>
                <span className="font-medium">Deploy questions about classified personal data</span>
              </div>
              <div className="flex items-start gap-3 hover:text-quiz-cyan transition-colors duration-200">
                <span className="text-quiz-cyan font-black">▶</span>
                <span className="font-medium">Target intimate knowledge only allies possess</span>
              </div>
              <div className="flex items-start gap-3 hover:text-quiz-pink transition-colors duration-200">
                <span className="text-quiz-pink font-black">▶</span>
                <span className="font-medium">Engineer decoy answers for maximum confusion</span>
              </div>
              <div className="flex items-start gap-3 hover:text-quiz-electric transition-colors duration-200">
                <span className="text-quiz-electric font-black">▶</span>
                <span className="font-medium">Inject classified intel and inside operations</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;