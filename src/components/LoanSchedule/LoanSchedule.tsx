import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatAmount } from "src/util/format-amount";

type Instalment = {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

type LoanInstalmentProps = {
  instalments: Instalment[];
};

const LoanSchedule = ({ instalments }: LoanInstalmentProps) => {
  return (
    <TableContainer>
      <Table aria-label="Loan Schedule">
        <Thead>
          <Tr>
            <Th>Instalment</Th>
            <Th isNumeric>Payment</Th>
            <Th isNumeric>Principal</Th>
            <Th isNumeric>Interest</Th>
            <Th isNumeric>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instalments.map((instalment, index) => (
            <Tr key={index + 1}>
              <Td>{index + 1}</Td>
              <Td isNumeric>{formatAmount(instalment.payment)}</Td>
              <Td isNumeric>{formatAmount(instalment.principal)}</Td>
              <Td isNumeric>{formatAmount(instalment.interest)}</Td>
              <Td isNumeric>{formatAmount(instalment.balance)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { LoanSchedule };
