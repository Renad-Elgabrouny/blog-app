import { useEffect, useState } from "react";
import LoginRegisterForm from "./pages/LoginRegisterForm";
import Home from "./pages/Home";
import { getBlogs } from "./services/blogService";
import { getCurrentUser, getUserById } from "./services/authService";
import { Routes,Route } from "react-router";
import BlogForm from "./pages/BlogForm";
import { ToastContainer } from "react-toastify";
import UserProfile from "./pages/UserProfile";
import LandingPage from "./pages/LandingPage";

export default function App() {
  //* States-------------
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [currentUser, setCurrentUser] = useState({});
  const [blogs, setblogs] = useState([]);

  //* Handlers---------------------

  const handleAddBlog = (product) => setblogs([...blogs, product]);

  const handleEditBlog = (product) => {
    const newItems = blogs.map((itm) =>
      itm.id === product.id ? product : itm,
    );
    setblogs(newItems);
  };

  const handleDelete = (blog)=>{
    const blogAfterDelete = blogs.filter((blg)=>blg.id!==blog.id);
    setblogs(blogAfterDelete);
  }

  //* useEffect--------------------
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBlogs();
      setblogs(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFullUser = async () => {
      const decoded = getCurrentUser();
      if (decoded) {
        const user = await getUserById(decoded.sub);
        setCurrentUser(user);
      }
    };
    fetchFullUser();
  }, [isAuthenticated]);
  //* Rendering------------------
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
        path="/"
        element={<LandingPage />} 
        />
        <Route
          path="/home"
          element={
            <Home
              blogs={blogs}
              currentUser={currentUser}
              isAuthenticated={isAuthenticated}
              handleDelete={handleDelete}
              setblogs={setblogs}
              setIsAuthenticated={setIsAuthenticated}
              setCurrentUser={setCurrentUser }
            />
          }
        />
        <Route
          path="/Registeration&Login"
          element={
            <LoginRegisterForm
              setIsAuthenticated={setIsAuthenticated}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
      path="/blogForm/:id"
      element={<BlogForm  isAuthenticated={isAuthenticated} blogs={blogs}  currentUser={currentUser} handleEditBlog={handleEditBlog} handleAddBlog={handleAddBlog}/>}
      />
      <Route
      path="/userProfile"
      element={<UserProfile currentUser={currentUser} blogs={blogs}/>}
      />
      </Routes>
      
    </div>
  );
}
