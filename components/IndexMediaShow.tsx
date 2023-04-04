import React from "react";
import IndexMediaShowBox from "./IndexMediaShowBox";
import IndexMediaShowBoxM from "./IndexMediaShowBoxM";
import Image from "next/image";
import { Box, createStyles, Text, Button } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
interface DataType {
  mediaUrl: { des: string; mo: string };
  type: "video" | "image";
  height: { desh: number; moh: number };
  text: string;
  btnlist: { text: string; target: string }[];
  shadow: boolean
}

const useStyles = createStyles((theme) => ({
  imageWithText: {
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bottom: "6rem",
    fontSize: "3rem",
    margin: "0 auto",
    padding: "3rem",
    gap: "2.5rem",
    [theme.fn.smallerThan("sm")]: {
      fontSize: "1.2rem",
      bottom: "5rem",
      gap: "1rem",
    },
  },
}));
function IndexMediaShow({ mediaUrl, type, height, text, btnlist,shadow }: DataType) {
  const { classes, theme } = useStyles();
  const router = useRouter()
  useEffect(() => {
    document.querySelectorAll("video").forEach((video) => video.play());
  }, []);
  return (
    <Box sx={{ position: "relative", height: "fit-content" }}>
      <IndexMediaShowBox height={height.desh} shadow={shadow}>
        {type === "image" ? (
          <Image
            src={mediaUrl.des}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <video width={"100%"} muted loop style={{ objectFit: "cover" }}>
            <source src={mediaUrl.des} type="video/mp4"></source>
          </video>
        )}
      </IndexMediaShowBox>
      <IndexMediaShowBoxM height={height.moh} shadow={shadow}>
        {type === "image" ? (
          <Image
            src={mediaUrl.mo}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <video
            width={"100%"}
            muted
            loop
            style={{ objectFit: "cover" }}
            playsInline
          >
            <source src={mediaUrl.mo} type="video/mp4"></source>
          </video>
        )}
      </IndexMediaShowBoxM>
      <Box className={classes.imageWithText}>
        <Text ta="center" tt="uppercase" fw={700} c="white">
          {text}
        </Text>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {btnlist.map((item) => (
            <Button
              variant={"outline"}
              radius={"xl"}
              key={item.text}
              styles={(theme) => ({
                root: {
                  border: "0.3px solid white",
                  color: "white",
                  fontWeight: "normal",
                  [theme.fn.largerThan("sm")]: {
                    fontSize: "1.5rem",
                    fontWeight: "lighter",
                  },
                },
              })}
              size="xl"
              onClick={()=>router.push("/ProductList?categoryId=-1&level=0")}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default IndexMediaShow;
