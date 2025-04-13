
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookGrid } from "@/components/books/BookGrid";
import { useData } from "@/context/DataContext";
import { BookSearch } from "lucide-react";

const Browse = () => {
  const { books } = useData();
  
  // Filter out books that are already rented
  const availableBooks = books.filter((book) => !book.isRented);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-8 px-4 bg-gradient-to-b from-white to-book-paper">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-book-burgundy flex items-center justify-center text-white mr-3">
              <BookSearch size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-book-brown">
                Browse Books
              </h1>
              <p className="text-muted-foreground">
                Find books available near you
              </p>
            </div>
          </div>
          
          <BookGrid books={availableBooks} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
