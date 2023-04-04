import React from "react";
import { Flex, Box, Text, Title, Modal, Divider } from "@mantine/core";
import { Icon } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
interface Service {
  title: string;
  icon: Icon;
  desc: string;
}
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Title order={3} fw={600}>{service.title}</Title>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Divider my={"sm"} />
          <Modal.Body>
            <Text c="dimmed" sx={{ marginTop: "2rem" }}>{service.desc}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Flex
        direction={"column"}
        align={"center"}
        sx={{
          padding: "2rem",
          borderLeft: index === 0 ? "" : "1px solid #ced4da",
          marginTop: "2rem",
          cursor: "pointer",
        }}
        onClick={open}
      >
        <Box
          sx={{
            width: "3rem",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {<service.icon size={"2.5rem"} strokeWidth={1.25} />}
        </Box>

        <Title order={4} sx={{ marginTop: "0.5rem" }}>
          {service.title}
        </Title>
        <Box
          sx={{
            height: "1.3rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Text fz="sm" c={"gray"}>
            {service.desc}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default ServiceCard;
