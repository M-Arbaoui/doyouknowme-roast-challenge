import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, ArrowLeft, Lightbulb, Sparkles } from "lucide-react";
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
        title: "Missing Information",
        description: "Please fill in the quiz title and your name.",
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
        title: "Incomplete Questions",
        description: "Please complete all questions and options.",
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
      title: "Quiz Created! 🎉",
      description: `Quiz code: ${quizId}`,
    });

    navigate(`/share/${quizId}`);
  };

  const questionSuggestions = [
    "What's my biggest fear?",
    "What would I do with a million dollars?",
    "What's my dream vacation destination?",
    "What's my favorite way to spend a weekend?",
    "What's my biggest pet peeve?",
    "What's my go-to comfort food?",
    "What's my favorite movie genre?",
    "What superpower would I want?",
    "What's my ideal way to relax?",
    "What's my biggest accomplishment I'm proud of?"
  ];

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-quiz-success/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4 animate-bounce-in">🎯</div>
          <h1 className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 animate-glow-pulse">
            Create Your Quiz
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{animationDelay: '0.2s'}}>
            Design the perfect roast quiz for your friends!
          </p>
        </div>

        <div className="space-y-8">
          {/* Quiz Info */}
          <Card className="p-8 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-quiz-warning animate-pulse" />
              Quiz Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quiz Title</label>
                <Input
                  placeholder="How Well Do You Know Me?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/10 border-white/20 focus:border-primary h-12 text-lg hover:bg-white/15 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Name</label>
                <Input
                  placeholder="Your name here"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  className="bg-white/10 border-white/20 focus:border-primary h-12 text-lg hover:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((question, questionIndex) => (
              <Card
                key={question.id}
                className="p-8 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl hover:shadow-quiz-primary/20 transition-all duration-300 group"
                style={{animationDelay: `${0.4 + questionIndex * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {questionIndex + 1}
                    </span>
                    Question {questionIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <Button
                      onClick={() => removeQuestion(question.id)}
                      variant="ghost"
                      size="sm"
                      className="text-quiz-danger hover:bg-quiz-danger/20 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Question</label>
                    <Textarea
                      placeholder="Enter your question here..."
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, "question", e.target.value)
                      }
                      className="bg-white/10 border-white/20 focus:border-primary min-h-[80px] text-lg hover:bg-white/15 transition-all duration-300"
                    />
                    {/* Question suggestions */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {questionSuggestions.slice(0, 3).map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuestion(question.id, "question", suggestion)}
                          className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              updateQuestion(question.id, "correctAnswer", optionIndex)
                            }
                            className="text-primary focus:ring-primary w-4 h-4"
                          />
                          <label className="text-sm font-medium text-foreground">
                            Option {String.fromCharCode(65 + optionIndex)} 
                            {question.correctAnswer === optionIndex && (
                              <span className="text-quiz-success ml-1">✓ Correct</span>
                            )}
                          </label>
                        </div>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, optionIndex, e.target.value)
                          }
                          className={`bg-white/10 border-white/20 focus:border-primary h-12 transition-all duration-200 hover:bg-white/15 ${
                            question.correctAnswer === optionIndex 
                              ? 'ring-2 ring-quiz-success/50 bg-quiz-success/10 border-quiz-success/30' 
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

          {/* Add Question Button */}
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10 border-dashed hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{animationDelay: '0.8s'}}>
            <Button
              onClick={addQuestion}
              variant="ghost"
              className="w-full h-16 text-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Plus className="h-6 w-6 mr-3" />
              Add Another Question ({questions.length}/20)
            </Button>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.9s'}}>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 h-12 hover:scale-105 transition-all duration-200 bg-white/5 border-white/20 hover:border-accent hover:bg-accent/10"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>

            <Button
              onClick={saveQuiz}
              className="flex-1 h-12 bg-gradient-primary hover:opacity-80 hover:scale-105 transition-all duration-200 animate-pulse-glow"
              disabled={questions.length === 0}
            >
              <Save className="h-5 w-5 mr-2" />
              Create Quiz
            </Button>
          </div>

          {/* Tips */}
          <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10 animate-slide-up shadow-2xl" style={{animationDelay: '1s'}}>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-quiz-warning animate-pulse" />
              Pro Tips for Maximum Roast Potential 🔥
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2 hover:text-quiz-success transition-colors duration-200">
                <span className="text-quiz-success">•</span>
                <span>Ask about your secret habits and preferences</span>
              </div>
              <div className="flex items-start gap-2 hover:text-quiz-warning transition-colors duration-200">
                <span className="text-quiz-warning">•</span>
                <span>Include questions only close friends would know</span>
              </div>
              <div className="flex items-start gap-2 hover:text-quiz-danger transition-colors duration-200">
                <span className="text-quiz-danger">•</span>
                <span>Make wrong answers hilariously obvious</span>
              </div>
              <div className="flex items-start gap-2 hover:text-primary transition-colors duration-200">
                <span className="text-primary">•</span>
                <span>Add personal inside jokes and references</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;