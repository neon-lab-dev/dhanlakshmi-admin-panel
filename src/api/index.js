const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1";

export const API = {
  //auth
  login: BACKEND_BASE_URL + "/login", //to login user
  user: BACKEND_BASE_URL + "/me", //to get user details
  logout: BACKEND_BASE_URL + "/logout", //to logout user

  // product
  getAllDoctors: BACKEND_BASE_URL + "/products", //to get All doctors
  createDoctor: BACKEND_BASE_URL + "/createproduct", //to create Product
  deleteDoctor: BACKEND_BASE_URL + "/product", //to delete Product
  getDoctorDetail: BACKEND_BASE_URL + "/product", //to get details of  Product
  updateDoctorDetail: BACKEND_BASE_URL + "/product", //to get details of  Product

  //dashboard
  dashboard: BACKEND_BASE_URL + "/admin/dashboard", //to get dashboard details

  //users
  userDetails: BACKEND_BASE_URL + "/admin/seller", //to get all  details
  connectedUserDetails: BACKEND_BASE_URL + "/users", //to get all  users details
  userStatus: BACKEND_BASE_URL + "/lead", // to get a specified user

  //reviews
  reviewsDetails: BACKEND_BASE_URL + "/reviews", //to get all reviews details

  //Blogs
  allBlogs: BACKEND_BASE_URL + "/products", //to get all blog details
  Blog: BACKEND_BASE_URL + "/product", // to delete the blog
  createBlog: BACKEND_BASE_URL + "/createproducts",

  getAdminReviews: BACKEND_BASE_URL + "/areviews", //to get admin all reviews details
  updateReviewStatus: BACKEND_BASE_URL + "/reviewstatus", // /:id
};

