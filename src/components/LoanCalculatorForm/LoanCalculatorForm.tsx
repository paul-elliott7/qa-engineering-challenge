import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type LoanCalculatorFormValues = {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
};

const defaultValues = {
  loanAmount: 30000,
  loanTerm: 12,
  interestRate: 7.5,
};

type LoanCalculatorFormProps = {
  onSubmit(formData: LoanCalculatorFormValues): void;
  onReset?(): void;
};

const LoanCalculatorForm = ({ onSubmit, onReset }: LoanCalculatorFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LoanCalculatorFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const handleSubmitWithDelay = async (formData: LoanCalculatorFormValues) => {
    onSubmit(
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(formData);
        }, Math.floor(Math.random() * (2500 - 500 + 1)) + 500)
      )
    );
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset(defaultValues);
    onReset && onReset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitWithDelay)}>
      <Grid gap={3}>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.loanAmount)}
            isDisabled={isSubmitted}
          >
            <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
            <NumberInput id="loanAmount">
              <NumberInputField
                {...register("loanAmount", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "The amount of the loan must be provided",
                  },
                  min: {
                    value: 1,
                    message: "The amount of the loan must be greater than 0",
                  },
                })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.loanAmount?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.loanTerm)}
            isDisabled={isSubmitted}
          >
            <FormLabel htmlFor="loanTerm">Loan Term</FormLabel>
            <NumberInput id="loanTerm">
              <NumberInputField
                {...register("loanTerm", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "The term of the loan must be provided",
                  },
                  min: {
                    value: 1,
                    message: "The term of the loan must be greater than 0",
                  },
                })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.loanTerm?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl
            isInvalid={Boolean(errors.interestRate)}
            isDisabled={isSubmitted}
          >
            <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
            <NumberInput id="interestRate">
              <NumberInputField
                {...register("interestRate", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "The interest rate of the loan must be provided",
                  },
                  min: {
                    value: 0,
                    message:
                      "The interest rate of the loan must be greater than 0",
                  },
                })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.interestRate?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Box display="flex" justifyContent="center">
            {isSubmitted ? (
              <Button colorScheme="gray" onClick={handleReset}>
                Reset
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Calculating"
              >
                Calculate
              </Button>
            )}
          </Box>
        </GridItem>
      </Grid>
    </form>
  );
};

export { LoanCalculatorForm };
export type { LoanCalculatorFormValues };
