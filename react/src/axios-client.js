import axios from "axios"

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    try {
      const {response} = error;
      // 401 unauthorized
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
        // window.location.reload();
      } 
      // else if (response.status === 404) {
      //   //Show not found
      // }
    } catch (error) {
      console.error(error);
    }
  })

export default axiosClient;