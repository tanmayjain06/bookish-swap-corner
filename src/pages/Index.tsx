
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, BookMarked, Search, Users } from "lucide-react";
import { useData } from "@/context/DataContext";

const Index = () => {
  const navigate = useNavigate();
  const { books } = useData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-book-paper py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-book-brown">
            Share Books, Connect Readers
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform to exchange, borrow, and discover books near you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/register")}
              className="text-lg py-6 px-8 bg-book-burgundy hover:bg-opacity-90"
            >
              Join BookSwap
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/browse")}
              className="text-lg py-6 px-8 border-book-brown text-book-brown hover:bg-book-cream"
            >
              Browse Books
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-gradient-to-br from-book-cream to-white shadow-sm">
              <div className="w-12 h-12 rounded-full bg-book-brown flex items-center justify-center text-white mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-3xl font-bold text-book-brown mb-2">{books.length}+</h3>
              <p className="text-muted-foreground">Books Available</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-book-cream to-white shadow-sm">
              <div className="w-12 h-12 rounded-full bg-book-brown flex items-center justify-center text-white mx-auto mb-4">
                <BookMarked size={24} />
              </div>
              <h3 className="text-3xl font-bold text-book-brown mb-2">10+</h3>
              <p className="text-muted-foreground">Book Categories</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-book-cream to-white shadow-sm">
              <div className="w-12 h-12 rounded-full bg-book-brown flex items-center justify-center text-white mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-3xl font-bold text-book-brown mb-2">200+</h3>
              <p className="text-muted-foreground">Happy Readers</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-book-paper">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-book-brown">How BookSwap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-book-burgundy flex items-center justify-center text-white mb-4">
                <BookMarked size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-book-brown">For Book Owners</h3>
              <p className="text-muted-foreground mb-4">
                Share your books with the community. List the titles you're willing to loan, rent, or exchange with others.
              </p>
              <Button 
                onClick={() => navigate("/register")} 
                variant="outline" 
                className="border-book-burgundy text-book-burgundy hover:bg-book-burgundy hover:text-white"
              >
                Register as Owner
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-book-green flex items-center justify-center text-white mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-book-brown">For Book Seekers</h3>
              <p className="text-muted-foreground mb-4">
                Find books you've been wanting to read. Browse listings by title or location and contact owners directly.
              </p>
              <Button 
                onClick={() => navigate("/register")} 
                variant="outline" 
                className="border-book-green text-book-green hover:bg-book-green hover:text-white"
              >
                Register as Seeker
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-book-brown text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg mb-8 text-book-cream">
            Create an account today and start sharing or finding your next favorite book.
          </p>
          <Button 
            onClick={() => navigate("/register")} 
            size="lg"
            className="bg-white text-book-brown hover:bg-book-cream"
          >
            Get Started
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
