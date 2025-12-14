import { useEffect, useState } from "react";
import Router from "next/router";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/items/get");

      if (res.status === 401) {
        Router.push("/login");
      } else {
        setAuth(true);
      }
    }

    checkAuth();
  }, []);

  if (!auth) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>You are logged in!</p>

      <a href="/items">Go to Items</a>
    </div>
  );
}

<button onClick={() => {
  fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}}>
  Logout
</button>
