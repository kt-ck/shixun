import React from "react";
import { Group, Box, Drawer } from "@mantine/core";
import SearchBar from "./SearchBar";
import { useStyles } from "./HeaderStyle";
import { ChevronDown } from "tabler-icons-react";
import Link from "next/link";
import { ButtonToggle } from "./DarkMode";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
function HeaderOnlyD() {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchAllCatogory = async () => {
      const res = await fetch(process.env.Hostname + "/category/list/");
      const res_json = res.json();
      console.log(res_json);
    };
    console.log("here");
    // fetchAllCatogory();
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
        <Drawer opened={opened} onClose={close} title="Category">
          some thing
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
