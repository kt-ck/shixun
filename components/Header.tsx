import { Header, Group, Box, Burger, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ShoppingCart } from "tabler-icons-react";
import { ButtonToggle } from "./DarkMode";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { useAppSelector } from "@/store/hooks";
import HeaderOnlyM from "./HeaderOnlyM";
import { useStyles } from "./HeaderStyle";
import HeaderOnlyD from "./HeaderOnlyD";
export function MyHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const userInfo = useAppSelector((state) => state.role.userInfo);

  return (
    <Box>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Box>
            <Image src="/logo.png" width={105} height={59} alt="logo" />
          </Box>
          <HeaderOnlyD />
          <Indicator
            inline
            label={userInfo.cart.length}
            size={16}
            disabled={userInfo.cart.length === 0}
            color="gray"
            withBorder
            className={classes.cartStyle}
          >
            <ShoppingCart size={30} strokeWidth={1} />
          </Indicator>

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
