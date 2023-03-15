import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor:
      theme.colorScheme === "light" ? "#f6f5f3" : theme.colors.gray[7],
    padding: "6rem 10rem",
    display: "flex",
    flexDirection: "column"
  },
}));
