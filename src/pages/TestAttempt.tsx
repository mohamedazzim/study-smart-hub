import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTests } from '@/data/mockData';
import { mockQuestions } from '@/data/mockQuestions';
import { Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const TestAttempt = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const test = mockTests.find((t) => t.id === testId);
  const questions = mockQuestions.filter((q) => q.testId === testId);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState((test?.duration ?? 30) * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(() => {
    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === q.correctAnswer) {
        score += q.marks;
      } else if (userAns && userAns !== '') {
        score -= q.negativeMarks;
      }
    });
    navigate(`/test/${testId}/results`, {
      state: { answers, score, totalMarks: test?.totalMarks ?? 0 },
    });
  }, [answers, questions, testId, navigate, test]);

  const setAnswer = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  if (!test || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Test not found or no questions available.</p>
      </div>
    );
  }

  const question = questions[currentQ];
  const isUrgent = timeLeft < 300;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium truncate">{test.title}</p>
            <p className="text-xs text-muted-foreground">
              Q {currentQ + 1}/{questions.length}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${
              isUrgent
                ? 'bg-destructive/10 text-destructive animate-pulse'
                : 'bg-primary/10 text-primary'
            }`}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Question area */}
      <div className="flex-1 px-4 py-6 mx-auto w-full max-w-lg">
        <div className="flex items-start justify-between mb-4">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {question.marks} marks
          </span>
          {question.negativeMarks > 0 && (
            <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">
              -{question.negativeMarks}
            </span>
          )}
        </div>

        {/* Question text (LaTeX rendered as plain text for now — MathJax integration later) */}
        <div className="text-base font-medium text-foreground leading-relaxed mb-6">
          {question.questionText}
        </div>

        {/* Answer input by type */}
        {question.type === 'mcq' && question.options && (
          <div className="flex flex-col gap-2.5">
            {question.options.map((opt, i) => {
              const selected = answers[question.id] === opt;
              return (
                <button
                  key={i}
                  onClick={() => setAnswer(question.id, opt)}
                  className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    selected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/30'
                  }`}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'fill-blank' && (
          <div>
            <Input
              type="text"
              placeholder="Type your answer"
              value={answers[question.id] || ''}
              onChange={(e) => setAnswer(question.id, e.target.value)}
              className="text-base"
            />
          </div>
        )}

        {question.type === 'fraction' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Enter as: Whole (optional) | Numerator | Denominator</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Whole</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={(answers[question.id] || '||').split('|')[0]}
                  onChange={(e) => {
                    const parts = (answers[question.id] || '||').split('|');
                    parts[0] = e.target.value;
                    setAnswer(question.id, parts.join('|'));
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Numerator</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={(answers[question.id] || '||').split('|')[1]}
                  onChange={(e) => {
                    const parts = (answers[question.id] || '||').split('|');
                    parts[1] = e.target.value;
                    setAnswer(question.id, parts.join('|'));
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Denominator</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={(answers[question.id] || '||').split('|')[2]}
                  onChange={(e) => {
                    const parts = (answers[question.id] || '||').split('|');
                    parts[2] = e.target.value;
                    setAnswer(question.id, parts.join('|'));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Flag */}
        <button
          onClick={() => toggleFlag(question.id)}
          className={`mt-6 flex items-center gap-1.5 text-sm font-medium ${
            flagged.has(question.id) ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Flag className="h-4 w-4" />
          {flagged.has(question.id) ? 'Flagged for review' : 'Flag for review'}
        </button>
      </div>

      {/* Bottom controls */}
      <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-lg px-4 py-3 safe-bottom">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((c) => c - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setShowNav(!showNav)}
          >
            {currentQ + 1} / {questions.length}
          </Button>

          {currentQ < questions.length - 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQ((c) => c + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="gradient-primary text-primary-foreground"
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit
            </Button>
          )}
        </div>

        {/* Question navigator */}
        {showNav && (
          <div className="mx-auto mt-3 max-w-lg grid grid-cols-8 gap-2">
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id];
              const isFlagged = flagged.has(q.id);
              const isCurrent = i === currentQ;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQ(i);
                    setShowNav(false);
                  }}
                  className={`h-9 w-9 rounded-md text-xs font-bold transition-all ${
                    isCurrent
                      ? 'gradient-primary text-primary-foreground'
                      : isAnswered
                      ? 'bg-success/20 text-success border border-success/30'
                      : isFlagged
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit confirmation */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Submit Test?
            </DialogTitle>
            <DialogDescription>
              {Object.keys(answers).length}/{questions.length} questions answered.
              {questions.length - Object.keys(answers).length > 0 && (
                <span className="text-destructive font-medium">
                  {' '}
                  {questions.length - Object.keys(answers).length} unanswered.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Review
            </Button>
            <Button className="gradient-primary text-primary-foreground" onClick={handleSubmit}>
              Confirm Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestAttempt;
