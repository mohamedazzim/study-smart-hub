import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { mockTests } from '@/data/mockData';
import { mockQuestions } from '@/data/mockQuestions';
import { CheckCircle2, XCircle, ArrowLeft, PlayCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestResults = () => {
  const { testId } = useParams<{ testId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const test = mockTests.find((t) => t.id === testId);
  const questions = mockQuestions.filter((q) => q.testId === testId);

  const state = location.state as {
    answers: Record<string, string>;
    score: number;
    totalMarks: number;
  } | null;

  const answers = state?.answers ?? {};
  const score = state?.score ?? test?.score ?? 0;
  const totalMarks = state?.totalMarks ?? test?.totalMarks ?? 0;
  const isPurchased = test?.isPurchased ?? false;

  const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

  if (!test) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Test not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-primary px-4 pb-8 pt-12">
        <button onClick={() => navigate('/')} className="mb-4 flex items-center gap-1 text-primary-foreground/70 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Tests
        </button>
        <h1 className="text-xl font-bold text-primary-foreground">{test.title}</h1>
        <p className="mt-1 text-sm text-primary-foreground/70">Results</p>

        {/* Score card */}
        <div className="mt-6 rounded-xl bg-primary-foreground/10 backdrop-blur p-6 text-center">
          <div className="text-5xl font-extrabold text-primary-foreground">{score}</div>
          <div className="text-sm text-primary-foreground/60 mt-1">out of {totalMarks}</div>
          <div className="mt-3 mx-auto h-2 w-48 rounded-full bg-primary-foreground/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-foreground transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-primary-foreground">{percentage}%</p>
        </div>
      </div>

      {/* Question breakdown */}
      <div className="mx-auto max-w-lg px-4 mt-6 space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Question Breakdown
        </h2>
        {questions.map((q, i) => {
          const userAnswer = answers[q.id] || '—';
          const isCorrect = userAnswer === q.correctAnswer;
          const isUnanswered = !answers[q.id];

          return (
            <div key={q.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isUnanswered
                      ? 'bg-muted text-muted-foreground'
                      : isCorrect
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {isUnanswered ? (
                    i + 1
                  ) : isCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{q.questionText}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span className="text-muted-foreground">
                      Your answer:{' '}
                      <span className={isCorrect ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
                        {userAnswer}
                      </span>
                    </span>
                    {!isCorrect && (
                      <span className="text-muted-foreground">
                        Correct:{' '}
                        <span className="text-success font-semibold">{q.correctAnswer}</span>
                      </span>
                    )}
                  </div>

                  {/* Video explanation */}
                  {!isCorrect && !isUnanswered && q.videoExplanationUrl && (
                    <div className="mt-3">
                      {isPurchased ? (
                        <a
                          href={q.videoExplanationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Watch Explanation
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                          <Lock className="h-3.5 w-3.5" />
                          Purchase to unlock video
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-lg px-4 mt-6">
        <Button className="w-full" variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default TestResults;
