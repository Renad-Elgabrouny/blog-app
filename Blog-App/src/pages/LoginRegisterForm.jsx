import { useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authService";
import { register, login } from "../services/authService";
export default function LoginRegisterForm(props) {
  const navigate = useNavigate();

  //*Props----------
  const { setIsAuthenticated, setCurrentUser } = props;

  //* States------------
  const [isLoginMode, setisLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  //* Handlers------------

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (Object.keys(validate()).length > 0) return;

  try {
    if (isLoginMode) {
      console.log(`Login data = ${formData.email} , ${formData.password}`)
      await login({ email: formData.email, password: formData.password });
      
    } else {
      await register(formData);
    }
    
    setIsAuthenticated(true);
    setCurrentUser(getCurrentUser()); 
    navigate("/home");
  } catch (err) {
    setError({ api: err.response?.data?.message || "Something went wrong" });
  }
};
  //* Validation-------------
  const validate = () => {
    const newErrors = {};
    if (isLoginMode) {
      if (!formData.email) {
        newErrors.email = "Email is required";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
      setError(newErrors);
      return newErrors;
    } else {
      if (!formData.name) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      setError(newErrors);
      return newErrors;
    }
  };
  //* Render-----------------
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div>
                <label htmlFor="name" className="label font-medium ">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
                {error.name && <p className="text-red-500">{error.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="label font-medium">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="label font-medium">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              {error.password && (
                <p className="text-red-500">{error.password}</p>
              )}
            </div>

            {!isLoginMode && (
              <div>
                <label htmlFor="confirmPassword" className="label font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                />
                {error.confirmPassword && (
                  <p className="text-red-500">{error.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2 bg-blue-900 text-amber-50 rounded-2xl"
            >
              {isLoginMode ? "Login" : "Register"}
            </button>

            <p className="text-center text-sm mt-4 opacity-70">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}

              <button
                type="button"
                className="link link-info ml-1 text-blue-900"
                onClick={() => {
                 setisLoginMode(!isLoginMode);
                  setError({});
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
              >
                {isLoginMode ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
