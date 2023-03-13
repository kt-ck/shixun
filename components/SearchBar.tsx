import React from "react";
import {
  Group,
  Text,
  Drawer,
  Input,
  Box,
  Divider,
  createStyles,
} from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  searchClose: {
    [theme.fn.largerThan("sm")]: {
      marginRight: "5rem",
    },
  },
  searchInput: {
    width: "100%",
    display: "block",

    [theme.fn.largerThan("sm")]: {
      width: "50%",
      margin: "1rem auto",
    },
  },
}));
function SearchBar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
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
              />
            </Box>
            <Drawer.CloseButton size={"md"} className={classes.searchClose} />
          </Drawer.Header>
          <Divider my={"sm"} />
          <Drawer.Body>Drawer content</Drawer.Body>
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
