import axios from "axios";

// const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
    baseURL: "http://52.55.222.201:5000", //"http://localhost:5000"
});

// if(accessToken){
//     AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };