import { signup } from '@/utils/db/servicefirebase';
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  alamat: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    
    // Validasi Tugas: Email wajib diisi
    if (!email) {
      return res.status(400).json({ name: "Email wajib diisi!", alamat: "" });
    }
    // Validasi Tugas: Password min 6 karakter
    if (!password || password.length < 6) {
      return res.status(400).json({ name: "Password minimal 6 karakter!", alamat: "" });
    }

    await signup(req.body, (result: { status: string; message: string }) => {
      if (result.status === "success") {
        res.status(200).json({ name: result.message, alamat: "" });
      } else {
        res.status(400).json({ name: result.message, alamat: "" });
      }
    });
  } else {
    res.status(405).json({ name: "Method not allowed", alamat: "" });
  }
}