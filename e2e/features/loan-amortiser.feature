Feature: Loan Amortiser

  Scenario: Smoke test of WebdriverIO infrastructure for challenge

    When the user accesses the Loan Amortiser
    Then the user has the ability to capture details about the loan with the following default values:
      | Loan Amount | Loan Term | Interest Rate |
      | 30000       | 12        | 7.5           |
