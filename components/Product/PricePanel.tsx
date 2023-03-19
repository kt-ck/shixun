import { ProductType } from "@/type/type";
import { Box, Text, Divider, Button, Group } from "@mantine/core";
import Bookmark from "./Bookmark";
import { useStyles } from "./Product";
import { useAppDispatch } from "@/store/hooks";
import {
  addProduct,
  addWishlist,
  setCartStale,
} from "@/features/roleFeature/roleFeature";
import { setCart } from "@/features/layoutFeature/layoutSlice";
import { addProductToCart } from "@/fetchMethod/cart";
function PricePanel({
  product,
  status,
}: {
  product: ProductType;
  status: number;
}) {
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  const addToCart = async () => {
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
      })
    );
    dispatch(setCartStale(true));
  };

  return (
    <Box sx={{ position: "relative", width: "50%" }}>
      <Box
        sx={{ position: "absolute", right: "1rem", top: "0" }}
        onClick={() => {
          dispatch(addWishlist(product));
        }}
      >
        <Bookmark size={23} strokeWidth={1.25} />
      </Box>
      <Text fz="sm" fw={300}>
        {product.productId}
      </Text>
      <Box sx={{ padding: "0.5rem 0 1rem 0" }}>
        <Text fz="lg" fw={500}>
          {product.name}
        </Text>
      </Box>
      <Group>
        <Text fz={"md"} c={theme.colors.gray[8]} fw={400}>
          Color
        </Text>
        <Box
          sx={{
            marginLeft: "auto",
            width: "2rem",
            height: "2rem",
            backgroundColor: product.color,
            borderRadius: "50%",
          }}
        ></Box>
      </Group>
      <Group sx={{ marginTop: "0.4rem" }}>
        <Text fz={"md"} c={theme.colors.gray[8]} fw={400}>
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

      <Box sx={{ paddingTop: "2rem" }}>
        <Divider my="sm" />
      </Box>

      <Box sx={{ width: "100%", marginTop: "3rem" }}>
        <Button
          variant={"default"}
          radius="xl"
          size={"xl"}
          sx={{ width: "80%", display: "block", margin: "auto" }}
          className={classes.defaultBorderColor}
          onClick={addToCart}
          // disabled={status === 1 || status === 2}
        >
          {status !== 1
            ? status !== 2
              ? "Add to bag"
              : "Out of stock"
            : "Sold out"}
        </Button>
      </Box>
    </Box>
  );
}

export default PricePanel;
