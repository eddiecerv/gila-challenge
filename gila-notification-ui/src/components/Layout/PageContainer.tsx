"use client";

import { Container } from "@chakra-ui/react";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container minHeight="100vh" maxWidth="800" p={12}>
      {children}
    </Container>
  );
}
