# QA Engineer Challenge - notes by Paul Elliott

When running the tests using `npm run e2e` the test steps will run using data in tables in the loan-amortiser.feature file.

For Acceptance Criteria please see the Word doc Behaviours and Validation which I've added to GitHub.

Note that I just could not get setValue() to work as it kept appending values to the default values, even after using clearValue().  Regrettably I've had to remove the default values from LoanCalculatorForm.tsx just so that I can proceed with the rest of this challenge.

## The scenarios

There are several scenarios covered : 

### Smoke test
Unchanged from the original scenario, although note that I've now blanked out the data in the first row of the table as I needed to remove the default input values (see above).  The first row of the smoke test table has blank values to correspond.  The original data table row is in teh second row so that it can be restored easily enough if required. 

### Field validation - invalid values
Uses setValue() to enter negative values and compares the returned error message(s) with what I've entered in the data table.

### Field validaton - missing values
Uses clearValue() and compares the returned error message(s) with what I've entered in the data table.

### Check calculated values for valid inputs
Firstly the 3 calculated values of :
    - Monthly Repayment Amount
    - Total Interest Payable
    - Total Amount Repayable
    I could do this using on-the-fly calculations but, just to illustrate a method, for this I've preloaded expected results in each row of the data data-table using results obtained from the excel LoanAmortiser.xlsx spreadsheet which I put together (and which I've pushed to GitHub too).  Using this method gets round the (presumably deliberate) formatting issue of the missing £ sign and commas in the Total Amount Repayable value.  You'll see from the feature file that for these I've entered the expected value without such formatting.  Test will fail (correctly) if properly formatted GBP Currency formats are expected.
    For the schedule table I'm using a different method, basically a loop through all all rows and comparing what's on screen with expected values calculated on the fly.
    Several anomalies here which I've solved or worked round :
    - The first 2 cols of the first 3 rows of the schedule table use different selectors than the rest.  Hence the slightly different selectors used when k<=3
    - I'm using a currency formatter to convert the expect calculated values to the same format as what's on screen i.e. 2 dp. £ signs and commas.  I did orginally try a 'replace' regex string pattern but that struggled with negative values such as -£0.00 which can happen in the Loan Amortiser app.  The regex format was yielding £-0.00 which causes a mismatch.
    - The tests reveal an error for terms other than 12.  I believe that as per the Readme file the periodic interest rate should be based on 'i / 100 / 12` but it's actually dividing by the 'loan term' rather than 12.  So it works when the loan term is 12 but is incorrect for anything else.  The test will correctly fail for such input values.
    I've left one row in the table which demonstrates this i.e. will cause a test failure.  There are 2 others I've left in which you can try if you wish but these are after the blank data table row so are parked for now.  Simply edit the data table for this scenario to try out different rows as required.

    ## And finally...
    This is my first experience of WebdriverIO (although I have used CypressIO before) and so I have been learning as I go.  I'm sure there are neater ways of presenting the code, by declaring functions for example so that the code reads neater, but for now I've put code inline for this my first challenge.
    I've also used lots of console.log() statements to aid my debugging; I've left these in so that you can see my workings.
    Thanks and regards,
    Paul 07415 875154 [paulsarah.elliott@ntlworld.com](mailto:paulsarah.elliott@ntlworld.com)