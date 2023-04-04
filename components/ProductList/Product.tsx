import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  getStylesRef,
  rem,
  Stack,
  Flex,
  Box,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { SimpleProduct } from "@/type/type";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gray_layout } from "@/type/const";
const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },

    boxSelected: {
      borderBottom: "1px solid black",
      [theme.fn.smallerThan("sm")]: {
        borderBottom: "1px solid white",
      },
    },
  },
}));

export default function Product({ product }: { product: SimpleProduct }) {
  const { classes } = useStyles();
  const router = useRouter();
  const slides = product.images.map((item) => (
    <Carousel.Slide key={item}>
      <Box>
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%,rgba(0,0,0,0.2))",
            zIndex: 100,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></Box>
        <Image src={item} height={220} alt="" fit="contain" />
      </Box>
    </Carousel.Slide>
  ));

  return (
    <Card withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group
        sx={{ cursor: "pointer" }}
        onClick={() => {
          router.push({
            pathname: "/Product/product",
            query: {
              productId: product.productId,
            },
          });
        }}
      >
        <Stack sx={{ paddingTop: "1rem", width: "100%", gap:"0.4rem"}}>
          <Group>
            <Text fw={400} fz="lg">
              {product.name}
            </Text>
            <Box
              sx={{
                width: "1rem",
                height: "1rem",
                backgroundColor: product.color,
                borderRadius: "50%",
                border: `1px solid ${gray_layout}`,
                marginLeft: "auto",
              }}
            ></Box>
          </Group>
          <Group>
            <Text fw={300}>${product.price}</Text>
            <Text
              sx={{ marginLeft: "auto" }}
              c="dimmed"
              fw={300}
            >{`${product.saleCount} sold`}</Text>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
