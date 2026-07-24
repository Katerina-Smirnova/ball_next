'use client';

import login from "@/app/api/userServer";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "@/app/features/user/usersSlice";
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const [user, setUser] = useState({username: "", password: ""});
    const dispatch = useDispatch();
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const token = await login(user);
        if (token) {
            dispatch(loginUser(token));
            router.replace('/game')
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

            <button type="submit">Login</button>
        </form>
    );
}