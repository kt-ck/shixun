import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  getStylesRef,
  rem,
  Stack,
  Box,
  Flex,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import ColorList from "./ColorList";

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
interface Product {
  images: string[];
  name: string;
  price: number;
  colors: string[];
}

export default function Product({ product }: { product: Product }) {
  const { classes } = useStyles();
  const slides = product.images.map((item) => (
    <Carousel.Slide key={item}>
      <Image src={item} height={220} />
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

      <Group sx={{ cursor: "pointer" }}>
        <Stack sx={{ paddingTop: "0.4rem" }}>
          <Text fw={400} fz="lg">
            {product.name}
          </Text>
          <Text fw={300}>${product.price}</Text>
        </Stack>
        <Flex gap="md" justify={"center"} sx={{ marginLeft: "auto" }}>
          <ColorList colors={product.colors} />
        </Flex>
      </Group>
    </Card>
  );
}
