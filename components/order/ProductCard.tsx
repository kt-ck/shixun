import React from "react";
import {
  Paper,
  Group,
  Box,
  Image,
  Text,
  Divider,
  Title,
  Flex,
} from "@mantine/core";
import { Cart } from "@/type/type";
import { sku_label } from "@/type/const";
import { useState, useEffect } from "react";
import Counter from "./Counter";
import { gray_layout } from "@/type/const";
import { Eye, X } from "tabler-icons-react";
import { useAppDispatch } from "@/store/hooks";
import { setProduct, removeProduct } from "@/features/roleFeature/roleFeature";
import { useStyles } from "./styles";
function ProductCard({ item }: { item: Cart }) {
  const [count, setCount] = useState(item.count);
  const dispatcher = useAppDispatch();
  const { classes } = useStyles();
  useEffect(() => {
    dispatcher(setProduct({ ...item, count }));
  }, [count]);
  return (
    <Paper shadow="xs">
      <Flex className={classes.flexbox}>
        <Box className={classes.img}>
          <Image src={item.image} width={"100%"} alt="" fit="cover" />
        </Box>
        <Flex className={classes.content}>
          <Box className={classes.contentBlock}>
            <Text size={"md"}>{item.pid}</Text>
            <Title order={3} fw={500}>
              {item.name}
            </Title>
          </Box>

          <Divider />
          <Box className={classes.contentBlock}>
            {item.sku.split("/").map((item, index) => {
              if (item) {
                return (
                  <Group>
                    <Text tt="capitalize">{sku_label[index]}</Text>
                    <Text tt="capitalize" fw={300} sx={{ marginLeft: "auto" }}>
                      {item}
                    </Text>
                  </Group>
                );
              }
            })}
          </Box>

          <Group sx={{ marginTop: "auto", padding: "2rem" }}>
            <Counter count={count} setCount={setCount} />
            <Text fw={600} size={"lg"} sx={{ marginLeft: "auto" }}>
              ${item.price}
            </Text>
          </Group>

          <Divider />
          <Group sx={{ gap: 0 }}>
            <Group
              position="center"
              sx={{
                width: "50%",
                height: "3rem",
                textAlign: "center",
                borderRight: `1px solid ${gray_layout}`,
                cursor: "pointer",
              }}
            >
              <Group>
                <Eye size={"1rem"} strokeWidth={1.25} />
                <Text>View Details</Text>
              </Group>
            </Group>
            <Group
              position="center"
              sx={{
                width: "50%",
                height: "3rem",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => dispatcher(removeProduct(item))}
            >
              <X size={"1rem"} strokeWidth={1.25} />
              <Text>Remove</Text>
            </Group>
          </Group>
        </Flex>
      </Flex>
    </Paper>
  );
}

export default ProductCard;
