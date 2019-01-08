var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should have correct page title|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008700f6-003a-00c2-005f-005200e60035.png",
        "timestamp": 1546925937682,
        "duration": 6072
    },
    {
        "description": "should verify Home Button is Displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0013003c-0078-0030-008e-00da00bf00e0.png",
        "timestamp": 1546925944477,
        "duration": 1310
    },
    {
        "description": "Should verify Page Header|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006c0000-000a-00c6-004a-001400e60082.png",
        "timestamp": 1546925946098,
        "duration": 564
    },
    {
        "description": "should check Bank Manager button text|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009a001c-00f2-00fe-0011-00be00c000d4.png",
        "timestamp": 1546925946949,
        "duration": 444
    },
    {
        "description": "should check Bank Manager Login button displayed|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00eb00d6-005b-0078-00bf-00fe00a600e4.png",
        "timestamp": 1546925947681,
        "duration": 467
    },
    {
        "description": "should check Bank Manager Login button displayed and check text by ngClick|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0094001e-00ae-00ec-00e5-004a009400ac.png",
        "timestamp": 1546925948466,
        "duration": 594
    },
    {
        "description": "should stay when click home page|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007900ec-00fc-000b-002f-00b000d70060.png",
        "timestamp": 1546925949355,
        "duration": 561
    },
    {
        "description": "should display options for manager|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00fe009c-0079-0077-0054-0047003b00c3.png",
        "timestamp": 1546925950202,
        "duration": 3384
    },
    {
        "description": "should display form for Adding Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009000fd-00c9-001a-0046-00af00a10078.png",
        "timestamp": 1546925953947,
        "duration": 1112
    },
    {
        "description": "Should list first name in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00340038-007b-0075-0006-009a00d9000c.png",
        "timestamp": 1546925955372,
        "duration": 714
    },
    {
        "description": "Should list First Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ee00f2-0021-00df-00f5-000d00b50071.png",
        "timestamp": 1546925956411,
        "duration": 717
    },
    {
        "description": "Should list Last Name label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008500cf-00f5-00e4-00fb-007500fd003f.png",
        "timestamp": 1546925957478,
        "duration": 800
    },
    {
        "description": "Should list ZipCode label in the form|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c1003c-0099-0014-002d-001c00b50035.png",
        "timestamp": 1546925958591,
        "duration": 755
    },
    {
        "description": "Should require First Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d5003a-00d3-0030-0087-003900b500ac.png",
        "timestamp": 1546925959701,
        "duration": 775
    },
    {
        "description": "Should require Last Name|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009a0022-008e-0012-00a8-0059007d00b8.png",
        "timestamp": 1546925961199,
        "duration": 1036
    },
    {
        "description": "Should require Zip Code|Login",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": [
            "Expected 'true' to be 'tru'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.it (C:\\Users\\kbaialiev\\Desktop\\CyberFramework\\CyberBank\\Tests\\test1.js:97:55)\n    at C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\kbaialiev\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\000300a7-007e-003b-00c2-0006007a00ba.png",
        "timestamp": 1546925962592,
        "duration": 1106
    },
    {
        "description": "Should Add Customer|Login",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5864,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d400cd-0068-00e7-0035-002d00890019.png",
        "timestamp": 1546925964052,
        "duration": 1070
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
