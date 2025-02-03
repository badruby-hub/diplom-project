import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
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
      const rows = await prisma.cart.findMany();
      res.status(200).json(rows);
      break;
    case 'POST':
      res.status(201).end();
      break;
    case 'DELETE':
      res.status(201).json('');
      break;
    default:
      res.statusCode = 404;
  }

}

