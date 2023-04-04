import React from "react";
import {
  Group,
  Text,
  Drawer,
  Input,
  Box,
  Divider,
  createStyles,
  Button,
  Image,
  Title,
} from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { setSearchName } from "@/features/roleFeature/roleFeature";
function getMultipleRandom(arr: string[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const imageList = [
  process.env.BaseUrl +
    "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Attrape-R%C3%AAves/1.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Attrape-R%C3%AAves/2.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Rose%20des%20Vents/2.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Travel%20Spray%20Spell%20on%20You/1.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Travel%20Spray%20Spell%20on%20You/2.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Christopher/Christopher%20MM/2.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Christopher/Christopher%20MM/4.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Christopher/Christopher%20Slim%20Backpack/4.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Christopher/Christopher%20Wearable%20Wallet/2.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Christopher/Christopher%20Wearable%20Wallet/5.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Exotic%20Leather%20Bags/Avenue%20Slingbag/1.webp",
  process.env.BaseUrl +
    "/images/VL%20bags/MEN/Exotic%20Leather%20Bags/Avenue%20Slingbag/3.webp",
];
const useStyles = createStyles((theme) => ({
  searchClose: {
    [theme.fn.largerThan("sm")]: {
      marginRight: "5rem",
    },
  },
  searchInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.fn.largerThan("sm")]: {
      width: "50%",
      margin: "1rem auto",
    },
  },
  input: {
    width: "50rem",
    [theme.fn.smallerThan("sm")]: {
      width: "12rem",
    },
  },
}));
function SearchBar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const { classes, theme } = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        position={"top"}
        zIndex={1000000}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Box className={classes.searchInput}>
              <Input
                icon={<Search size={23} strokeWidth={1.25} />}
                variant="filled"
                placeholder="Search for ..."
                size="lg"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={classes.input}
              />
              <Button
                color={"dark"}
                onClick={() => {
                  dispatch(setSearchName(value));
                  router.push({
                    pathname: "ProductList",
                    query: {
                      categoryId: "-1",
                      level: 0,
                    },
                  });
                  close()
                }}
                sx={{ marginLeft: "1rem" }}
              >
                Search
              </Button>
            </Box>
            <Drawer.CloseButton size={"md"} className={classes.searchClose} />
          </Drawer.Header>
          <Divider my={"sm"} />
          <Drawer.Body>
            <Title order={3} fw={400}>
              YOU MAY ALSO LIKE
            </Title>
            <Group position="center" sx={{ gap: "1rem", margin: "1rem" }}>
              {getMultipleRandom(imageList, 4).map((item) => {
                return (
                  <Box
                    key={item}
                    sx={{
                      position: "relative",
                      width: "15rem",
                      height: "15rem",
                      cursor: "pointer",
                    }}
                  >
                    <Image src={item} alt="" />
                    <Box
                      sx={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%,rgba(0,0,0,0.2))",
                        zIndex: 100,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    ></Box>
                  </Box>
                );
              })}
            </Group>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Group onClick={open} sx={{ cursor: "pointer" }}>
        <Search size={23} strokeWidth={1.25} />
        <Text>Search</Text>
      </Group>
    </>
  );
}

export default SearchBar;
