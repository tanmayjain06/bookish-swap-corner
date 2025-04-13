
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";

export function Header() {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="w-10 h-10 rounded-full bg-book-brown flex items-center justify-center text-white">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-serif font-bold text-book-brown">BookSwap</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate("/browse")}>
                Browse Books
              </Button>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <span className="text-sm text-muted-foreground mr-2">
                {currentUser.name} ({currentUser.role})
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/browse")}>
                Browse Books
              </Button>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")} className="bg-book-burgundy hover:bg-opacity-90">
                Register
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {currentUser ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigateTo("/dashboard")}
                  className="justify-start"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigateTo("/browse")}
                  className="justify-start"
                >
                  Browse Books
                </Button>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    Signed in as {currentUser.name} ({currentUser.role})
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-center"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigateTo("/browse")}
                  className="justify-start"
                >
                  Browse Books
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigateTo("/login")}
                  className="w-full justify-center"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigateTo("/register")}
                  className="w-full justify-center bg-book-burgundy hover:bg-opacity-90"
                >
                  Register
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
