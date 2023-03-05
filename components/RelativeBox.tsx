import { Box } from "@mantine/core";
import React from "react";
function RelativeBox({ children }: { children: React.ReactElement }) {
  return <Box sx={{ position: "relative" }}>{children}</Box>;
}

export default RelativeBox;
