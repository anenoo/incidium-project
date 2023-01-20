# Convert Data

## Indicium - Interview test
Thank you for taking the time to try out our Coding Challenge.
Since we don't do a lot of white-boarding during the interview process, we've
found that the best way for you to show us your skills is through take-home
tasks. This gives you a chance to think about the problem, solve it when you
feel comfortable, and focus on the areas you think are important.
For this task, you should spend some time on the keyboard, but we
recommend that you read the task description and take some time to think
about your solution before tackling the task. :-)
## Overview
At Indicium we deal with many different problem constellations everyday,
changing requirements and complex problems require elegant, simple and
extensible solutions which must be maintainable without significant amounts
of documentation.
The goal of this challenge is to see how you approach and break down opaque
problems, plan your work and verify its integrity.
We would like you to implement a simple program that rotates a table with an
identical number of rows and columns to the left or right.
It should expose a CLI as outlined in the next section and accept a CSV file
containing a list of lists of numbers, and output a CSV-encoded version of the
correct — and correctly — rotated tables.
You may use TypeScript or Rust for this problem.
Chose the technology you feel most comfortable with.
https://xkcd.com/1343
## Scoring
Your program will be scored using a combination of automated and manual
scoring. Automated scoring will be used to run your program against a
handful of sample inputs, comparing the resulting output. Manual scoring will
be used for everything else. At Indicium we care about clean, correct and
efficient code.
Because we use some automated scoring, it is very important your program
complies with the interface outlined below. Anything else will be a headache
for the reviewers.
Basics • Does the program run?
• Does it read and output data we would
like it to?
• Is it properly formatted?
Completeness • Does it handle all the cases, including
differing numbers of rows and columns,
bigger and smaller tables, error cases
you might come up with?
• For the cases you are handling, are you
handling them correctly?
• How do you know this?
• Did you test against sample data? If so,
please include it alongside your code.
• Did you write unit tests?
• Tell us all about it in the README.
Efficiency • Be thoughtful about how you use system
resources. Sample data sets may be
small, but your program may be
evaluated against much larger data sets.
• Can you stream the CSV file instead of
reading it completely upfront?
Maintainability • Here, clean code is more important than
highly optimised code. Humans will read
and review your code without an
immediate opportunity for you to explain
it.
• Inefficient code can often be improved if
it is correct and highly maintainable.
Details
Given a CSV file representing a series of tables, implement a rotation engine
that parses, verifies and rotates each table, and finally outputs a CSV file with
all valid and rotated tables.
[TS] You should be able to run your program like:
~ $ node cli.js input.csv > output.csv
[Rust] You should be able to run your program like:
~ $ ./cli input.csv > output.csv
The input file is the first and only argument to the program. Output should be
written to stdout (aka printed to the screen).
Input
The input will be a CSV file with the columns id and json. You can assume id
to be a string and json to be a string (JSON encoded data).
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]”
Output
The output should be a CSV-encoded series of rotated tables with the
columns id, json and is_valid. The latter is an indicator of whether or not
a given table is valid, if it is not, json should be an empty array.
id,json,is_valid
1,"[4, 1, 2, 7, 5, 3, 8, 9, 6]",true
2,"[90, 40, 10, 20]",true
3,"[-5]",true
9,"[]",false
5,"[]",false
8,”[]",false
## Theory
You work with a list of numbers that represent a table your program has to
interpret correctly. Since there is nothing but a flat list, the program has to
infer the rows and columns from this data, if needed.
If the square edge length is odd and there is a singular field in the middle of
the table, it is not moved.
Submission
Send your coding challenge as a reply to the mail containing this challenge.
Include a link to your public git repository containing your solution.
Your solution must not mention Indicium, any of its products or
trademarks in any way.
Useful libraries & tips (TS)
• csv-stream for reading the input CSV file
• fast-csv for writing the output file (tip: pipe the stream to process.stdout)
• Consider using process.argv to obtain the arguments passed to the
program.
Useful libraries & tips (if you are using Rust)
• csv for reading & writing CSV
• Consider using env :args().collect :<Vec<String >() to obtain
the arguments passed to the program.

## Execute

1. Install dependencies

    ```sh
    npm install
    ```

2. Build project

    ```sh
    npm run build
    ```

3. Run the CLI

    ```sh
    node cli.js input.txt > output.txt
    ```
