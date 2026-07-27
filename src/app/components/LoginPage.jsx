'use client';

import login from "@/app/api/userServer";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "@/app/features/user/usersSlice";
import {useRouter} from 'next/navigation';


export default function LoginPage() {
    const [user, setUser] = useState({username: "", password: ""});
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!user.username.trim() || !user.password.trim()) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }
        const result = await login(user);
        if (result.success) {
            dispatch(loginUser(result));
            router.replace('/game')
        } else {
            setError(result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={(e) =>
                    setUser({
                        ...user,
                        username: e.target.value
                    })
                }
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                    setUser({
                        ...user,
                        password: e.target.value
                    })
                }
            />
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <button type="submit">Login</button>
        </form>
    );
}