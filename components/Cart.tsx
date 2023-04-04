import React from "react";
import { Indicator, Menu, Button } from "@mantine/core";
import { ShoppingCart } from "tabler-icons-react";
import { useStyles } from "./HeaderStyle";
import ProductInCart from "./ProductInCart";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCart, setCart } from "@/features/layoutFeature/layoutSlice";
import { useEffect } from "react";
import {
  selectCart as selectCartData,
  setCartStale,
  setProduct,
} from "@/features/roleFeature/roleFeature";
function Cart() {
  const cart = useAppSelector(selectCartData);
  const opened = useAppSelector(selectCart);
  const { classes, theme } = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Menu
      shadow="md"
      opened={opened}
      onChange={(open) => {
        dispatch(setCart(open));
      }}
    >
      <Menu.Target>
        <Indicator
          inline
          label={cart.products.length}
          size={16}
          disabled={cart.products.length === 0}
          color="gray"
          withBorder
          className={classes.cartStyle}
        >
          <ShoppingCart size={30} strokeWidth={1} />
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        {cart.products.map((item) => (
          <Menu.Label key={item.productId}>
            <ProductInCart product={item} />
          </Menu.Label>
        ))}
        <Menu.Label sx={{ minWidth: "13rem" }}>
          <Button
            variant={"default"}
            radius={"md"}
            fullWidth
            onClick={() => {
              router.push("/order/Confirm");
              dispatch(setCart(false));
            }}
            disabled={cart.products.length === 0}
          >
            Pay
          </Button>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Cart;
