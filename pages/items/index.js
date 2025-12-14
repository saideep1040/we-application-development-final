import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/items/get")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Items List</h1>

      <a href="/items/create">
        <button style={{ marginBottom: "20px" }}>Create New Item</button>
      </a>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: "20px" }}>
              <strong>{item.title}</strong> — ${item.price}
              <br />
              {item.description}
              <br />
              <a href={`/items/edit/${item.id}`}>
                <button>Edit</button>
              </a>
              <button
                style={{ marginLeft: "10px" }}
                onClick={async () => {
                  await fetch("/api/items/delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: item.id }),
                  });
                  window.location.reload();
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import jwt from "jsonwebtoken";

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  // If no token → redirect to login
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return {
      props: {}, // allow access
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}