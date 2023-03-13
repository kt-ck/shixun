import React, { useState } from "react";
import { ProductType } from "@/type/type";
import { Drawer, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function TagCard({ product }: { product: ProductType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={product.tags[index].title}
        position="right"
      >
        <Text c={"dimmed"}>{product.tags[index].description}</Text>
      </Drawer>

      <Group>
        {product.tags.map((item, index) => (
          <a
            key={item.title}
            onClick={() => {
              setIndex(index);
              open();
            }}
            style={{textDecoration: "underline", cursor: "pointer"}}
          >
           <Text>{item.title}</Text>
          </a>
        ))}
      </Group>
    </>
  );
}

export default TagCard;
