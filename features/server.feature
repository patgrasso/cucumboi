Feature: Server

    Scenarios to test sending high scores to the server and checking them via POST and GET requests (curl)

    Assumes that the server is running

    Scenario Outline: Storing Scores
        Given the name "<name>" and score "<score>"
        When the server is running and we send in the score
        Then the return data should be "true"

        Examples:
            | name  | score |
            | pat   |  120  |
            | nick  |  140  |
            | sushi |  347  |

    Scenario Outline: Retrieving Scores
        Given the name "<name>" and score "<score>"
        When the server is running
        Then a call to /getscore of "<name>" should return "<output>"

        Examples:
            | name | score | output |
            | pat  |  10   |  10    |
            | pat  |  30   |  30    |
            | Nick |  0    |  0     |
            | Nick |  999  |  999   |
