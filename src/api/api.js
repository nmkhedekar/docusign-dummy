import axios from "axios";

// const accessToken = localStorage.getItem("accessToken");
export const api = axios.create({
    baseURL: "http://localhost:5000", //"http://54.224.188.165:5000",
});

// if(accessToken){
//     AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };