import { ProductType } from "@/type/type";
import { Box, Text, Divider, Button, Select } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
function PricePanel({ product }: { product: ProductType }) {
  const data = product.sku.map((item, index) => ({
    value: String(index),
    label: `${item.color}/ ${item.size}`,
  }));
  const [value, setValue] = useState<string | null>("0");
  const [price, setPrice] = useState(product.defaultPrice);
  useEffect(() => {
    const i = Number(value);
    if (!isNaN(i)) {
      setPrice(product.sku[i].price);
    }
  }, [value]);
  return (
    <Box sx={{ position: "relative", width: "50%" }}>
      <Text fz="sm">{product.pid}</Text>
      <Box sx={{ padding: "0.5rem 0 1rem 0" }}>
        <Text fz="md" fw={"bold"}>
          {product.name}
        </Text>
      </Box>

      <Text>{price}</Text>
      <Box sx={{ paddingTop: "2rem" }}>
        <Divider my="sm" />
      </Box>

      <Button variant={"default"} radius="xl" size={"xl"} sx={{ width: "80%", margin : "auto" }}>
        Add to bag
      </Button>
      <Select
        value={value}
        data={data}
        onChange={setValue}
        label="Pick one you prefer"
        placeholder="Pick one that you like"
      />
    </Box>
  );
}

export default PricePanel;
