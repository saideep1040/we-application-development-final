import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("UPDATE RECEIVED BODY:", req.body)

  try {
    const { id, title, description, price } = req.body;

    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: Number(price),
      },
    });

    return res.status(200).json(updatedItem);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}