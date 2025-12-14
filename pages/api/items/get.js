import prisma  from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const items = await prisma.item.findMany();
    return res.status(200).json(items);
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}