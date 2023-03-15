import { ProductType } from "@/type/type";
import { Box, Text, Divider, Button, Select } from "@mantine/core";
import Bookmark from "./Bookmark";
import { useEffect, useState } from "react";
import { useStyles } from "./Product";
import { useAppDispatch } from "@/store/hooks";
import { addProduct, addWishlist} from "@/features/roleFeature/roleFeature";

function PricePanel({ product }: { product: ProductType }) {
  const data = product.sku.map((item, index) => ({
    value: String(index),
    label: `${item.color}/ ${item.size}`,
  }));
  const [value, setValue] = useState<string | null>("0");
  const [price, setPrice] = useState(product.defaultPrice);
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  const addToCart = () => {
    let i = Number(value);
    if (!isNaN(i)) {
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
  useEffect(() => {
    const i = Number(value);
    if (!isNaN(i)) {
      setPrice(product.sku[i].price);
    }
  }, [value, product.sku]);

  return (
    <Box sx={{ position: "relative", width: "50%" }}>
      <Box sx={{ position: "absolute", right: "1rem", top: "0" }} onClick={()=>{dispatch(addWishlist(product))}}>
        <Bookmark size={23} strokeWidth={1.25} />
      </Box>
      <Text fz="sm" fw={300}>
        {product.pid}
      </Text>
      <Box sx={{ padding: "0.5rem 0 1rem 0" }}>
        <Text fz="md" fw={500}>
          {product.name}
        </Text>
      </Box>

      <Text c={"dimmed"} fw={300}>
        ${price}
      </Text>
      <Box sx={{ paddingTop: "2rem" }}>
        <Divider my="sm" />
      </Box>

      <Select
        value={value}
        data={data}
        onChange={setValue}
        label="Pick one you prefer"
        placeholder="Pick one that you like"
      />
      <Box sx={{ width: "100%", marginTop: "3rem" }}>
        <Button
          variant={"default"}
          radius="xl"
          size={"xl"}
          sx={{ width: "80%", display: "block", margin: "auto" }}
          className={classes.defaultBorderColor}
          onClick={addToCart}
        >
          Add to bag
        </Button>
      </Box>
    </Box>
  );
}

export default PricePanel;
