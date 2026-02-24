import { useParams, useNavigate } from 'react-router-dom';
import { mockBooks } from '@/data/mockData';
import { ArrowLeft, BookOpen, ShoppingCart, CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero */}
      <div className="gradient-primary px-4 pb-10 pt-12">
        <button onClick={() => navigate('/books')} className="mb-4 flex items-center gap-1 text-primary-foreground/70 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex flex-col items-center">
          <div className="flex h-40 w-32 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur">
            <BookOpen className="h-16 w-16 text-primary-foreground/40" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 -mt-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-lg font-bold text-foreground">{book.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{book.description}</p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">₹{book.price}</span>
          </div>

          <div className="mt-4">
            {book.isPurchased ? (
              <div className="space-y-2">
                <Button className="w-full bg-success/10 text-success hover:bg-success/20" variant="ghost">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Purchased
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download PDF
                </Button>
              </div>
            ) : (
              <Button className="w-full gradient-accent text-accent-foreground">
                <ShoppingCart className="h-4 w-4 mr-1.5" />
                Buy Now — ₹{book.price}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
