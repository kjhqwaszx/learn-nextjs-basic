// import { PrismaClient } from '@prisma/client/scripts/default-index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 아이템 조회 API
async function getProducts() {
  try {
    const response = await prisma.products.findMany();
    console.log('###response: ', response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default async function handler(req, res) {
  try {
    const products = await getProducts();
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
