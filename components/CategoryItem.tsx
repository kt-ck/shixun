import React from "react";
import { HoverCard, Box, Text } from "@mantine/core";
import { useStyles } from "./HeaderStyle";
import { ArrowRight } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";
function CategoryItem({
  item,
  children,
}: {
  item: string;
  children: React.ReactElement;
}) {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <HoverCard width={280} shadow="md" position="right" zIndex={1000001}>
      <HoverCard.Target>
        <Box className={classes.categoryBtn} ref={ref}>
          <Text>{item}</Text>
          {hovered && (
            <ArrowRight
              style={{ marginLeft: "auto" }}
              size={23}
              strokeWidth={1.25}
            />
          )}
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>{children}</HoverCard.Dropdown>
    </HoverCard>
  );
}

export default CategoryItem;
