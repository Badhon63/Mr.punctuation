"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registered!");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-10">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 block mb-4"
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-4"
      />

      <button onClick={registerUser} className="bg-black text-white px-4 py-2">
        Register
      </button>
    </div>
  );
}
