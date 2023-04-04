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
        {/* <Text c={"dimmed"}>{product.tags[index].description}</Text> */}
        <Text c={"dimmed"}>
          Your shoes are crafted from two or more of the materials below: -
          Fabric: clean with a brush or a soft, slightly damp cloth. - Suede
          leather or nubuck: to maintain the velvety look of the leather, clean
          it gently with a soft brush. Surface stains may be removed with a
          crepe brush. - Smooth or grained leather: clean with a soft, damp
          cloth. When the leather is dry, apply a quality colorless cream and
          polish in circular motions with a soft cloth. - Glazed leather: clean
          with a soft, slightly damp cloth, then polish with a soft, dry cloth.
          - Metallic leather: clean with a soft, dry cloth. - Exotic leather:
          clean with a soft, dry cloth, then apply a quality colorless cream,
          working very gently in the direction of the scales, to nourish the
          leather and maintain its suppleness. Keep your shoes in the felt pouch
          provided and store them in a cool, dry, well-ventilated place. Avoid
          contact with water, any substance containing alcohol (perfumes,
          solvents etc.) or oil (makeup), and abrasive products in general. It
          is important to allow your sneakers to air manually, and to this end
          they possess a removable insock. If your sneakers become wet, simply
          remove the insock and leave them to dry in a cool, well-ventilated
          place. This will ensure additional comfort when they are next worn.
        </Text>
      </Drawer>

      <Group>
        {product.tags.map((item, index) => (
          <a
            key={item.title}
            onClick={() => {
              setIndex(index);
              open();
            }}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Text>{item.title}</Text>
          </a>
        ))}
      </Group>
    </>
  );
}

export default TagCard;
