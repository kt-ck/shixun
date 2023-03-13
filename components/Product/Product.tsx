import React from "react";
import {
  createStyles,
  Box,
  Stack,
  Image,
  Text,
  Divider,
  Spoiler,
  List,
  SimpleGrid,
  Group,
  Title,
} from "@mantine/core";
import { ProductType } from "@/type/type";
import PricePanel from "./PricePanel";
import TagCard from "./TagCard";
import RecommandProduct from "@/components/ProductList/Product";
import ServiceCard from "./ServiceCard";
import { services } from "./ProductM";
export const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    width: "100%",
  },
  defaultBorderColor: {
    borderColor: theme.colorScheme === "light" ? "black" : "white",
  },
  detailBlock: {
    margin: "0.3rem 0",
  },
}));
function Product({ product }: { product: ProductType }) {
  const { classes, theme } = useStyles();
  return (
    <Box className={classes.container}>
      <Box sx={{ display: "flex", flexWrap: "nowrap", flex: 1, width: "100%" }}>
        <Stack sx={{ gap: 0, width: "50%" }}>
          {product.images.map((item) => (
            <Box key={item}>
              <Image src={item} alt="" />
            </Box>
          ))}
        </Stack>
        <Box sx={{ display: "block", width: "50%" }}>
          <Box
            sx={{
              position: "sticky",
              top: "30%",
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5rem",
            }}
          >
            <PricePanel product={product} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", padding: "5rem" }}>
        <Box sx={{ width: "60%" }}>
          <Text c={"dimmed"} sx={{ lineHeight: "2rem" }}>
            {product.description}
          </Text>
        </Box>
        <Box sx={{ width: "100%", marginTop: "3rem" }}>
          <Box sx={{ width: "60%" }}>
            <Title order={3} fw={500}>Product details</Title>
            <Divider my="sm" />
            <Spoiler
              maxHeight={60}
              showLabel="Read More"
              hideLabel="Read Less"
              transitionDuration={1000}
              sx={{ marginTop: "2rem" }}
            >
              {product.details.map((item, index) => (
                <Box key={index} className={classes.detailBlock}>
                  <Text c={"dimmed"}>{item?.content}</Text>
                  <List>
                    {item.lists?.map((text) => (
                      <List.Item key={text}>
                        <Text c={"dimmed"}>{text}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Box>
              ))}
            </Spoiler>
          </Box>
          <Box sx={{ marginTop: "2.5rem" }}>
            <TagCard product={product} />
          </Box>
          <Box sx={{ marginTop: "7rem" }}>
            <Title order={3} fw={500}>YOU MAY ALSO LIKE</Title>

            <SimpleGrid cols={3} sx={{marginTop: "2rem"}}>
              {product.recommand.map((item) => (
                <RecommandProduct product={item} key={item.name} />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Divider my={"sm"} />
      <Group position="center">
        {services.map((item, index) => (
          <ServiceCard service={item} key={item.title} index={index} />
        ))}
      </Group>
    </Box>
  );
}

export default Product;
