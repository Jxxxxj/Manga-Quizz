"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackgroundVideo from "../../app/components/BackgroundVideo";


const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", { name, password });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundVideo />
      <header className="absolute top-0 left-0 w-full py-4  text-white text-center">
        <h1>Manga Quiz</h1>
      </header>

      <form
        className="relative flex flex-col items-center justify-center min-h-screen gap-3 "
        onSubmit={handleRegister}
      >
        <input
          className="border border-gray-300 p-2 rounded mb-4 w-50"
          type="text"
          placeholder="Nom d'utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4 w-50"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          type="submit"
        >
          Inscription
        </button>
      </form>
    </div>
  );
};

export default Register;
