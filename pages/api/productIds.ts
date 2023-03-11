import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  productId: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ productId: ["1","2","3","4","5","6"] })
}