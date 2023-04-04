import React from "react";

import { Box, createStyles } from "@mantine/core";

function IndexMediaShowBoxM({
  children,
  height,
  shadow
}: {
  children: React.ReactElement;
  height: number;
  shadow:boolean;
}) {
  const useStyles = createStyles((theme) => ({
    ImageContainerM: {
      height: height,
      [theme.fn.largerThan("sm")]: {
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
    <Box className={classes.ImageContainerM}>
      {children}
      {shadow && <Box className={classes.shadow}></Box>}
    </Box>
  );
}

export default React.memo(IndexMediaShowBoxM);
