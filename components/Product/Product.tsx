import React from "react";
import { createStyles, Box } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
function Product() {
  const { classes, theme } = useStyles();
  return <Box className={classes.container}>product</Box>;
}

export default Product;
