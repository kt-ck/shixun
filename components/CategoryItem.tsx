import React from "react";
import { Box, Text } from "@mantine/core";
import { useStyles } from "./HeaderStyle";
import { ArrowRight } from "tabler-icons-react";
import { useHover } from "@mantine/hooks";
import { getProductsListFromCat } from "@/fetchMethod/products";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { setPickedCategory } from "@/features/roleFeature/roleFeature";
function CategoryItem({
  item,
  level,
  isAct,
  categoryId,
  close,
  nextcat,
}: {
  item: string;
  level: number;
  isAct: boolean;
  categoryId: string;
  close: () => void;
  nextcat: () => void;
}) {
  const { classes, theme } = useStyles();
  const { hovered, ref } = useHover();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gotoProductList = (categoryId: string, level: number) => {
    dispatch(setPickedCategory({ category: item, level, categoryId }));
    router.push({ pathname: "/ProductList", query: { categoryId, level } });
    close();
  };
  return (
    <Box className={classes.categoryBtn} ref={ref}>
      <Text
        c={isAct ? theme.colors.gray[9] : theme.colors.gray[5]}
        sx={{ borderBottom: hovered ? "1px solid black" : "none" }}
        onClick={() => gotoProductList(categoryId, level)}
      >
        {item}
      </Text>
      {hovered && level < 3 && (
        <ArrowRight
          style={{ marginLeft: "auto" }}
          size={23}
          strokeWidth={1.25}
          onClick={nextcat}
        />
      )}
    </Box>
  );
}

export default CategoryItem;
