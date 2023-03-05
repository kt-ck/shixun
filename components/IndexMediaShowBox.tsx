import React from "react";
import { Box, createStyles } from "@mantine/core";

function IndexMediaShowBox({
  children,
  height,
}: {
  children: React.ReactElement;
  height: number;
}) {
  const useStyles = createStyles((theme) => ({
    ImageContainer: {
      height,
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    shadow: {
      position: "absolute",
      bottom: "0",
      height,
      width: "100%",
      background:
        "linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 40%, rgba(0,0,0,0))",
    },
  }));
  const { classes, theme } = useStyles();

  return (
    <Box className={classes.ImageContainer}>
      {children} <Box className={classes.shadow}></Box>
    </Box>
  );
}

export default React.memo(IndexMediaShowBox);
