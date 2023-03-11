import React from "react";
import { Bleach, Icon } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Box, Flex, Text, createStyles } from "@mantine/core";
interface Service {
  title: string;
  icon: Icon;
  desc: string;
}

const useStyles = createStyles((theme) => ({}));
function ServiceCardM({ service }: { service: Service }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={service.title}
        position="bottom"
      >
        <Text>{service.desc}</Text>
      </Drawer>
      <Box sx={{ height: "5rem",width: "95%", borderBottom: "1px solid gray", margin:"auto"}}>
        <Flex gap={"sm"} wrap={"nowrap"} align={"center"}>
          <Box
            sx={{
              width: "3rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {<service.icon size={"2.5rem"} />}
          </Box>
          <Box>
            <Text fz="md">{service.title}</Text>
            <Box sx={{ height: "1.3rem" ,textOverflow: "ellipsis",overflow: "hidden" }}>
              <Text fz="sm" c={"gray"}>
                {service.desc}
              </Text>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              width: "3rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={open}
          >
            <Bleach size={"1rem"} />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default ServiceCardM;
