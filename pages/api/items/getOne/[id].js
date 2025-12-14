import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    return res.status(200).json(item);
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
