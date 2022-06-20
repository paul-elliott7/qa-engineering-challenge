import { Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { formatAmount } from "src/util/format-amount";

type LoanRepaymentDetailsProps = {
  monthlyRepaymentAmount?: number;
  totalInterestRepayable?: number;
  totalAmountRepayable?: number;
};

const LoanRepaymentDetails = ({
  monthlyRepaymentAmount,
  totalInterestRepayable,
  totalAmountRepayable,
}: LoanRepaymentDetailsProps) => {
  return (
    <TableContainer>
      <Table aria-label="Loan Repayment Details">
        <Tbody>
          <Tr>
            <Th scope="row">Monthly Repayment Amount</Th>
            <Td isNumeric>{formatAmount(monthlyRepaymentAmount)}</Td>
          </Tr>
          <Tr>
            <Th scope="row">Total Interest Repayable</Th>
            <Td isNumeric>{formatAmount(totalInterestRepayable)}</Td>
          </Tr>
          <Tr>
            <Th scope="row">Total Amount Repayable</Th>
            <Td isNumeric>{totalAmountRepayable?.toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { LoanRepaymentDetails };
