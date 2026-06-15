"use client";

import { registerUser } from "@/services/auth";
import { useState } from "react";

export default function UserRegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleSubmit = async(
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            console.log("clicked")
            const registerResponse = await registerUser(form);

            console.log(registerResponse);

            alert("Registration successful");
        }catch(error) {
            console.error(error);

            alert("Registration failed");
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit}>

                <h1 className="flex justify-center">Register</h1>
                <div className="flex flex-col">
                    <input type="text" className="border" placeholder="name" onChange={(e) => setForm({
                        ...form, name: e.target.value
                    })}/>
                    <input type="text" className="border" placeholder="email" onChange={(e) => setForm({
                        ...form, email: e.target.value
                    })}/>
                    <input type="text" className="border" placeholder="password" onChange={(e) => setForm({
                        ...form, password: e.target.value
                    })}/>
                </div>

                <button>Register</button>

            </form>
        </div>
    )
}
