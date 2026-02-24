import AppLayout from '@/components/AppLayout';
import TestCard from '@/components/TestCard';
import { mockTests } from '@/data/mockData';

const MyTests = () => {
  const attempted = mockTests.filter((t) => t.isAttempted);
  const purchased = mockTests.filter((t) => t.isPurchased && !t.isAttempted);

  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-foreground">My Tests</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your progress</p>
      </div>

      {purchased.length > 0 && (
        <div className="px-4 pb-4">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Ready to Attempt
          </h2>
          <div className="flex flex-col gap-3">
            {purchased.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      )}

      {attempted.length > 0 && (
        <div className="px-4 pb-4">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Completed
          </h2>
          <div className="flex flex-col gap-3">
            {attempted.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      )}

      {attempted.length === 0 && purchased.length === 0 && (
        <div className="px-4 py-12 text-center text-sm text-muted-foreground">
          You haven't purchased or attempted any tests yet.
        </div>
      )}
    </AppLayout>
  );
};

export default MyTests;
