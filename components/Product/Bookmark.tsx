import React from "react";
import { useState } from "react";
import { Spade } from "tabler-icons-react";
import { createStyles, Box } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  bookmark: {
    color: theme.colorScheme === "light" ? "black" : "yellow",
  },

  bookmarkSelected: {
    color: theme.colorScheme === "light" ? "black" : "yellow",
    fill: theme.colorScheme === "light" ? "black" : "yellow",
  },
}));
function Bookmark({
  size,
  strokeWidth,
}: {
  size: number;
  strokeWidth: number;
}) {
  const { classes, theme } = useStyles();
  const [bookmarkSelected, setBookmarkSelected] = useState(false);
  const toggleBookmark = () => {
    setBookmarkSelected((bookmarkSelected) => !bookmarkSelected);
  };
  return (
    <Box onClick={toggleBookmark}>
      {bookmarkSelected ? (
        <Spade
          size={size}
          strokeWidth={strokeWidth}
          className={classes.bookmarkSelected}
        />
      ) : (
        <Spade
          size={size}
          strokeWidth={strokeWidth}
          className={classes.bookmark}
        />
      )}
    </Box>
  );
}

export default Bookmark;
