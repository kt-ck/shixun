import React from "react";
import { Breadcrumbs, Flex, createStyles, Anchor, Button } from "@mantine/core";
import { AdjustmentsHorizontal } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.fn.smallerThan("sm")]: {
      padding: "0.5rem",
      fontSize: "0.8rem",
    },
  },
  breadText: {
    color: theme.colorScheme === "light" ?  "black":"white" ,
  },
}));
function Navigator({
  catagory,
}: {
  catagory: { href: string; title: string }[];
}) {
  const { classes, theme } = useStyles();
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
        {catagory.map((item, index) => (
          <Anchor href={item.href} key={index} className={classes.breadText}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Button variant={"default"} sx={{ marginLeft: "auto" }} radius="xl">
      
        Filter  {" "} <AdjustmentsHorizontal />
      </Button>
    </Flex>
  );
}

export default Navigator;
