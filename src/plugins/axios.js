import axios from "axios";
import Swal from "sweetalert2";

const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL

}); 

axiosapi.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if(error.response && error.response.status ) {
            Swal.fire({
                text: "發生錯誤："+error.message,
                icon: "error"
            })
            return Promise.reject();
        }
        return Promise.reject(error);
    }
);

export default axiosapi;