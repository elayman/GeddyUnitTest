var Mocha = require('mocha');

function run_tests(callback){
    var mocha = new Mocha({reporter: 'spec', ui: 'bdd', timeout: '10000'});
    execute_test_code(mocha, callback);
}

function create_coverage_code(callback){
    console.log("Copying App to another Directory for Code Coverage now...");
    //Create backup
    jake.exec(['rm -rf ../app-copy', 'mkdir ../app-copy', 'cp -R ./* ../app-copy'], function() {
        //Move to new copy directory
        process.chdir('../app-copy');
        //Backup passport so we don't code cover it
        jake.exec(['rm -rf ./passport-backup', 'cp -R ./app/helpers/passport ./passport-backup'], function() {
            //Create coverage code
            console.log("Creating Code Coverage now...");
            jake.exec(['rm -rf app-cov', 'jscoverage ./app ./app-cov'], function() {
                console.log("Done running jscoverage on code to produce output.");
                //Make coverage code the app dir
                jake.exec(['rm -rf app', 'cp -R ./app-cov ./app'], function() {
                    //Put back passport helper
                    jake.exec(['rm -rf ./app/helpers/passport', 'cp -R ./passport-backup ./app/helpers/passport'], function() {
                        callback();
                    });
                });
            });
        });
    });
}

function run_test_coverage(callback){
    var mocha = new Mocha({reporter: 'html-cov', ui: 'bdd', timeout: '10000'});
    execute_test_code(mocha, callback);
}
 
function execute_test_code(mochaInstance, cb) {
    mochaInstance.addFile('./test/userTest.js');
    mochaInstance.addFile('./test/activityAddTest.js');
    mochaInstance.addFile('./test/activityFindTest.js');
    mochaInstance.addFile('./test/getActivityByIdTest.js');
    mochaInstance.addFile('./test/eventAddTest.js');
    mochaInstance.addFile('./test/eventChangeDateTimeTest.js');
    mochaInstance.addFile('./test/eventInviteTest.js');
    mochaInstance.addFile('./test/eventRemoveUserTest.js');
    mochaInstance.addFile('./test/getMyEventsTest.js');
    mochaInstance.addFile('./test/commentAddTest.js');
    mochaInstance.addFile('./test/getCommentsForEventTest.js');
    mochaInstance.options.ignoreLeaks = true;
    //Set up socket io because geddy isn't initialized correctly
    geddy.io = require('socket.io').listen(5000);
    geddy.io.configure(function () { 
        geddy.io.set("transports", ["xhr-polling"]); 
        geddy.io.set("polling duration", 10); 
    });
    mochaInstance.run(function(failures) {
        cb(failures);
    });
}
 
desc('mocha unit test-run');
task('test', {async: true}, function(args) {
    run_tests(function(err) {
        if (err) {
            fail(err);
        } else {
            create_coverage_code(function(err){
                if (err){

                }else {
                    //This runs the runTestCoverage task and directs the output to the correct file
                    jake.exec(['geddy jake runTestCoverage > ./coverage.html'], {printStdout: true});
                }
            });
        }
    });
});

//This is the CLI task for running only coverage
task('test-cov', {async: true}, function(args) {
    create_coverage_code(function(err){
        if (err){

        }else {
            console.log("Running tests now with code coverage enabled...");
            //This runs the runTestCoverage task and directs the output to the correct file
            jake.exec(['geddy jake runTestCoverage > ./coverage.html'], {printStdout: true});
        }
    });
});

//NOTE: THIS SHOULD NOT BE RUN FROM CLI
//This runs the test coverage and when done, opens the html output
task('runTestCoverage', {async: true}, function(args) {
    run_test_coverage(function(err) {
        console.log("Opening coverage.html file");
        jake.exec(['open ./coverage.html'], function() {
            complete();
        });
    });
});