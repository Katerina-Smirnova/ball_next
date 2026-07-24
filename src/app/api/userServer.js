import axios from "axios";

const login = async ({ username, password }) => {
    const response = await axios.post('https://dummyjson.com/auth/login',
        {
            username: username,
            password: password,
        })
        .then(response => response.data)
        .catch(error => console.error(error));
    return response;
}
export default login