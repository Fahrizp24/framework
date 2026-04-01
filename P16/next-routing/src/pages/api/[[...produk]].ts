import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.query.produk && req.query.produk[1]) {
    // req.query.produk[1] akan mengambil ID dari URL /api/produk/[id]
    const data = await retrieveDataByID("products", req.query.produk[1]);
    res.status(200).json({ status: true, status_code: 200, data });
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
  }
}