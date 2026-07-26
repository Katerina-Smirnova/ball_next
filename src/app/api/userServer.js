import axios from "axios";

const login = async ({username, password}) => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username: username,
            password: password,
        });
        return {success: true, data: response.data};
    } catch (error) {
        let errorMessage = 'Произошла ошибка при входе';
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Неверный запрос. Проверьте введенные данные.';
                    break;
                case 401:
                    errorMessage = 'Неверное имя пользователя или пароль.';
                    break;
                case 403:
                    errorMessage = 'Доступ запрещен.';
                    break;
                case 404:
                    errorMessage = 'Сервер не найден.';
                    break;
                case 500:
                    errorMessage = 'Внутренняя ошибка сервера. Попробуйте позже.';
                    break;
                default:
                    errorMessage = `Ошибка сервера: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = 'Сервер не отвечает. Проверьте интернет-соединение.';
        }
        return {success: false, error: errorMessage};
    }
}
export default login