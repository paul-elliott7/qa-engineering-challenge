Feature: Loan Amortiser

  Scenario: Smoke test of WebdriverIO infrastructure for challenge
    When the user accesses the Loan Amortiser
    Then the user has the ability to capture details about the loan with the following default values:
      | Loan Amount | Loan Term | Interest Rate |
      |             |           |               |
      | 30000       | 12        | 7.5           |

  Scenario: Field validation - invalid values
    Then enter invalid values and trap errors
      | Loan Amount   | Expected msg Loan Amount                      | Loan Term | Expected msg Loan Term                      | Interest Rate | Expected msg Interest Rate                           |
      | -1            | The amount of the loan must be greater than 0 | -1        | The term of the loan must be greater than 0 | -1            | The interest rate of the loan must be greater than 0 |
      |               |                                               |           |                                             |               |                                                      |

  Scenario: Field validaton - missing values
    Then trap missing value errors
      | Expected msg Loan Amount                | Expected msg Loan Term                | Expected msg Interest Rate                       |
      | The amount of the loan must be provided | The term of the loan must be provided | The interest rate of the loan must be provided   |
      |                                         |                                       |                                                  |

 Scenario: Check calculated values for valid inputs
    When the user accesses the Loan Amortiser
    Then enter valid values and check that the calculations are as expected
      | Loan Amount | Loan Term | Interest Rate | Monthly Payment | Total Interest | Total Amount |
      | 30000       | 12        | 7.5           | £2,602.72       | £1,232.67      | 31232.67     |
      | 75000       | 12        | 6.0           | £6,454.98       | £2,459.79      | 77459.79     |
      | 30000       | 24        | 4.2           | £1,277.53       | £660.65        | 30660.65     |
      |             |           |               |                 |                |              |
      | 100000      | 36        | 4.5           | £2,974.69       | £7,088.93      | 107088.93    |

