import { Group, Box, Text, ActionIcon } from "@mantine/core";
import React from "react";
import { Minus, Plus } from "tabler-icons-react";

function Counter({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) {
  return (
    <Group>
      <ActionIcon
        variant={"default"}
        onClick={() => setCount(count - 1)}
        disabled={count <= 1}
      >
        <Minus size={32} strokeWidth={1} />
      </ActionIcon>

      <Box>
        <Text>{count}</Text>
      </Box>
      <ActionIcon variant={"default"} onClick={() => setCount(count + 1)}>
        <Plus size={32} strokeWidth={1} />
      </ActionIcon>
    </Group>
  );
}

export default Counter;
