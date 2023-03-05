import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  role: string;
  name: string;
  email: string;
  avatar: string;
  isLogIn: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.body.email === "1@a.com") {
    res
      .status(200)
      .json({
        role: "ck",
        name: "ck",
        email: "1@a.com",
        avatar: "/logo.png",
        isLogIn: true,
      });
  } else if (req.body.email === "2@a.com") {
    res
      .status(200)
      .json({
        role: "admin",
        name: "admin",
        email: "2@a.com",
        avatar: "/logo.png",
        isLogIn: true,
      });
  } else if (req.body.email === "3@a.com") {
    res
      .status(200)
      .json({
        role: "diliver",
        name: "diliver",
        email: "3@a.com",
        avatar: "/logo.png",
        isLogIn: true,
      });
  } else {
    res
      .status(200)
      .json({
        role: "guest",
        name: "guest",
        email: "4@a.com",
        avatar: "/logo.png",
        isLogIn: true,
      });
  }
}
