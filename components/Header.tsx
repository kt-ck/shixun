import { Header, Group, Box, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import LoginButton from "./LoginButton";
import HeaderOnlyM from "./HeaderOnlyM";
import { useStyles } from "./HeaderStyle";
import HeaderOnlyD from "./HeaderOnlyD";
import Cart from "./Cart";
export function MyHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Box>
            <Image src="/logo.png" width={105} height={59} alt="logo" />
          </Box>
          <HeaderOnlyD />

          <Cart />
          <Group className={classes.hiddenMobile}>
            <LoginButton btnTitle="Log in" btnVariant={undefined} />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <HeaderOnlyM drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    </Box>
  );
}
