import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d61fd.firebaseio.com/',
})

export default instance;