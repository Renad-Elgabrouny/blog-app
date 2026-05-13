import { useEffect, useState } from "react";
import { getUserById, logout } from "../services/authService";
import Blog from "../components/Blog";
import { NavLink } from "react-router";
import { deleteBlog } from "../services/blogService";
import { toast } from "react-toastify";

export default function Home(props) {
  const { blogs, currentUser, isAuthenticated , handleDelete , setblogs,setIsAuthenticated,setCurrentUser} = props;

  //* States-------------------
  const [usersCache, setUsersCache] = useState({});
  console.log(blogs);

  //*Handlers
  const handleDeleteBlog= async(blog)=>{
    const itemsBeforeDelete=[...blogs];
    try {
    handleDelete(blog); 
    await deleteBlog(blog.id);
    toast.success("Blog Deleted successfully!");
  // eslint-disable-next-line no-unused-vars
  }catch(error){
    setblogs(itemsBeforeDelete);
    toast.error(
        "Something went wrong, please refresh the page and try again later!",
      );
  }
}


  //* useEffect----------------
  useEffect(() => {
    const fetchAuthors = async () => {
      const uniqueIds = [...new Set(blogs.map((b) => b.userId))];
      const users = await Promise.all(uniqueIds.map((id) => getUserById(id)));
      const cache = {};
      users.forEach((user) => (cache[user.id] = user.name));
      setUsersCache(cache);
    };
    if (blogs.length) fetchAuthors();
  }, [blogs]);
  console.log(currentUser);

  //* Rendering-------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-800 to-blue-750 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            BlogSphere
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Discover amazing stories and ideas
          </p>
        </div>

        <div>
          {currentUser.name ? (
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <NavLink to="/Registeration&Login">
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform duration-200 font-semibold shadow-lg cursor-pointer" onClick={
                ()=>{
                  logout();
                  setIsAuthenticated(false);
                  setCurrentUser({})
                }
              }>
                Logout
              </button>
            </NavLink>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center font-bold text-lg">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
              <NavLink to="/userProfile">
              <div>
                <p className="text-sm text-gray-300">Welcome back</p>
                <p className="font-semibold">{currentUser.name}</p>
              </div>
              </NavLink>
            </div>
          ) : (
            <NavLink to="/Registeration&Login">
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform duration-200 font-semibold shadow-lg">
                Register / Login
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Blogs Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              authorName={usersCache[blog.userId] || "Unknown"}
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              handleDeleteBlog={handleDeleteBlog}
            />
          </div>
        ))}
      </div>
     {isAuthenticated && ( <NavLink to="/blogForm/new">
      <div className="fab">
      <div className="btn btn-primary btn-circle btn-lg bg-fuchsia-950" >
        +
      </div>
      </div>
      </NavLink>)}
    </div>
  );
}
