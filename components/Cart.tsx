import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Indicator, Menu, Box } from "@mantine/core";
import { ShoppingCart } from "tabler-icons-react";
import { useStyles } from "./HeaderStyle";
import ProductInCart from "./ProductInCart";
function Cart() {
  const products = useAppSelector((state) => state.role.cart.products);
  const { classes, theme } = useStyles();
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Indicator
          inline
          label={products.length}
          size={16}
          disabled={products.length === 0}
          color="gray"
          withBorder
          className={classes.cartStyle}
        >
          <ShoppingCart size={30} strokeWidth={1} />
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        {products.map((item) => (
          <Menu.Label key={item.pid}>
            <ProductInCart product={item}/>
          </Menu.Label>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default Cart;
