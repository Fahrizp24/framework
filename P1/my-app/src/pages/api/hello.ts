// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  alamat: string
  prodi: string
  nim: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'Fahri Zanuar Pradian', alamat: 'Jl. Kembang Turi', prodi: 'D4 Teknik Informatika' ,nim: '2341720104' })
}
