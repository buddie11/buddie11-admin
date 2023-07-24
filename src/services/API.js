import axios from "axios";

export default () =>{
    return axios.create({
        baseURL:"http://buddie11server-env.eba-2kf2ar47.us-east-1.elasticbeanstalk.com",
        headers:{
            "Content-Type":"aplication/json",
            authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    })
}