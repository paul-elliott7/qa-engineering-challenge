import React from "react";

type Instalment = {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

type Schedule = {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyRepaymentAmount: number;
  totalInterestRepayable: number;
  totalAmountRepayable: number;
  instalments: Instalment[];
};

const calculateMonthlyInterestRateFactor = (
  interestRate: number,
  periodsPerYear: number
): number => {
  return interestRate / 100 / periodsPerYear;
};

const calculateMonthlyRepaymentAmount = (
  loanAmount: number,
  loanTerm: number,
  monthlyInterestRateFactor: number
): number => {
  return (
    loanAmount *
    ((monthlyInterestRateFactor *
      Math.pow(1 + monthlyInterestRateFactor, loanTerm)) /
      (Math.pow(1 + monthlyInterestRateFactor, loanTerm) - 1))
  );
};

const calculateInstalments = (
  loanAmount: number,
  loanTerm: number,
  monthlyInterestRateFactor: number,
  monthlyRepaymentAmount: number
): Instalment[] => {
  const instalments = [...Array.from(Array(loanTerm))].reduce(
    (instalments: Instalment[], _, period: number) => {
      const lastInstalment = instalments[instalments.length - 1];
      const interest = lastInstalment.balance * monthlyInterestRateFactor;
      const principal = monthlyRepaymentAmount - interest;
      const balance = lastInstalment.balance - principal;
      return [
        ...instalments,
        {
          payment: monthlyRepaymentAmount,
          principal,
          interest,
          balance,
        },
      ];
    },
    [{ payment: 0, principal: 0, interest: 0, balance: loanAmount }]
  );
  instalments.shift();
  return instalments;
};

const useAmortisation = () => {
  const [schedule, setSchedule] = React.useState<Schedule | undefined>();

  const reset = () => setSchedule(undefined);

  const amortise = async (
    loanAmount: number,
    loanTerm: number,
    interestRate: number
  ) => {
    // Oops, not sure what happened here, not very annual anymore after refactoring...
    const monthlyInterestRateFactor = calculateMonthlyInterestRateFactor(
      interestRate,
      loanTerm
    );
    const monthlyRepaymentAmount = calculateMonthlyRepaymentAmount(
      loanAmount,
      loanTerm,
      monthlyInterestRateFactor
    );
    const totalInterestRepayable =
      monthlyRepaymentAmount * loanTerm - loanAmount;
    const totalAmountRepayable = loanAmount + totalInterestRepayable;
    const instalments = calculateInstalments(
      loanAmount,
      loanTerm,
      monthlyInterestRateFactor,
      monthlyRepaymentAmount
    );
    setSchedule({
      loanAmount,
      loanTerm,
      interestRate,
      monthlyRepaymentAmount,
      totalInterestRepayable,
      totalAmountRepayable,
      instalments,
    });
  };

  return {
    schedule,
    reset,
    amortise,
  };
};

export { useAmortisation };
