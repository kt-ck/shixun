import { createStyles, Box, ScrollArea, Group, Image } from "@mantine/core";
import { useState, useCallback, useEffect, useRef } from "react";
function SliderM({ images }: { images: string[] }) {
  const [start, setStart] = useState(0);
  const [index, setIndex] = useState(0);
  const useStyles = createStyles((theme) => ({
    scrollAreaSize: {
      width: "100vw",
      height: "15rem",
    },
    imageGallery: {
      width: `${images.length * 100}vw`,
      height: "15rem",
      gap: 0,
    },
  }));
  const { classes, theme } = useStyles();
  const viewport = useRef<HTMLDivElement>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    console.log("start");
    setStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const end = e.changedTouches[0].clientX;
    const direction = end - start;
    const flag = Math.abs(direction) > 30;
    console.log(index);
    if (
      flag &&
      ((direction < 0 && index < images.length - 1) ||
        (direction > 0 && index > 0))
    ) {
      const nextIndex = index + (direction < 0 ? 1 : -1);
      setIndex(nextIndex);
      console.log("index", nextIndex);
    } else {
      viewport.current?.scrollTo({
        left: screen.width * index,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    viewport.current?.scrollTo({
      left: screen.width * index,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <ScrollArea
      className={classes.scrollAreaSize}
      viewportRef={viewport}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Group className={classes.imageGallery}>
        {images.map((item) => (
          <Box
            className={classes.scrollAreaSize}
            key={item}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Image fit="cover" src={item} alt="" key={item} />
          </Box>
        ))}
      </Group>
    </ScrollArea>
  );
}

export default SliderM;
