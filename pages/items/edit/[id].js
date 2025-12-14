import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/items/getOne/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    await fetch("/api/items/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        description,
        price,
      }),
    });

    router.push("/items");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Item</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
