import React from "react";
import { Flex, Box, Divider } from "@mantine/core";
import { useStyles } from "./HeaderStyle";
import { useState, useEffect } from "react";
import { gray_layout } from "@/type/const";
import CategoryItem from "./CategoryItem";
import { getNextCategory, getFirstCategory } from "@/fetchMethod/category";
import { useAppDispatch } from "@/store/hooks";
import { setPickedCategory } from "@/features/roleFeature/roleFeature";
import { ArrowLeft } from "tabler-icons-react";
function HeaderLinks({ closeDrawer }: { closeDrawer: () => void }) {
  const { classes, theme } = useStyles();
  const [firstCat, setFirstCat] = useState([]);
  const [secondCat, setSecondCat] = useState([]);
  const [firstAct, setFirstAct] = useState(-1);
  const [thirdCat, setThirdCat] = useState([]);
  const [secAct, setSecAct] = useState(-1);
  const [showIndex, setShowIndex] = useState(0);
  const dispatch = useAppDispatch();
  const firstCatOnClick = async (
    categoryId: string,
    index: number,
    name: string,
    level: number
  ) => {
    getNextCategory(categoryId).then((cats) => {
      setSecondCat(cats);
      setFirstAct(index);
      dispatch(setPickedCategory({ category: name, level, categoryId }));
      if (cats.length > 0) {
        setShowIndex(index + 1);
      }
    });
  };
  const secondCatOnClick = async (
    categoryId: string,
    index: number,
    name: string,
    level: number
  ) => {
    getNextCategory(categoryId).then((cats) => {
      setThirdCat(cats);
      setSecAct(index);
      dispatch(setPickedCategory({ category: name, level, categoryId }));
      if (cats.length > 0) {
        setShowIndex(index + 1);
      }
    });
  };
  useEffect(() => {
    getFirstCategory().then((category) => {
      setFirstCat(category);
    });
  }, []);
  return (
    <>
      <Divider />
      <Box
        sx={{ padding: "1rem 0 0 1rem" }}
        onClick={() => setShowIndex(showIndex - 1)}
      >
        <ArrowLeft strokeWidth={1.25} />
      </Box>

      <Flex>
        {0 === showIndex && (
          <Box
            sx={{
              marginTop: "1rem",
              width: 400,
              borderRight: `1px solid ${gray_layout}`,
              height: "80vh",
            }}
          >
            {firstCat.map(
              (
                cat: { name: string; categoryId: string; level: number },
                index
              ) => (
                <Box key={cat.categoryId}>
                  <CategoryItem
                    item={cat.name}
                    level={cat.level}
                    isAct={index === firstAct || firstAct === -1}
                    categoryId={cat.categoryId}
                    close={closeDrawer}
                    nextcat={() => {
                      firstCatOnClick(
                        cat.categoryId,
                        index,
                        cat.name,
                        cat.level
                      );
                    }}
                  />
                </Box>
              )
            )}
          </Box>
        )}
        {1 === showIndex && (
          <Box
            sx={{
              marginTop: "1rem",
              width: 400,
              borderRight: `1px solid ${gray_layout}`,
              height: "80vh",
            }}
          >
            {secondCat.map(
              (
                cat: {
                  name: string;
                  categoryId: string;
                  level: number;
                },
                index: number
              ) => (
                <Box key={cat.categoryId}>
                  <CategoryItem
                    item={cat.name}
                    level={cat.level}
                    isAct={index === secAct || secAct === -1}
                    categoryId={cat.categoryId}
                    close={closeDrawer}
                    nextcat={() => {
                      secondCatOnClick(
                        cat.categoryId,
                        index,
                        cat.name,
                        cat.level
                      );
                    }}
                  />
                </Box>
              )
            )}
          </Box>
        )}
        {2 === showIndex && (
          <Box
            sx={{
              marginTop: "1rem",
              width: 400,
              borderRight: `1px solid ${gray_layout}`,
              height: "80vh",
            }}
          >
            {thirdCat.map(
              (cat: { name: string; categoryId: string; level: number }) => (
                <Box key={cat.categoryId}>
                  <CategoryItem
                    item={cat.name}
                    level={cat.level}
                    isAct={true}
                    categoryId={cat.categoryId}
                    close={closeDrawer}
                    nextcat={() => {}}
                  />
                </Box>
              )
            )}
          </Box>
        )}
      </Flex>
    </>
  );
}

export default HeaderLinks;
