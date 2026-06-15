"use client";

import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function UserLogin() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginUser(form);
            router.push("/")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="text" placeholder="password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button>Submit</button>
            </form>

            <p>
                <a href="/register">
                    Register User
                </a>
            </p>
        </div>
    )
}