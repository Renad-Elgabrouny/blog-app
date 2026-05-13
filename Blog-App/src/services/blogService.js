import axios from "axios";

const baseURL= "http://localhost:3000/blogs";

export const createBlog=async (blogData,userId,token)=>{
  const ressponse=await axios.post(`${baseURL}`,
    {...blogData},
    {
      headers:token?{Authorization:`Bearer ${token}`}:{}
    }
  );
  return ressponse.data;
};

export const getBlogs=async ()=>{
  const ressponse=await axios.get(`${baseURL}`);
  return ressponse.data;
};

export const getUserBlogs=async(userId)=>{
  const response=await axios.get(`${baseURL}?userId=${userId}`);
  return response.data;
}

export const updateBlog = async (id, data, token) => {
  const response = await axios.patch(
    `http://localhost:3000/blogs/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteBlog = async (id, token) => {
  const response = await axios.delete(
    `http://localhost:3000/blogs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};