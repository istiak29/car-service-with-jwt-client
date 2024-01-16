import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'https://car-service-jwt-server.vercel.app',
    withCredentials: true
});


const useAxiosSecure = () => {

    const { userSignOut } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('Error catch by interceptors:', error.response)

            if (error.response.status === 404 || error.response.status === 403 || error.response.status === 401) {
                console.log('Logged out the user');

                userSignOut()
                    .then(() => {
                        // Swal.fire({
                        //     position: "top-end",
                        //     icon: "success",
                        //     title: "You have been logged Out",
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // });

                        navigate('/login')

                    })
                    .catch(error => console.error(error))

            }
        }
        )
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;