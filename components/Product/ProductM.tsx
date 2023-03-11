import React from "react";
import {
  createStyles,
  Box,
  Stack,
  Group,
  Text,
  Button,
  Spoiler,
  List,
  Flex,
  Accordion,
  ScrollArea,
  Divider,
  Image,
  Transition,
} from "@mantine/core";
import { ProductType } from "@/type/type";
import SliderM from "./SliderM";
import Bookmark from "./Bookmark";
import {
  AlertCircle,
  AlignBoxBottomLeft,
  Car,
  Recycle,
} from "tabler-icons-react";
import Product from "@/components/ProductList/Product";
import ServiceCardM from "./ServiceCardM";
import { useRef, useEffect, useState } from "react";
// import Image from "next/image";

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  content: {
    padding: "1rem",
    backgroundColor: theme.colorScheme === "light" ? "white" : "black",
  },

  detailBlock: {
    margin: "0.3rem 0",
  },
}));

const services = [
  {
    title: "支付方式",
    icon: AlignBoxBottomLeft,
    desc: "Credit card, debit card or bank transfer",
  },
  {
    title: "配送服务",
    icon: Car,
    desc: "Complimentary Delivery or Collect-in-Store",
  },
  {
    title: "退换货服务",
    icon: Recycle,
    desc: "Complimentary, in store and online",
  },
];

function ProductM({ product }: { product: ProductType }) {
  const { classes, theme } = useStyles();
  const [y, setY] = useState<number | undefined>(0);
  const [showBox, setShowBox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const galref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setY(ref.current?.offsetTop);
    window.addEventListener("scroll", changeZIndex);
    return () => {
      window.removeEventListener("scroll", changeZIndex);
    };
  }, []);

  const changeZIndex = () => {
    if (galref.current && ref.current && y != undefined) {
      console.log(ref.current.getBoundingClientRect().top, y);
      if (ref.current.getBoundingClientRect().top < y) {
        galref.current.style.zIndex = "-1";
      } else {
        galref.current.style.zIndex = "100";
      }

      if (ref.current.getBoundingClientRect().top < 0) {
        setShowBox(true);
      } else {
        setShowBox(false);
      }
    }
  };
  return (
    <Box className={classes.container}>
      <Transition
        mounted={showBox}
        transition={"fade"}
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Box
              sx={{
                padding: "1rem 1rem",
                backgroundColor:
                  theme.colorScheme === "light" ? "white" : "black",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                position: "fixed",
                width: "100%",
                zIndex: 10000,
                top: 0,
              }}
            >
              <Flex align={"center"} gap={"lg"}>
                <Image src={product.images[0]} width={"3rem"} height={"3rem"} />
                <Text>{product.defaultPrice}</Text>
                <Button
                  variant={"default"}
                  radius={"xl"}
                  sx={{ marginLeft: "auto" }}
                >
                  Add to bag
                </Button>
              </Flex>
            </Box>
          </div>
        )}
      </Transition>

      <Box sx={{ position: "sticky", top: 0 }} ref={galref}>
        <SliderM images={product.images} />
      </Box>
      <Stack className={classes.content} ref={ref}>
        <Flex align={"center"}>
          <Text size={"sm"} weight={"bolder"}>
            {product.pid}
          </Text>
          <Box sx={{ marginLeft: "auto" }}>
            <Bookmark />
          </Box>
        </Flex>
        <Box>
          <Text size={"md"} weight={"bolder"}>
            {product.name}
          </Text>
        </Box>
        <Box>
          <Text size={"sm"}>{product.defaultPrice}</Text>
        </Box>
        <Button
          variant="default"
          radius={"xl"}
          sx={{ border: "1px solid black" }}
        >
          Add to bag
        </Button>
        <Flex align={"center"}>
          <Text size={"sm"}>
            Due to a high demand, your product will be shiped in 3 to 10 weeks.
          </Text>
          <AlertCircle size={23} />
        </Flex>
        <Spoiler
          maxHeight={60}
          showLabel="Read More"
          hideLabel="Read Less"
          transitionDuration={1000}
        >
          {product.description}
        </Spoiler>
        <Text size={"md"} weight={"bolder"}>
          Product details
        </Text>
        <Spoiler
          maxHeight={60}
          showLabel="Read More"
          hideLabel="Read Less"
          transitionDuration={1000}
        >
          {product.details.map((item, index) => (
            <Box key={index} className={classes.detailBlock}>
              <Text>{item?.content}</Text>
              <List>
                {item.lists?.map((text) => (
                  <List.Item key={text}>{text}</List.Item>
                ))}
              </List>
            </Box>
          ))}
        </Spoiler>
        <Accordion defaultValue={product.tags[0].title}>
          {product.tags.map((item) => (
            <Accordion.Item value={item.title} key={item.title}>
              <Accordion.Control>{item.title}</Accordion.Control>
              <Accordion.Panel>{item.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Text size={"xl"} weight={"bolder"}>
          YOU MAY AlSO LIKE
        </Text>
        <ScrollArea sx={{ height: "23rem" }}>
          <Flex
            gap="sm"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="nowrap"
            sx={{ height: "20rem" }}
          >
            {product.recommand.map((item) => (
              <Box key={item.name} sx={{ width: "12rem" }}>
                <Product product={item} />
              </Box>
            ))}
          </Flex>
        </ScrollArea>
        <Divider my="sm" />
        <Stack>
          {services.map((item) => (
            <ServiceCardM service={item} key={item.title} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProductM;
