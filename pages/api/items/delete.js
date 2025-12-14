import  prisma  from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { id } = req.body;

    await prisma.item.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}