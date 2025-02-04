import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function products(req: NextApiRequest, res: NextApiResponse) {
  console.log("path product");
  const
    { query, method } = req,
    { path } = query,
    id: number | undefined = Number(query?.path?.[0]);

  console.log("***", method, { id });
  switch (req.method) {
    case 'OPTIONS':
      res.writeHead(204);
      break;
    case 'GET':
      const rows = await prisma.product.findMany();
      res.status(200).json(rows);
      break;
    case 'POST':
      // await prisma.cart.create({ data: { text: req.body.text } });
      res.status(201).end();
      break;
    default:
      res.statusCode = 404;
  }

}

