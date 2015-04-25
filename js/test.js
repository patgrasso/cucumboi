/*global define*/

define(function () {
    'use strict';

    var modules = {},
        exports = {};

    /**
     * register(string, object)
     * Takes a module's name and the object it wishes to expose for testing
     * and places it in the registry
     */
    exports.register = function (moduleName, testExportObj) {
        modules[moduleName] = testExportObj || {};

        return {
            /**
             * set(string, object)
             * Takes a property name and a value to associate the property with
             * and sticks it onto the module's test export object
             */
            set: function (propName, value) {
                modules[moduleName][propName] = value;
            }
        };
    };


    /**
     * request(string)
     * Returns the exposed testing object associated with a module
     */
    exports.request = function (moduleName) {
        return modules[moduleName];
    };


    return exports;
});
