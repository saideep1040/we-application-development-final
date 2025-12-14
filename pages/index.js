import { useEffect, useState } from "react";

// PART A — Logout function
async function handleLogout() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });

  window.location.href = "/auth/login";
}

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  // Fetch all items
  useEffect(() => {
    fetch("/api/items/get")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Delete item
  async function deleteItem(id) {
    await fetch("/api/items/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
       {/* LOGOUT BUTTON */}
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <h1>Items List</h1>

      <a href="/items/create">Create New Item</a>
      <br /><br />

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>

          <a href={`/items/edit/${item.id}`}>Edit</a>
          <br />

          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

// PROTECT THE PAGE (server-side only!)
export async function getServerSideProps({ req }) {
  const jwt = require("jsonwebtoken"); // allowed only here (server-side)

  const token = req.cookies?.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return { props: {} };
  } catch (err) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
