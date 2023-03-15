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
  Select,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { SimpleProduct } from "@/type/type";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const slides = product.images.map((item) => (
    <Carousel.Slide key={item}>
      <Image src={item} height={220} />
    </Carousel.Slide>
  ));
  const data = product.sku.map((item, index) => ({
    value: String(index),
    label: `${item.color}/ ${item.size}`,
  }));
  const [value, setValue] = useState<string | null>("0");
  const [price, setPrice] = useState(product.defaultPrice);
  useEffect(() => {
    const i = Number(value);
    if (!isNaN(i)) {
      setPrice(product.sku[i].price);
    }
  }, [value]);
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

      <Group sx={{ cursor: "pointer" }} onClick={()=>router.push("/Product/1")}>
        <Stack sx={{ paddingTop: "0.4rem" }}>
          <Text fw={400} fz="lg">
            {product.name}
          </Text>
          <Select
            value={value}
            data={data}
            onChange={setValue}
            placeholder="Pick one that you like"
          />
        </Stack>
        <Flex gap="md" justify={"center"} sx={{ marginLeft: "auto" }}>
          <Text fw={300}>${price}</Text>
        </Flex>
      </Group>
    </Card>
  );
}
