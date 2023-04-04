import React from "react";
import {
  Drawer,
  ScrollArea,
  Divider,
  UnstyledButton,
  Center,
  Box,
  Collapse,
  Group,
} from "@mantine/core";
import Link from "next/link";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import { ChevronDown } from "tabler-icons-react";
import { useStyles } from "./HeaderStyle";
import { useDisclosure } from "@mantine/hooks";
import HeaderLinks from "./HeaderLinks";
import { ButtonToggle } from "./DarkMode";
interface PropsType {
  drawerOpened: boolean;
  closeDrawer: () => void;
}

function HeaderOnlyM(props: PropsType) {
  const { classes, theme } = useStyles();

  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  return (
    <Drawer
      opened={props.drawerOpened}
      onClose={props.closeDrawer}
      size="100%"
      padding="md"
      title="Navigation"
      className={classes.hiddenDesktop}
      zIndex={1000000}
    >
      <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <Link href="/" className={classes.link}>
          Home
        </Link>
        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <ChevronDown size={16} color={theme.fn.primaryColor()} />
          </Center>
        </UnstyledButton>
        <UnstyledButton className={classes.link}>
          <SearchBar />
        </UnstyledButton>

        <Collapse in={linksOpened}>
          <HeaderLinks closeDrawer={props.closeDrawer} />
        </Collapse>
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <ButtonToggle />
        <Group position="center">
          <LoginButton btnTitle="Log in" btnVariant={undefined} close={props.closeDrawer}/>
        </Group>
      </ScrollArea>
    </Drawer>
  );
}

export default HeaderOnlyM;
