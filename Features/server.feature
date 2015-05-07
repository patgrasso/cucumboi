Feature: Server
	
	Several scenarios to test the ability to store scores in the mongoose Database and retrieve them.
	
	Scenario Outline: Storing Scores & Retrieving
		Given the input "<input>"
		When the mongoose Database is running
		Then the output should be "<output>"
		
		
Examples:
|input                                                                                |output                 |
| curl --request POST 'http://localhost:8000/highscores' --data "name=pat&score=10"   | {name:pat score:10}   |
| curl --request POST 'http://localhost:8000/highscores' --data "name=pat&score=30"   | {name:pat score:30}   |
| curl --request POST 'http://localhost:8000/highscores' --data "name=Nick&score=0"   | {name:Nick score:0}   |
| curl --request POST 'http://localhost:8000/highscores' --data "name=Nick&score=999" | {name:Nick score:999} |