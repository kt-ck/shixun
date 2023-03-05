import Head from "next/head";
import { Stack } from "@mantine/core";
import IndexMediaShow from "@/components/IndexMediaShow";
import { GetStaticProps } from "next";
interface Post {
  mediaUrl: { des: string; mo: string };
  height: { desh: number; moh: number };
  type: "video" | "image";
  text: string;
  btnlist: { text: string; target: string }[];
}
export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>Index</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Stack sx={{ gap: 0 }}>
          {posts.map((item: Post) => (
            <IndexMediaShow
              mediaUrl={item.mediaUrl}
              height={item.height}
              type={item.type}
              text={item.text}
              btnlist={item.btnlist}
              key={item.text}
            />
          ))}
        </Stack>
      </>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async (
  context
) => {
  return {
    props: {
      posts: [
        {
          mediaUrl: { des: "/Index_1.webp", mo: "/Index_1_m.jpg" },
          height: { desh: 800, moh: 800 },
          type: "image",
          text: "WOMEN'S Fall-Winter 2023 Show",
          btnlist: [
            {
              text: "Countdown to the show",
              target: "#",
            },
          ],
        },
        {
          mediaUrl: { des: "/Index_2.mp4", mo: "/Index_2_m.mp4" },
          height: { desh: 700, moh: 440 },
          type: "video",
          text: "WOMEN's Spring Summer Show",
          btnlist: [
            {
              text: "Explore the Collection",
              target: "#",
            },
            {
              text: "Discover the Lastest Bags",
              target: "#",
            },
          ],
        },
      ],
    },
  };
};
