import { axiosInstance } from "../axios/AxiosInstance"

export const GetSongOfUserApi = async(req,res)=>{
    try {
        let res =await  axiosInstance.get("/getsongofuser");
        if(res){
            return res;
        }
    } catch (error) {
        console.log("error in getsongofuserapi->",error);
        
    }

}