import  prisma  from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    console.log("CREATE API HIT!", req.body);
    
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { title, description, price } = req.body;

    const item = await prisma.item.create({
      data: {
        title,
        description,
        price: parseFloat(price) || 0,
      },
    });

    return res.status(201).json(item);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}