import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { createBlog, updateBlog } from "../services/blogService";
import { toast } from "react-toastify";

export default function BlogForm(props) {
  const {
    isAuthenticated,
    blogs,
    currentUser,
    handleAddBlog,
    handleEditBlog,
  } = props;

  const navigate = useNavigate();
  const { id } = useParams();

  const mode = id === "new" ? "add" : "edit";

  //* States -----------------
  const [blogForm, setblogForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [error, setError] = useState({});

  //* Handlers ----------------
  const handleChange = (e) => {
    setblogForm({
      ...blogForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
  let newErrors = {};

  if (!blogForm.title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!blogForm.description.trim()) {
    newErrors.description = "Description is required";
  }

  if (!blogForm.image.trim()) {
    newErrors.image = "Image URL is required";
  } else {
    try {
      new URL(blogForm.image);
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      newErrors.image = "Please enter a valid URL";
    }
  }

  setError(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (mode === "add") {
      await handleAdd();
    } else {
      await handleEdit();
    }
  };

  const handleAdd = async () => {
    const blogToSubmit = {
      title: blogForm.title,
      description: blogForm.description,
      image: blogForm.image,
      userId: +currentUser.id,
    };

    const res = await createBlog(blogToSubmit);

    handleAddBlog(res);

    toast.success("Blog added successfully!");

    navigate("/home");
  };

  const handleEdit = async () => {
    const blogToSubmit = {
      title: blogForm.title,
      description: blogForm.description,
      image: blogForm.image,
      userId: +currentUser.id,
    };

    const res = await updateBlog(id, blogToSubmit);

    handleEditBlog(res);

    toast.success("Blog updated successfully!");

    navigate("/home");
  };

  //* useEffect ----------------
  useEffect(() => {
    if (mode === "edit" && blogs.length > 0) {
      const blog = blogs.find((itm) => +itm.id === +id);

      if (blog) {
        setblogForm(blog);
      }
    }
  }, [blogs, id, mode]);

  //* Render -------------------
return (
  <>
    {isAuthenticated ? (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex items-center justify-center px-4 py-10">
        
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 text-center">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {mode === "add"
                ? "Create New Blog"
                : "Edit Your Blog"}
            </h1>

            <p className="text-blue-100">
              Share your thoughts, ideas, and stories with the world
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Blog Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={blogForm.title}
                onChange={handleChange}
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />

              {error.title && (
                <p className="text-red-400 mt-2 text-sm">
                  {error.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={blogForm.description}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-40 resize-none"
              />

              {error.description && (
                <p className="text-red-400 mt-2 text-sm">
                  {error.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Image URL
              </label>

              <input
                type="text"
                id="image"
                name="image"
                value={blogForm.image}
                onChange={handleChange}
                placeholder="Paste image URL..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              />

              {error.image && (
                <p className="text-red-400 mt-2 text-sm">
                  {error.image}
                </p>
              )}
            </div>

            {/* Image Preview */}
            {blogForm.image && (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={blogForm.image}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                {mode === "add"
                  ? "Publish Blog"
                  : "Update Blog"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex items-center justify-center px-4">
        
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 text-center shadow-2xl max-w-md">
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Join BlogSphere
          </h1>

          <p className="text-gray-300 mb-8">
            Register or login to create and share blogs.
          </p>

          <NavLink
            to="/Registeration&Login"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Register / Login
          </NavLink>
        </div>
      </div>
    )}
  </>
);
}