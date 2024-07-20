"use client";

import CreateForm from "./CreateForm";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Category } from "@/shared/types/category.type";
import { Log } from "@/shared/types/log.type";
import LogsContainer from "./LogsContainer";
import { useState } from "react";

type Props = {
  categories: Category[];
  logs: Log[];
};

export default function Main({ categories, logs }: Props) {
  const [logsList, setLogs] = useState(logs);

  function handleCreateLogs(logs: Log[]) {
    console.log("Logs on create?", logs);
    setLogs((prevState) => [...prevState, ...logs]);
  }

  return (
    <SimpleGrid columns={2} gap={12}>
      <Box>
        <Text as="h1">New Notification</Text>
        <CreateForm categories={categories} onCreate={handleCreateLogs} />
      </Box>
      <Box>
        <Text as="h1">Notifications Logs ({logsList.length} results)</Text>
        <LogsContainer logs={logsList} />
      </Box>
    </SimpleGrid>
  );
}
