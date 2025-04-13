
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { BookPlus } from "lucide-react";

export function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { addBook, currentUser } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use user's email as default contact if not provided
    const contactInfo = contact || (currentUser?.email || "");
    
    const success = addBook({
      title,
      author,
      genre: genre || undefined,
      location,
      contact: contactInfo,
      imageUrl: imageUrl || undefined,
    });
    
    if (success) {
      // Reset form
      setTitle("");
      setAuthor("");
      setGenre("");
      setLocation("");
      setContact("");
      setImageUrl("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookPlus className="h-5 w-5" /> Add New Book
        </CardTitle>
        <CardDescription>
          Share a book from your collection for others to borrow or exchange
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="book-form" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title*</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author*</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre (Optional)</Label>
              <Input
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="E.g., Fiction, Fantasy, Biography"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City/Location*</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your city or neighborhood"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">
                Contact Info (Optional)
              </Label>
              <Input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={currentUser?.email || "Email or phone number"}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to use your account email
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Book Cover URL (Optional)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          form="book-form" 
          className="w-full bg-book-brown hover:bg-opacity-90"
        >
          Add Book
        </Button>
      </CardFooter>
    </Card>
  );
}
