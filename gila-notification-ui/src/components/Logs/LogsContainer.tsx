"use client";

import { Log } from "@/shared/types/log.type";
import { User } from "@/shared/types/user.type";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";

export default function LogsContainer({ logs }: { logs: Log[] }) {
  function getEntity(type: string, user: User) {
    switch (type) {
      case "sms":
        return user.phone;
      case "email":
        return user.email;
      default:
        return "Mobile App";
    }
  }
  return (
    <Stack spacing={4} gap={4} className="overflow-y-auto h-96 shadow-md">
      {logs.map((log) => {
        return (
          <Box key={log._id} mt={2} mb={2} p={2} className="shadow-sm">
            <Flex>
              <Text fontSize={11} color="gray" flex={1}>
                {moment(log.createdAt).fromNow()}
              </Text>
            </Flex>
            <Flex p={2}>
              <Text color="blue.400">
                Sent message to {log.user.name} by {log.notificationType.name}{" "}
                to{" "}
                <span className="to-blue-700 font-bold">
                  {getEntity(log.notificationType.tag, log.user)}
                </span>
              </Text>
            </Flex>
          </Box>
        );
      })}
    </Stack>
  );
}
