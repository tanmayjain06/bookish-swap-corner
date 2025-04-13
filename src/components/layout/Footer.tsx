
import { BookOpen, Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-book-paper border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-book-brown flex items-center justify-center text-white mr-2">
              <BookOpen size={20} />
            </div>
            <span className="text-lg font-serif font-bold text-book-brown">BookSwap</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-book-brown transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-book-brown transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-book-brown transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 BookSwap. All rights reserved.</p>
          <p className="mt-1">
            A platform for book lovers to share and discover new reads.
          </p>
        </div>
      </div>
    </footer>
  );
}
