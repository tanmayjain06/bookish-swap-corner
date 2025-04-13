
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import { useData } from "@/context/DataContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-12 px-4 bg-gradient-to-b from-white to-book-paper">
        <div className="container mx-auto">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
