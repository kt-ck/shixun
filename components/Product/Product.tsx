import React from "react";
import { createStyles, Box, Stack, Image } from "@mantine/core";
import { ProductType } from "@/type/type";
import PricePanel from "./PricePanel";
const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
function Product({ product }: { product: ProductType }) {
  const { classes, theme } = useStyles();
  return (
    <Box className={classes.container}>
      <Box sx={{ position: "relative" }}>
        <Stack sx={{ width: "50%", gap: 0 }}>
          {product.images.map((item) => (
            <Box>
              <Image src={item} alt="" />
            </Box>
          ))}
        </Stack>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PricePanel product={product}/>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
