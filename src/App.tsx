import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { LoanCalculator } from "./components/LoanCalculator";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container marginY={6} maxW="3xl">
        <LoanCalculator />
      </Container>
    </ChakraProvider>
  );
};

export { App };
