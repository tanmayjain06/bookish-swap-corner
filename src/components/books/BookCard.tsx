
import { Book } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import { BookOpen, MapPin, User, Check, X } from "lucide-react";

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

export function BookCard({ book, showActions = false }: BookCardProps) {
  const { currentUser, toggleBookStatus, deleteBook } = useData();

  const isOwner = currentUser?.id === book.ownerId;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 relative book-cover" 
        style={{
          backgroundImage: book.imageUrl ? `url(${book.imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!book.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <BookOpen size={64} />
          </div>
        )}
        {book.isRented && (
          <Badge className="absolute top-2 right-2 bg-book-green">Rented/Exchanged</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        {book.genre && (
          <div className="text-sm">
            <Badge variant="outline" className="bg-book-cream text-book-brown">
              {book.genre}
            </Badge>
          </div>
        )}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>{book.location}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User size={14} />
          <span>Contact: {book.contact}</span>
        </div>
      </CardContent>
      {showActions && isOwner && (
        <CardFooter className="pt-0 space-x-2">
          <Button
            variant={book.isRented ? "outline" : "default"}
            size="sm"
            className={`flex-1 ${!book.isRented ? "bg-book-green" : ""}`}
            onClick={() => toggleBookStatus(book.id)}
          >
            {book.isRented ? (
              <>
                <X className="mr-1 h-4 w-4" /> Mark Available
              </>
            ) : (
              <>
                <Check className="mr-1 h-4 w-4" /> Mark as Rented
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteBook(book.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
