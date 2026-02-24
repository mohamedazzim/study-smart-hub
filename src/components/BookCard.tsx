import { useNavigate } from 'react-router-dom';
import type { Book } from '@/types';
import { ShoppingCart, CheckCircle2, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/book/${book.id}`)}
      className="animate-fade-in rounded-lg border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex h-32 items-center justify-center gradient-primary">
        <BookOpen className="h-12 w-12 text-primary-foreground/60" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-foreground line-clamp-2">{book.title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{book.author}</p>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{book.description}</p>
        <div className="mt-3">
          {book.isPurchased ? (
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-success/10 px-3 py-2 text-sm font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" />
              Purchased
            </button>
          ) : (
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md gradient-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
              <ShoppingCart className="h-4 w-4" />
              ₹{book.price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
