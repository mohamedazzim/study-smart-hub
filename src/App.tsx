import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyTests from "./pages/MyTests";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestAttempt from "./pages/TestAttempt";
import TestResults from "./pages/TestResults";
import BookDetail from "./pages/BookDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTests from "./pages/admin/AdminTests";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminResults from "./pages/admin/AdminResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-tests" element={<MyTests />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test/:testId" element={<TestAttempt />} />
          <Route path="/test/:testId/results" element={<TestResults />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tests" element={<AdminTests />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/results" element={<AdminResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
