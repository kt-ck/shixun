import React from "react";
import {
  Notification,
  Code,
  Book,
  ChartPie3,
  Fingerprint,
  Coin,
  ChevronDown,
  ShoppingCart,
} from "tabler-icons-react";
import { UnstyledButton, Group, Text, ThemeIcon } from "@mantine/core";

import { useStyles } from "./HeaderStyle";
const mockdata = [
  {
    icon: Code,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: Coin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: Fingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: ChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: Notification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];
function HeaderLinks() {
  const { classes, theme } = useStyles();
  return (
    <>
      {mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
          <Group noWrap align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon size={22} color={theme.fn.primaryColor()} />
            </ThemeIcon>
            <div>
              <Text size="sm" weight={500}>
                {item.title}
              </Text>
              <Text size="xs" color="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      ))}
    </>
  );
}

export default HeaderLinks;
