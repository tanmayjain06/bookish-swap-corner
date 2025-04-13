
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookForm } from "@/components/books/BookForm";
import { BookGrid } from "@/components/books/BookGrid";
import { useData } from "@/context/DataContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookMarked, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { currentUser, books } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null;
  }
  
  const userBooks = books.filter((book) => book.ownerId === currentUser.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-8 px-4 bg-gradient-to-b from-white to-book-paper">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-book-brown flex items-center justify-center text-white mr-3">
              {currentUser.role === "owner" ? (
                <BookMarked size={24} />
              ) : (
                <BookOpen size={24} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-book-brown">
                Your Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome, {currentUser.name} ({currentUser.role})
              </p>
            </div>
          </div>
          
          {currentUser.role === "owner" && (
            <div className="mb-12">
              <BookForm />
            </div>
          )}
          
          <div className="mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-book-brown">
              {currentUser.role === "owner" ? "Your Books" : "Books You Might Like"}
            </h2>
          </div>
          
          {currentUser.role === "owner" ? (
            userBooks.length > 0 ? (
              <BookGrid books={userBooks} showActions={true} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No books yet</h3>
                <p className="text-muted-foreground">
                  You haven't added any books to your collection yet.
                </p>
              </div>
            )
          ) : (
            <BookGrid books={books} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
