import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 아이템 조회 API
async function updateProduct(id, contents) {
  try {
    const response = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        contents,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(req, res) {
  const { id, contents } = JSON.parse(req.body);
  if (id == null || contents == null) {
    res.status(400).json({ message: 'No id or contents' });
    return;
  }

  try {
    const products = await updateProduct(Number(id), contents);
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
