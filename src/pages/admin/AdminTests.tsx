import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTests } from '@/data/mockData';
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
import type { Test } from '@/types';

const AdminTests = () => {
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: 60,
    totalQuestions: 10,
    totalMarks: 40,
    subject: '',
    isFree: false,
    price: 0,
  });

  const openCreate = () => {
    setEditingTest(null);
    setForm({ title: '', description: '', duration: 60, totalQuestions: 10, totalMarks: 40, subject: '', isFree: false, price: 0 });
    setDialogOpen(true);
  };

  const openEdit = (test: Test) => {
    setEditingTest(test);
    setForm({
      title: test.title,
      description: test.description,
      duration: test.duration,
      totalQuestions: test.totalQuestions,
      totalMarks: test.totalMarks,
      subject: test.subject,
      isFree: test.isFree,
      price: test.price,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingTest) {
      setTests((prev) =>
        prev.map((t) =>
          t.id === editingTest.id
            ? { ...t, ...form }
            : t
        )
      );
    } else {
      const newTest: Test = {
        id: Date.now().toString(),
        ...form,
        isPurchased: false,
        isAttempted: false,
      };
      setTests((prev) => [...prev, newTest]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Manage Tests</h1>
          </div>
          <Button size="sm" className="gradient-primary text-primary-foreground" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
        {tests.map((test) => (
          <div key={test.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">{test.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {test.subject} · {test.totalQuestions} Qs · {test.duration} min
              </p>
            </div>
            <button onClick={() => openEdit(test)} className="p-2 text-muted-foreground hover:text-primary">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => handleDelete(test.id)} className="p-2 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTest ? 'Edit Test' : 'Create Test'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-3 gap-2">
              <div><Label>Duration (min)</Label><Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} /></div>
              <div><Label>Questions</Label><Input type="number" value={form.totalQuestions} onChange={(e) => setForm({ ...form, totalQuestions: +e.target.value })} /></div>
              <div><Label>Total Marks</Label><Input type="number" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: +e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isFree} onChange={(e) => setForm({ ...form, isFree: e.target.checked, price: e.target.checked ? 0 : form.price })} className="rounded" />
                Free test
              </label>
              {!form.isFree && (
                <div className="flex-1"><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></div>
              )}
            </div>
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

export default AdminTests;
