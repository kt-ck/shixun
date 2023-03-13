import React from "react";
import { Cart as CartType } from "@/type/type";
import { Group, Image, Box, Text } from "@mantine/core";
import { X } from "tabler-icons-react";
import { removeProduct } from "@/features/roleFeature/roleFeature";
import { useAppDispatch } from "@/store/hooks";
function ProductInCart({ product }: { product: CartType }) {
  const dispatch = useAppDispatch();
  return (
    <Group sx={{gap: "1rem"}}>
      <Image src={product.image} width={"3rem"} height={"3rem"} />
      <Box sx={{minWidth: "8rem"}}>
        <Text fw={400}>{product.name}</Text>
        <Text fw={300}>{product.sku}</Text>
        <Text fw = {300}>${product.price}</Text>
      </Box>
      <Box>
        <Text>{product.count}</Text>
      </Box>
      <Box
        onClick={() => dispatch(removeProduct(product))}
        sx={{ cursor: "pointer" }}
      >
        <X size={23} strokeWidth={1.25} />
      </Box>
    </Group>
  );
}

export default ProductInCart;
