import React from "react";
import { useState, useEffect } from "react";
import { Spade } from "tabler-icons-react";
import { createStyles, Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearWishlist,
  selectWishList,
} from "@/features/roleFeature/roleFeature";
import { addWishlist } from "@/features/roleFeature/roleFeature";
import { ProductType } from "@/type/type";
import {
  addWishlist as addWishlistRequest,
  delWishlist,
} from "@/fetchMethod/wishlist";

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
  product,
}: {
  size: number;
  strokeWidth: number;
  product: ProductType;
}) {
  const { classes, theme } = useStyles();
  const [bookmarkSelected, setBookmarkSelected] = useState(false);
  const wishlist = useAppSelector(selectWishList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    wishlist.products.forEach((item) => {
      if (item.productId === product.productId) {
        setBookmarkSelected(true);
      }
    });
  }, [wishlist.products]);

  const toggleBookmark = () => {
    setBookmarkSelected((bookmarkSelected) => !bookmarkSelected);
    if (!bookmarkSelected) {
      dispatch(addWishlist(product));
      addWishlistRequest(product.productId, dispatch);
    } else {
      dispatch(clearWishlist());
      delWishlist(product.productId, dispatch);
    }
  };
  return (
    <Box onClick={toggleBookmark} sx={{ cursor: "pointer" }}>
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
