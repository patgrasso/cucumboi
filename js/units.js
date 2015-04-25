/*global define, document*/

define(['main', 'test/score'], function (main, scoreTests) {
    'use strict';
    var runTests,
        printResults,
        printHeader;

    printHeader = function () {
        var headerText = document.createElement('h1');

        headerText.innerText = 'Unit Tests';
        document.body.appendChild(headerText);
    };

    printResults = function (testName, testResult) {
        var resultText = document.createElement('p');

        resultText.style.background = testResult ? 'lightgreen' : 'red';
        resultText.innerText = testResult ? 'PASSED: ' : 'FAILED: ';
        resultText.innerText += testName;

        document.body.appendChild(resultText);
    };

    runTests = function (suite) {
        suite.forEach(function (scenario) {
            printResults(scenario.name, scenario.run());
        });
    };

    return {
        runTests: function () {
            printHeader();
            runTests(scoreTests);
        }
    };
});
