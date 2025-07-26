import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const generateQuizCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const quizData = {
      id: code,
      title: quizTitle,
      creator: creatorName,
      questions: questions.filter(q => q.question.trim() && q.options.some(opt => opt.trim())),
      createdAt: new Date().toISOString()
    };
    
    // Store in localStorage (in real app, this would be saved to backend)
    localStorage.setItem(`quiz_${code}`, JSON.stringify(quizData));
    
    toast({
      title: "Quiz Created! 🎉",
      description: `Share this code with friends: ${code}`,
    });
    
    navigate(`/quiz/${code}/share`);
  };

  const isValidQuiz = () => {
    return quizTitle.trim() && 
           creatorName.trim() && 
           questions.some(q => q.question.trim() && q.options.some(opt => opt.trim()));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Create Your Quiz
          </h1>
          <p className="text-muted-foreground">
            Test how well your friends really know you!
          </p>
        </div>

        <div className="space-y-6">
          {/* Quiz Info */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Quiz Title
                </label>
                <Input
                  placeholder="How Well Do You Know Me?"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Your Name
                </label>
                <Input
                  placeholder="Enter your name"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <Card key={question.id} className="p-6 bg-gradient-card border-border/50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Question {qIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="What's your question?"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    className="bg-secondary/50 border-border resize-none"
                    rows={2}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="relative">
                        <Input
                          placeholder={`Option ${optIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                          className={`bg-secondary/50 border-border pl-8 ${
                            question.correctAnswer === optIndex ? 'ring-2 ring-quiz-success' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuestion(question.id, 'correctAnswer', optIndex)}
                          className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors ${
                            question.correctAnswer === optIndex 
                              ? 'bg-quiz-success border-quiz-success' 
                              : 'border-muted-foreground hover:border-quiz-success'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click the circle next to the correct answer
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Question Button */}
          <Button
            onClick={addQuestion}
            variant="outline"
            className="w-full border-dashed border-2 hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Question
          </Button>

          {/* Create Quiz Button */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="flex-1"
            >
              Back to Home
            </Button>
            <Button
              onClick={generateQuizCode}
              disabled={!isValidQuiz()}
              className="flex-1 bg-gradient-primary hover:opacity-80 transition-opacity"
            >
              <Share className="h-4 w-4 mr-2" />
              Create & Share Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;