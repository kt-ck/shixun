import { Header, Group, Box, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import LoginButton from "./LoginButton";
import HeaderOnlyM from "./HeaderOnlyM";
import { useStyles } from "./HeaderStyle";
import HeaderOnlyD from "./HeaderOnlyD";
import Link from "next/link";
import Cart from "./Cart";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import {
  setInfo,
  addProduct,
  clearCart,
  setProducts,
} from "@/features/roleFeature/roleFeature";
import { getCartList } from "@/fetchMethod/cart";
export function MyHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");
    if (token && username) {
      dispatch(
        setInfo({
          role: 1,
          name: username,
          phone: "",
          isLogIn: true,
        })
      );
      dispatch(clearCart());
      getCartList()
        .then((cartList) => {
          return cartList.map(
            (item: {
              productId: string;
              images: string[];
              num: number;
              name: string;
              price: number;
              color: string;
            }) => ({
              productId: item.productId,
              image: process.env.BaseUrl + item.images[0],
              count: item.num,
              name: item.name,
              price: item.price,
              color: "green",
              isUpload: true,
            })
          );
        })
        .then((formatCartList) => {
          console.log(formatCartList);
          dispatch(setProducts(formatCartList));
        });
    }
  }, []);
  return (
    <Box>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Box>
            <Image src="/logo.png" width={105} height={59} alt="logo" />
          </Box>
          <HeaderOnlyD />
          <Link href={"/wishlist"} className={classes.wishlist}>
            Wishlist
          </Link>
          <Cart />
          <Group className={classes.hiddenMobile}>
            <LoginButton btnTitle="Log in" btnVariant={undefined} />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <HeaderOnlyM drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    </Box>
  );
}
