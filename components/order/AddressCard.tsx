import React from "react";
import { Stack, Group, Title, Text } from "@mantine/core";
import { gray_layout } from "@/type/const";
interface PropsType {
  address: string;
  phoneNumber: string;
  recName: string;
}

function AddressCard({ address, phoneNumber, recName }: PropsType) {
  return (
    <Stack
      sx={{
        width: "100%",
        border: `1px solid ${gray_layout}`,
        padding: "2rem",
      }}
    >
      <Group>
        <Title order={5} fw={500}>
          Address
        </Title>
        <Text sx={{ marginLeft: "auto" }}>{address}</Text>
      </Group>
      <Group>
        <Title order={5} fw={500}>
          Phone Number
        </Title>
        <Text sx={{ marginLeft: "auto" }}>{phoneNumber}</Text>
      </Group>
      <Group>
        <Title order={5} fw={500}>
          Name
        </Title>
        <Text sx={{ marginLeft: "auto" }}>{recName}</Text>
      </Group>
    </Stack>
  );
}

export default AddressCard;
