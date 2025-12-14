import { useState } from "react";

export default function CreateItemPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/items/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price }),
    });

    window.location.href = "/items";
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <button type="submit">Create</button>
      </form>

      <br />
      <a href="/items">Back to Items</a>
    </div>
  );
}