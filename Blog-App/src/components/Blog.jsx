import { useState } from "react";
import { NavLink } from "react-router";

export default function Blog(props) {
  const { blog, authorName, currentUser, handleDeleteBlog } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`flex bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[260px]`}
    >
      {/* Left Image */}
      <div className="w-[38%] shrink-0 self-stretch">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between p-6 flex-1">
        
        {/* Top */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            {blog.title}
          </h2>

          {/* Description */}
          <div>
            <p
              className={`text-gray-500 leading-7 transition-all duration-300 ${
                expanded ? "" : "line-clamp-3"
              }`}
            >
              {blog.description}
            </p>

            {blog.description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-semibold text-purple-600 hover:text-blue-600 transition-colors"
              >
                {expanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between mt-6 pt-4">
          
          {/* Author */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Author
            </p>

            <p className="font-semibold text-slate-800 text-lg">
              {authorName}
            </p>
          </div>

          {/* Buttons */}
          {currentUser?.name === authorName && (
            <div className="flex gap-2">

              {/* Edit */}
              <NavLink to={`/blogForm/${blog.id}`}>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                    />
                  </svg>
                </div>
              </NavLink>

              {/* Delete */}
              <button
                className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                onClick={() => handleDeleteBlog(blog)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.108 0 0 0-7.5 0"
                  />
                </svg>
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}