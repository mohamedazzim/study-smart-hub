import AppLayout from '@/components/AppLayout';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/data/mockData';

const Books = () => {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-foreground">Books</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Study material for your exams
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Books;
