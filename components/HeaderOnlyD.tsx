import React from "react";
import {
  Group,
  HoverCard,
  Center,
  Box,
  Text,
  Anchor,
  Divider,
  SimpleGrid,
  Button,
} from "@mantine/core";
import SearchBar from "./SearchBar";
import { useStyles } from "./HeaderStyle";
import { ChevronDown } from "tabler-icons-react";
import HeaderLinks from "./HeaderLinks";
import Link from "next/link";
import { ButtonToggle } from "./DarkMode";
function HeaderOnlyD() {
  const { classes, theme } = useStyles();
  return (
    <>
      <Group
        sx={{ height: "100%" }}
        spacing={0}
        className={classes.hiddenMobile}
      >
        <Link href="/" className={classes.link}>
          Home
        </Link>
        <HoverCard
          width={600}
          position="bottom"
          radius="md"
          shadow="md"
          withinPortal
        >
          <HoverCard.Target>
            <a href="#" className={classes.link}>
              <Center inline>
                <Box component="span" mr={5}>
                  Menu
                </Box>
                <ChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </a>
          </HoverCard.Target>

          <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
            <Group position="apart" px="md">
              <Text weight={500}>Menu</Text>
              <Anchor href="#" size="xs">
                View all
              </Anchor>
            </Group>

            <Divider
              my="sm"
              mx="-md"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <SimpleGrid cols={2} spacing={0}>
              <HeaderLinks />
            </SimpleGrid>

            <div className={classes.dropdownFooter}>
              <Group position="apart">
                <div>
                  <Text weight={500} size="sm">
                    Get started
                  </Text>
                  <Text size="xs" color="dimmed">
                    Their food sources have decreased, and their numbers
                  </Text>
                </div>
                <Button variant="default">Get started</Button>
              </Group>
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
        <SearchBar />
      </Group>
      <Box sx={{ marginLeft: "auto" }} className={classes.hiddenMobile}>
        <ButtonToggle />
      </Box>
    </>
  );
}

export default HeaderOnlyD;
