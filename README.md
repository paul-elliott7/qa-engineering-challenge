# QA Engineer Challenge

```
TIMEBOX: 3-4 hours
STACK: TypeScript/WebdriverIO (or an alternative browser automation test framework)
```

## Overview

This challenge is to reverse engineer a set of acceptance criteria, and implement
browser automation coverage, for the provided React application.

It is important to note that this is by no means a test with a single correct
answer in terms of structure and code, we appreciate we are going back to front with
regards to requirements, but we are hoping to get an understanding of how you communicate
expectations around behaviour in software, as well as how you go about validating these
behaviours using automation.

We have bootstrapped a small end-to-end set-up using [WebdriverIO](https://webdriver.io/)
in the `e2e` directory, with a small smoke test to ensure the set-up works.

## The Challenge

Using the provided application (documented in more detail below):

- Reverse engineer the behaviours of the provided application into acceptance
  criteria as you see fit
- Provide coverage validating these behaviours using browser automation
- Document any potential issues found in the application as you see fit

## The Loan Amortiser Application

The Loan Amortiser provides a basic calculator to calculate the instalment
schedule of a loan given an amount, a term (in months), and an annual interest rate.

Using these inputs, the calculator derives the following:

- The monthly repayment amount using the logic outlined below
- The total interest repayable based on the difference between the loan amount and
  the total amount due
- The total amount repayable as the loan amount plus the interest repayable

As well as the full schedule, detailing each repayment over the term of the loan.

Our calculator generates the amortisation schedule using the
[Annuity Method](https://en.wikipedia.org/wiki/Amortization_schedule#Annuity_method).

The monthly repayment amount is calculated as per:

![Annuity Method for calculating an Amortisation Schedule](./annuity_method.svg)

Where:

- `A` is the monthly repayment amount
- `P` is the loan amount
- `i` is the periodic interest rate
- `n` total number of payments

Our calculator assumes 12 periods per year (i.e. monthly) for the purpose of deriving
the periodic interest rate, and payments being made monthly for the purpose of deriving
the total number of payments (i.e. a term of 12 is 12 payments).

To calculate the schedule we then apply the following for each payment due in order,
using the balance of the previous payment (or the loan amount for the first payment)
as input to the next: `Balance Outstanding = (B * (1 + i)) - A`.

Where:

- `B` is the current outstanding balance of the loan
- `i` is the periodic interest rate as defined above
- `A` is the monthly repayment amount as calculated above

To derive the proportion of each payment being applied to interest and to principal,
we calculate the interest as `B * i`, and the principal as `A - (B * i)` using the
same defintion for the terms as above.

This main set of logic is implemented in the
[useAmortisation](./src/hooks/use-amortisation/useAmortisation.ts) hook.

### Pre-requisites to Run the Application

- Node 16; or alternatively Docker using the provided Dockerfile

### Running the Application

1. Ensure the project's dependencies are installed using `npm install`
2. Launch the application using `npm run start`

Once started you will be able to access the application at
[http://localhost:3000](http://localhost:3000).

## Running the WebdriverIO Suite

### Pre-requisites

- Node 16
- Google Chrome (you are able to configure a different browser in the
  `./e2e/wdio.conf.ts` file if you prefer)
- Application running on http://localhost:3000 using steps above

### Running the Suite

1. Ensure the project's dependencies are installed using `npm install`
2. Run the suite using `npm run e2e`

## Submitting the Challenge

- Please submit your challenge as a git repository, including any run instructions if different to commands above.
- You can either:
  - Create a repository on your favourite git hosting provider (GitHub, GitLab, BitBucket) and share the link; or
  - Send the whole repository, zipped (including the .git directory!)
- Please do not fork this repository directly.
- Feel free to include any supporting materials used to validate the application
