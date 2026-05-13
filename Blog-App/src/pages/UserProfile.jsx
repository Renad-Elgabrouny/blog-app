
export default function UserProfile(props) {
  const {currentUser,blogs}=props; // to remeber current user has image url , name , email 

  const getUserBlogsLength=()=>{
    const userBlogs=blogs.filter((blog)=>blog.userId==currentUser.id);
    return userBlogs.length;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex items-center justify-center p-6">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 relative">
          
          {/* Profile Image */}
          <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
            <img
              src={
                currentUser?.image ||
                "https://i.pravatar.cc/300"
              }
              alt={currentUser?.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 pb-8 px-6 text-center text-white">
          
          <h1 className="text-3xl font-bold mb-2">
            {currentUser?.name}
          </h1>

          <p className="text-gray-300 mb-6">
            {currentUser?.email}
          </p>

          {/* Stats */}
          <div className="felx justify-center mb-8">
            
            <div className="bg-white/10 rounded-2xl p-4">
              <h2 className="text-xl font-bold text-blue-300">{getUserBlogsLength()}</h2>
              <p className="text-sm text-gray-300">Blogs</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}