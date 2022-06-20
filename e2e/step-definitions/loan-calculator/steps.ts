import { Then, When } from "@wdio/cucumber-framework";
import LoanAmortiserPage from "../../pages/loan-amortiser";

When(/^the user accesses the Loan Amortiser$/, async () => {
  await LoanAmortiserPage.open();
  await (await LoanAmortiserPage.calculateButton).waitForDisplayed();
});

Then(
  /^the user has the ability to capture details about the loan with the following default values:$/,
  async (dataTable) => {
    const data = dataTable.hashes()[0];
    await expect(LoanAmortiserPage.loanAmountTextField).toHaveValue(
      data["Loan Amount"]
    );
    await expect(LoanAmortiserPage.loanTermTextField).toHaveValue(
      data["Loan Term"]
    );
    await expect(LoanAmortiserPage.interestRateTextField).toHaveValue(
      data["Interest Rate"]
    );
  }
);
