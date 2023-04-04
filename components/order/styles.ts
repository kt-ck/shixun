import { createStyles } from "@mantine/core";
import { gray_layout } from "@/type/const";
export const useStyles = createStyles((theme) => ({
  flexbox: {
    height: "25rem",
    alignItems: "center",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      height: "44rem",
    },
  },
  img: {
    width: "45%",
    padding: "0.5rem",
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  content: {
    width: "55%",
    height: "100%",
    borderLeft: `1px solid ${gray_layout}`,
    flexDirection: "column",
    [theme.fn.smallerThan("md")]: {
      width: "100%",
      borderLeft: 0,
    },
  },
  contentBlock: {
    padding: "2rem",
    [theme.fn.smallerThan("md")]: {
      padding: "1rem"
    },
  },
}));
