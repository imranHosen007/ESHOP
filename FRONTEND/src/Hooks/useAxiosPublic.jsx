import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://eshop-bq43.onrender.com",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
