README

Patrick Grasso, Nicholas Zubrycki, Nicholas Massa

<h1>Dependencies</h1>:
*MongoDB* (install from their website)

In the mongo shell (if further instructions needed, contact us), enter
```
use Cucumboi
db.createCollection('scores', {})
db.scores.insert({ name: 'test', score: 1 })
```

*Node* (install from their website, comes with *npm*)

```
cd cucumboi
npm update
```


<h1>Instructions to play game:</h1>

1) navigate into "cucumboi" folder
2) `node app.js`
3) go to `http://localhost:8000`
4) use arrow keys to control character and collect cucumbers
5) upon completion of the game, enter name to submit your score
