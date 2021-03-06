/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/**
 * BUILD r.js IN THIS DIRECTORY FIRST BEFORE RUNNING THIS FILE
 *
 * To run in Node:
 * node ../r.js all.js
 *
 * To run in Rhino:
 * java -jar ../../build/lib/rhino/js.jar ../r.js all.js
 * Debug:
 * java -classpath ../../build/lib/rhino/js.jar org.mozilla.javascript.tools.debugger.Main ../r.js all.js
 */

/*jslint strict: false */
/*global require: false, doh: false */

//Special global flag used by DOH.
skipDohSetup = true;

require({
    paths: {
        env: '../build/jslib/env'
    }
}, [
    'alpha',
    'beta',
    'doh/runner',
    'env!doh/_{env}Runner'
], function (alpha, beta, a) {

    doh.register('rjsTests',
        [
            function rjsTests(t) {
                t.is('alpha', alpha.name);
                t.is('beta', beta.name);
                t.is('betaSubName', beta.subName);
            }
        ]
    );
    doh.run();

    define('testError', function () {
        requirejs(['nonExistingModule'], function () {
            console.log('BIG TIME FAIL');
        }, function (err) {
            console.log('OK');
        });
    });

    require(['testError']);


    //Print out the test summary.
    doh.run();
});
