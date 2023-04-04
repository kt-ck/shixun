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
import { addProduct, setCartStale } from "@/features/roleFeature/roleFeature";
import { addProductToCart } from "@/fetchMethod/cart";
import { setCart } from "@/features/layoutFeature/layoutSlice";
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
    title: "PayMent Information",
    icon: AlignBoxBottomLeft,
    desc: `Payments can be made by credit or debit card, or bank transfer for purchases made over the phone through Client Services. Accepted credit cards are Visa, American Express and Mastercard.

    When placing an order, your billing address must correspond to the address of your credit card, or we will not be able to process your order.
    
    All transactions are secured. The Louis Vuitton website is provided with an SSL encryption system to protect personal and payment data.
    
    If you require further information or assistance, please contact Client Services.`,
  },
  {
    title: "Delivery Detail",
    icon: Car,
    desc: `Premium Delivery Service:
    Receive your order in a Louis Vuitton shopping bag, hand-delivered by one of our delivery ambassadors to your doorstep.
    
    Same Day: Order before 12 pm for delivery between 4 – 9pm
    Next Day: Order before 5pm (Four timeslots: 9am – 12pm, 12 – 3pm, 3 – 6pm, 6 – 9pm)
    
    Standard Shipping: estimated 7 – 14 working days
    
    Collect in Store – Ngee Ann City, Ion or Marina Bay Sands store: Order is available for collection 1 day after your order is confirmed. You will receive a SMS once your order is ready for collection`,
  },
  {
    title: "Exchange & Return",
    icon: Recycle,
    desc: ` All customised items (hot stamped, engraving, My LV Heritage, My LV World Tour, etc.) are final sale and not exchangeable.
    - Watches and Fine Jewellery may be exchanged for another product in the same category. When returning Watches or Fine Jewellery please include the product in its original packaging, instructional leaflet, warranty and product certificates such as COSC and GIA (when applicable), along with the invoice or gift receipt.
    - Fragrances are flammable goods and are subject to laws and regulations that regulate their transportation. Please contact our Client Services Team before returning any fragrance to help you with return or exchange of your Louis Vuitton fragrance. All returns and exchanges of fragrances for change of mind must be in their original packaging (white box wrapped in cellophane), unopened and in sealed condition. If you do not return your fragrance purchases in accordance with our instructions you risk your purchases being confiscated by the state, federal and international authorities that govern the safe and legal transportation of fragrances`,
  },
];

function ProductM({ product }: { product: ProductType }) {
  const { classes, theme } = useStyles();
  const [y, setY] = useState<number | undefined>(0);
  const [showBox, setShowBox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const galref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
    setY(ref.current?.offsetTop);
    window.addEventListener("scroll", changeZIndex);
    return () => {
      window.removeEventListener("scroll", changeZIndex);
    };
  }, []);

  const addToCart = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    addProductToCart(product.productId);
    dispatch(setCart(true));
    dispatch(
      addProduct({
        productId: product.productId,
        image: product.images[0],
        count: 1,
        name: product.name,
        price: product.price,
        color: product.color,
        isUpload: false,
        productNo: product.productNo,
      })
    );
    dispatch(setCartStale(true));
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
                <Text>${product.price}</Text>
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
            {product.productNo}
          </Text>
          <Box sx={{ marginLeft: "auto" }}>
            <Bookmark size={20} strokeWidth={1.25} product={product} />
          </Box>
        </Flex>

        <Text size={"md"} fw={400}>
          {product.name}
        </Text>

        <Group sx={{ marginTop: "-0.5rem" }}>
          <Text fz={"sm"} c={theme.colors.gray[8]} fw={400}>
            Color
          </Text>
          <Box
            sx={{
              marginLeft: "auto",
              width: "1rem",
              height: "1rem",
              backgroundColor: product.color,
              borderRadius: "50%",
            }}
          ></Box>
        </Group>
        <Group sx={{ marginTop: "-0.5rem" }}>
          <Text fz={"sm"} c={theme.colors.gray[8]} fw={400}>
            Price
          </Text>
          <Text
            fz={"md"}
            c={theme.colors.gray[8]}
            fw={400}
            sx={{ marginLeft: "auto" }}
          >
            ${product.price}
          </Text>
        </Group>

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
            {product.detail}
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
