import React from "react";
import { Box, createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  selected: {
    borderBottom:
      theme.colorScheme === "light" ? "1px solid black" : "1px solid white",
  },
}));
function ColorList({ colors }: { colors: string[] }) {
  const [selectIndex, setSelectIndex] = useState(0);
  const { classes, theme } = useStyles();
  return (
    <>
      {colors.map((item, index) => (
        <Box
          sx={{paddingBottom:"0.4rem",cursor: "pointer", }}
          className={index === selectIndex ? classes.selected : undefined}
          onClick={() => setSelectIndex(index)}
          key={item}
        >
          <Box
            sx={{
              width: "1rem",
              borderRadius: "50%",
              height: "1rem",
              backgroundColor: item,
            }}
          ></Box>
        </Box>
      ))}
    </>
  );
}

export default ColorList;
