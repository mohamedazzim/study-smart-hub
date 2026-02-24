import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBooks } from '@/data/mockData';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Book } from '@/types';

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    author: '',
    coverImage: '',
  });

  const openCreate = () => {
    setEditingBook(null);
    setForm({ title: '', description: '', price: 0, author: '', coverImage: '' });
    setDialogOpen(true);
  };

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      description: book.description,
      price: book.price,
      author: book.author,
      coverImage: book.coverImage,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) => (b.id === editingBook.id ? { ...b, ...form } : b))
      );
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        ...form,
        isPurchased: false,
      };
      setBooks((prev) => [...prev, newBook]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Manage Books</h1>
          </div>
          <Button size="sm" className="gradient-primary text-primary-foreground" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">{book.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{book.author} · ₹{book.price}</p>
            </div>
            <button onClick={() => openEdit(book)} className="p-2 text-muted-foreground hover:text-primary">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => handleDelete(book.id)} className="p-2 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Author</Label><Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></div>
            <div><Label>Cover Image URL</Label><Input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="Optional" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBooks;
