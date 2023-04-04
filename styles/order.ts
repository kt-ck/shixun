import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "100vh",
    width: "100%",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  cart: {
    width: "60%",
    backgroundColor: theme.colorScheme === "light"?"#f6f5f3":theme.colors.gray[7],
    padding: "3rem 8rem",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
      padding: "1rem",
    },
  },
  pricePanel: {
    width: "40%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  header: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: "1rem",
    },
  },
  priceContent: {
    minWidth: "30rem",
    margin: "3rem auto",
    [theme.fn.smallerThan("sm")]: {
      minWidth: "18rem",
    },
  },
}));
