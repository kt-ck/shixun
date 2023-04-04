import React, { use } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Breadcrumbs,
  Flex,
  createStyles,
  Anchor,
  Button,
  Drawer,
  Title,
} from "@mantine/core";
import { AdjustmentsHorizontal } from "tabler-icons-react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
const useStyles = createStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.fn.smallerThan("sm")]: {
      padding: "0.5rem",
      fontSize: "0.8rem",
    },
  },
  breadText: {
    color: theme.colorScheme === "light" ? "black" : "white",
  },
}));
function Navigator({ level }: { level: number }) {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const pickedCat = useAppSelector((state) => state.role.pickedCategory);
  return (
    <Flex
      gap={"md"}
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      className={classes.container}
    >
      <Breadcrumbs>
        {pickedCat.slice(0, level).map((item, index) => (
          <Anchor
            key={item.categoryId}
            className={classes.breadText}
            onClick={() =>
              router.push({
                pathname: "/ProductList",
                query: {
                  categoryId: item.categoryId,
                  level: item.level,
                },
              })
            }
          >
            {item.name}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Button
        variant={"default"}
        sx={{ marginLeft: "auto" }}
        radius="xl"
        onClick={open}
      >
        Filter <AdjustmentsHorizontal size={23} strokeWidth={1.25} />
      </Button>
      <Drawer.Root opened={opened} onClose={close} position="right">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Title order={2}>Filter By</Title>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Flex>
  );
}

export default Navigator;
