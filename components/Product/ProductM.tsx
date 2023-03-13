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
  Title,
  Select,
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
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/features/roleFeature/roleFeature";
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

export const services = [
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
  const [price, setPrice] = useState(product.defaultPrice);
  const data = product.sku.map((item, index) => ({
    value: String(index),
    label: `${item.color}/ ${item.size}`,
  }));
  const [value, setValue] = useState<string | null>("0");
  const dispatch = useAppDispatch();
  useEffect(() => {
    setY(ref.current?.offsetTop);
    window.addEventListener("scroll", changeZIndex);
    return () => {
      window.removeEventListener("scroll", changeZIndex);
    };
  }, []);
  useEffect(() => {
    const i = Number(value);
    if (!isNaN(i)) {
      setPrice(product.sku[i].price);
    }
  }, [value]);
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
  const addToCart = () => {
    let i = Number(value)
    if(!isNaN(i)){
      dispatch(
        addProduct({
          pid: product.pid,
          image: product.images[0],
          count: 1,
          name: product.name,
          sku: data[Number(i)].label,
          price,
        })
      );
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
                <Text>${price}</Text>
                <Button
                  variant={"default"}
                  radius={"xl"}
                  sx={{ marginLeft: "auto" }}
                  onClick={addToCart}
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
          <Text size={"sm"} fw={300}>
            {product.pid}
          </Text>
          <Box sx={{ marginLeft: "auto" }}>
            <Bookmark size={20} strokeWidth={1.25} />
          </Box>
        </Flex>

        <Text size={"md"} fw={400}>
          {product.name}
        </Text>

        <Text c={"dimmed"} fw={300} size={"sm"} sx={{ marginTop: "-0.6rem" }}>
          ${price}
        </Text>
        <Select
          value={value}
          data={data}
          onChange={setValue}
          label="Pick one you prefer"
          placeholder="Pick one that you like"
        />
        <Button
          variant="default"
          radius={"xl"}
          sx={{ border: "1px solid black" }}
          onClick={addToCart}
        >
          Add to bag
        </Button>
        <Flex align={"center"}>
          <Text size={"sm"} fw={300} c={"dimmed"}>
            Due to a high demand, your product will be shiped in 3 to 10 weeks.
          </Text>
          <AlertCircle strokeWidth={1.25} size={23} />
        </Flex>
        <Spoiler
          maxHeight={60}
          showLabel="Read More"
          hideLabel="Read Less"
          transitionDuration={1000}
          sx={{ marginTop: "1rem" }}
        >
          <Text fw={400} c={"dimmed"}>
            {" "}
            {product.description}
          </Text>
        </Spoiler>
        <Title order={3} fw={400} sx={{ marginTop: "2rem" }}>
          Product details
        </Title>
        <Spoiler
          maxHeight={60}
          showLabel="Read More"
          hideLabel="Read Less"
          transitionDuration={1000}
        >
          {product.details.map((item, index) => (
            <Box key={index} className={classes.detailBlock}>
              <Text c={"dimmed"}>{item?.content}</Text>
              <List>
                {item.lists?.map((text) => (
                  <List.Item key={text}>
                    <Text c={"dimmed"}>{text}</Text>
                  </List.Item>
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
        <Title order={3} fw={400} sx={{ marginTop: "2rem" }}>
          YOU MAY AlSO LIKE
        </Title>
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
              <Box key={item.name} sx={{ width: "80vw" }}>
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
