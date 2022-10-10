// import { PrismaClient } from '@prisma/client/scripts/default-index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 아이템 조회 API
async function getProducts(skip, take) {
  try {
    const response = await prisma.products.findMany({ skip, take });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default async function handler(req, res) {
  try {
    const { skip, take } = req.query;
    if (skip == null || take == null) {
      res.status(400).json({ message: 'No skip or take' });
      return;
    }
    const products = await getProducts(Number(skip), Number(take));

    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
