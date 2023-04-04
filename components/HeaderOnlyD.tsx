import React from "react";
import { Group, Box, Drawer, Flex } from "@mantine/core";
import SearchBar from "./SearchBar";
import { useStyles } from "./HeaderStyle";
import { ChevronDown } from "tabler-icons-react";
import Link from "next/link";
import { ButtonToggle } from "./DarkMode";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getFirstCategory, getNextCategory } from "@/fetchMethod/category";
import { gray_layout } from "@/type/const";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CategoryItem from "./CategoryItem";
import { setPickedCategory } from "@/features/roleFeature/roleFeature";
function HeaderOnlyD() {
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [firstCat, setFirstCat] = useState([]);
  const [secondCat, setSecondCat] = useState([]);
  const [firstAct, setFirstAct] = useState(-1);
  const [thirdCat, setThirdCat] = useState([]);
  const [secShow, setSecShow] = useState(false);
  const [secAct, setSecAct] = useState(-1);
  const [trdShow, setTrdShow] = useState(false);
  const [size, setSize] = useState(400);
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
        setSize(1000);
        setSecShow(true);
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
        setSize(1250);
        setTrdShow(true);
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
      <Group
        sx={{ height: "100%" }}
        spacing={0}
        className={classes.hiddenMobile}
      >
        <Link href="/" className={classes.link}>
          Home
        </Link>
        <Drawer
          opened={opened}
          onClose={() => {
            close();
            setSecondCat([]);
            setSecShow(false);
            setThirdCat([]);
            setTrdShow(false);
            setSize(400);
            setFirstAct(-1);
            setSecAct(-1);
          }}
          title="Category"
          padding={"2rem 1rem 0 2rem"}
          size={size}
        >
          <Flex>
            <Box
              sx={{
                marginTop: "3rem",
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
                      close={close}
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
            {secShow && (
              <Box
                sx={{
                  marginTop: "3rem",
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
                        close={close}
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
            {trdShow && (
              <Box
                sx={{
                  marginTop: "3rem",
                  width: 400,
                  borderRight: `1px solid ${gray_layout}`,
                  height: "80vh",
                }}
              >
                {thirdCat.map(
                  (cat: {
                    name: string;
                    categoryId: string;
                    level: number;
                  }) => (
                    <Box key={cat.categoryId}>
                      <CategoryItem
                        item={cat.name}
                        level={cat.level}
                        isAct={true}
                        categoryId={cat.categoryId}
                        close={close}
                        nextcat={() => {}}
                      />
                    </Box>
                  )
                )}
              </Box>
            )}
          </Flex>
        </Drawer>
        <Link href="" className={classes.link} onClick={open}>
          Menu <ChevronDown size={23} strokeWidth={1.25} />
        </Link>
        <SearchBar />
      </Group>
      <Box sx={{ marginLeft: "auto" }} className={classes.hiddenMobile}>
        <ButtonToggle />
      </Box>
    </>
  );
}

export default HeaderOnlyD;
