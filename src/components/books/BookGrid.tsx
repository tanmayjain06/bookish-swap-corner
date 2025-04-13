
import { useState } from "react";
import { Book } from "@/types";
import { BookCard } from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BookGridProps {
  books: Book[];
  showActions?: boolean;
}

export function BookGrid({ books, showActions = false }: BookGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by title, author or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} showActions={showActions} />
          ))}
        </div>
      )}
    </div>
  );
}
