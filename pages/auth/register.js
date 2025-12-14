import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    router.push("/auth/login");
  }

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <a href="/auth/login">Login</a>
      </p>
    </div>
  );
}
