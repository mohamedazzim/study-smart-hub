import { useNavigate } from 'react-router-dom';
import type { Test } from '@/types';
import { Clock, FileText, CheckCircle2, Lock } from 'lucide-react';

interface TestCardProps {
  test: Test;
}

const TestCard = ({ test }: TestCardProps) => {
  const navigate = useNavigate();

  const subjectColors: Record<string, string> = {
    Mathematics: 'bg-primary/10 text-primary',
    Physics: 'bg-accent/10 text-accent',
    Chemistry: 'bg-success/10 text-success',
    Biology: 'bg-destructive/10 text-destructive',
    Aptitude: 'bg-muted text-muted-foreground',
  };

  const tagClass = subjectColors[test.subject] || 'bg-muted text-muted-foreground';

  const handleStart = () => {
    if (test.isAttempted) {
      navigate(`/test/${test.id}/results`, {
        state: { answers: {}, score: test.score ?? 0, totalMarks: test.totalMarks },
      });
    } else {
      navigate(`/test/${test.id}`);
    }
  };

  return (
    <div className="animate-fade-in rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagClass}`}>
              {test.subject}
            </span>
            {test.isFree && (
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                FREE
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-foreground">{test.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{test.description}</p>
        </div>
        {test.isAttempted && test.score !== undefined && (
          <div className="flex flex-col items-center rounded-lg bg-primary/5 px-3 py-2">
            <span className="text-lg font-bold text-primary">{test.score}</span>
            <span className="text-[10px] text-muted-foreground">/{test.totalMarks}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {test.duration} min
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {test.totalQuestions} Qs
        </span>
        <span className="flex items-center gap-1">
          {test.totalMarks} marks
        </span>
      </div>

      <div className="mt-3">
        {test.isAttempted ? (
          <button
            onClick={handleStart}
            className="flex w-full items-center justify-center gap-1.5 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <CheckCircle2 className="h-4 w-4" />
            View Results
          </button>
        ) : test.isPurchased || test.isFree ? (
          <button
            onClick={handleStart}
            className="w-full rounded-md gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Test
          </button>
        ) : (
          <button className="flex w-full items-center justify-center gap-1.5 rounded-md gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
            <Lock className="h-4 w-4" />
            Buy ₹{test.price}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestCard;
