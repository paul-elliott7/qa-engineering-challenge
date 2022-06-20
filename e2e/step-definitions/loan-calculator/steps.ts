import { Then, When } from "@wdio/cucumber-framework";
import { it } from "mocha";
import LoanAmortiserPage from "../../pages/loan-amortiser";

// Smoke test

When(/^the user accesses the Loan Amortiser$/, async () => {
  await LoanAmortiserPage.open();
  await LoanAmortiserPage.calculateButton.waitForDisplayed();
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

// Field validation tests

Then(/^trap missing value errors$/, async (dataTable) => {
  const data = dataTable.hashes()[0];

  await LoanAmortiserPage.loanAmountTextField.clearValue();
  let errorMsg = await $('#field-4-feedback').getText();
  console.log('Loan Amount error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Loan Amount"]);

  await LoanAmortiserPage.loanTermTextField.clearValue();
  errorMsg = await $('#field-5-feedback').getText();
  console.log('Loan Term error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Loan Term"]);

  await LoanAmortiserPage.interestRateTextField.clearValue();
  errorMsg = await $('#field-6-feedback').getText();
  console.log('Interest Rate error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Interest Rate"]);

});

Then(/^enter invalid values and trap errors$/, async (dataTable) => {
  const data = dataTable.hashes()[0];

  await LoanAmortiserPage.loanAmountTextField.setValue(data["Loan Amount"]);
  await $('button=Calculate').click();
  let errorMsg = await $('#field-4-feedback').getText();
  console.log('Loan Amount error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Loan Amount"]);

  await LoanAmortiserPage.loanTermTextField.setValue(data["Loan Term"]);
  await $('button=Calculate').click();
  errorMsg = await $('#field-5-feedback').getText();
  console.log('Loan Term error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Loan Term"]);

  await LoanAmortiserPage.interestRateTextField.setValue(data["Interest Rate"]);
  await $('button=Calculate').click();
  errorMsg = await $('#field-6-feedback').getText();
  console.log('Interest Rate error message is ' + errorMsg);
  expect(errorMsg).toEqual(data["Expected msg Interest Rate"]);

});

When(/^user resets values$/, async () => {
  await LoanAmortiserPage.calculateButton.click();
  await $('button=Reset').click();
  await LoanAmortiserPage.calculateButton.waitForDisplayed();
});

Then(/^enter valid values and check that the calculations are as expected$/, async (dataTable) => {
  var data = dataTable.hashes()[0];
 
  let j=0;
  do {

    const loanAmount = data["Loan Amount"];
    const loanTerm = data["Loan Term"];
    const interestRate = data["Interest Rate"];
    
    await LoanAmortiserPage.loanAmountTextField.setValue(loanAmount);
    await LoanAmortiserPage.loanTermTextField.setValue(loanTerm);
    await LoanAmortiserPage.interestRateTextField.setValue(interestRate);
    await $('button=Calculate').click();

    const monthlyPayment = await $(':nth-child(2) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(1) > .css-xumdn4').getText();
    expect(monthlyPayment).toEqual(
      data["Monthly Payment"]
    );
    const totalInterest  = await $(':nth-child(2) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(2) > .css-xumdn4').getText();
    expect(totalInterest).toEqual(
      data["Total Interest"]
    );
    const totalAmount = await $(':nth-child(2) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(3) > .css-xumdn4').getText();
    expect(totalAmount).toEqual(
      data["Total Amount"]
    );

    console.log(`\nMonthly Payment Amount ${monthlyPayment} | Total Interest Repayable ${totalInterest} | Total Amount Repayable ${totalAmount}`);

    const P = loanAmount;
    const n = loanTerm;
    const i = interestRate / 100 / n;
    const A = P * (i * (1 + i)**n) / ((1 + i)**n - 1);
    var B = loanAmount;

    for (let k=1; k<=loanTerm; k++) {

      if (k<=3) {
        var instalment = await $(`:nth-child(3) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(${k}) > :nth-child(1)`).getText();
        var payment    = await $(`:nth-child(3) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(${k}) > :nth-child(2)`).getText();
      }
      else {
        var instalment = await $(`tbody.css-0 > :nth-child(${k}) > :nth-child(1)`).getText();
        var payment    = await $(`tbody.css-0 > :nth-child(${k}) > :nth-child(2)`).getText();
      }
      const principal    = await $(`tbody.css-0 > :nth-child(${k}) > :nth-child(3)`).getText();
      const interest     = await $(`tbody.css-0 > :nth-child(${k}) > :nth-child(4)`).getText();
      const balance      = await $(`tbody.css-0 > :nth-child(${k}) > :nth-child(5)`).getText();
      console.log(`Instalment : ${instalment} | Payment : ${payment} | Principal ${principal} | Interest : ${interest} | Balance : ${balance}`);

      // Number formatter for converting to currency
      // Was using A.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')); etc but this gave odd strings
      // for negative numbers such as £-0.00
      var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      });

      console.log('A = ' + formatter.format(A));
      console.log('Expected Principal = ' + formatter.format(A-(B*i)));
      console.log('Expected interest  = ' + formatter.format(B*i));

      expect(instalment).toEqual(k.toString());
      expect(payment).toEqual(formatter.format(A));
      expect(principal).toEqual(formatter.format(A-(B*i)));
      expect(interest).toEqual(formatter.format(B*i));

      B = (B * (1 + i)) - A;

      console.log('B = ' + formatter.format(B));
      expect(balance).toEqual(formatter.format(B));

    }

    // Now check that there aren't too many rows.  E.g. if the term is 12 make sure there's not a 13th row.
    let tooManyRows = await ($(`tbody.css-0 > :nth-child(${loanTerm+1}) > :nth-child(1)`).isExisting());
    expect(tooManyRows).toEqual(false);

    await $('button=Reset').click();
    await LoanAmortiserPage.open();
    await LoanAmortiserPage.calculateButton.waitForDisplayed();

    j++;
    data = dataTable.hashes()[j];
  
  } while (data["Loan Amount"] > 0);

});
