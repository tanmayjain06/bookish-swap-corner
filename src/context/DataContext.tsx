
import React, { createContext, useContext, useEffect, useState } from "react";
import { Book, User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface DataContextType {
  users: User[];
  books: Book[];
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: Omit<User, "id">) => boolean;
  logout: () => void;
  addBook: (book: Omit<Book, "id" | "ownerId" | "isRented" | "createdAt">) => boolean;
  toggleBookStatus: (bookId: string) => void;
  deleteBook: (bookId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
    password: "password",
    role: "owner",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    mobile: "9876543210",
    password: "password",
    role: "seeker",
  },
];

const INITIAL_BOOKS: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    location: "New York",
    contact: "john@example.com",
    ownerId: "1",
    isRented: false,
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    location: "London",
    contact: "john@example.com",
    ownerId: "1",
    isRented: false,
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    location: "Chicago",
    contact: "john@example.com",
    ownerId: "1",
    isRented: true,
    createdAt: new Date().toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=687&auto=format&fit=crop",
  },
];

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("bookSwapUsers");
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });
  
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("bookSwapBooks");
    return savedBooks ? JSON.parse(savedBooks) : INITIAL_BOOKS;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("bookSwapCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("bookSwapUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("bookSwapBooks", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("bookSwapCurrentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid email or password.",
      variant: "destructive",
    });
    return false;
  };

  const register = (userData: Omit<User, "id">) => {
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "Email already exists.",
        variant: "destructive",
      });
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `${users.length + 1}`,
    };
    
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    
    toast({
      title: "Registration Successful",
      description: `Welcome to BookSwap, ${newUser.name}!`,
    });
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const addBook = (bookData: Omit<Book, "id" | "ownerId" | "isRented" | "createdAt">) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to add a book.",
        variant: "destructive",
      });
      return false;
    }

    if (currentUser.role !== "owner") {
      toast({
        title: "Error",
        description: "Only book owners can add books.",
        variant: "destructive",
      });
      return false;
    }

    const newBook: Book = {
      ...bookData,
      id: `${books.length + 1}`,
      ownerId: currentUser.id,
      isRented: false,
      createdAt: new Date().toISOString(),
    };

    setBooks((prev) => [...prev, newBook]);
    
    toast({
      title: "Book Added",
      description: `"${newBook.title}" has been added to your listings.`,
    });
    
    return true;
  };

  const toggleBookStatus = (bookId: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, isRented: !book.isRented } : book
      )
    );

    const book = books.find((b) => b.id === bookId);
    if (book) {
      toast({
        title: book.isRented ? "Book Available" : "Book Rented/Exchanged",
        description: `"${book.title}" status has been updated.`,
      });
    }
  };

  const deleteBook = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      
      toast({
        title: "Book Removed",
        description: `"${book.title}" has been removed from your listings.`,
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        users,
        books,
        currentUser,
        login,
        register,
        logout,
        addBook,
        toggleBookStatus,
        deleteBook,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
