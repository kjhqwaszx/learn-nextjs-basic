import axios from 'axios';

const instace = axios.create({
  baseURL: "https://api.themovedb.org/3",
  params:{
    api_key: "399073e1c44bb8788f1897fc654d521f",
    language: "ko-KR"
  }
})

export default instace;
