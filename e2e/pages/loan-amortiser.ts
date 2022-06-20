class LoanAmortiserPage {
  async open() {
    await browser.url("/");
  }

  get loanAmountTextField() {
    return $("#loanAmount");
  }

  get loanTermTextField() {
    return $("#loanTerm");
  }

  get interestRateTextField() {
    return $("#interestRate");
  }

  get calculateButton() {
    return $("button=Calculate");
  }
}

export default new LoanAmortiserPage();
