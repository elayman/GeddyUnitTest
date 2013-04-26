var assert = require("assert")
  , User = geddy.model.User
  , Activity = geddy.model.Activity;

var resetFixture = function (done){
    Activity.TESTAPI_resetFixture(function(){
        User.TESTAPI_resetFixture(function() {
            done();
        });
    });
};


describe('Activity', function(){
    beforeEach(function(done) {
        //Erase database
        resetFixture(done);
    });

    describe('Activity.add any time', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = undefined;
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add specific date/time', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add no name', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null name'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add no description', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = undefined;
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add no category', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            //activityDict.category = undefined;
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null category'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add invalid category', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            activityDict.category = 'good times!';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'invalid category'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add no time1, needed for startEnd', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            activityDict.category = 'Entertainment';
            activityDict.time1 = undefined;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null time1'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });


    describe('Activity.add no time2, needed for startEnd', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            activityDict.category = 'Entertainment';
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time1 = tenPM;
            //activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null time2'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add no time1, when needed for openClose', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            activityDict.category = 'Entertainment';
            activityDict.time1 = undefined;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'openClose';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null time1'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add time1 > time 2', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'Rock the Bells';
            activityDict.description = 'An all day awesome concert!';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time1 = tenPM;
            //10pm in milliseconds senice midnight
            activityDict.time2 = sevenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';
            
            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'invalid times'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add begindate > enddate', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date2.getTime();
            activityDict.enddate = date1.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'invalid dates'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });


    describe('Activity.add lowprice > highprice', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '300';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'invalid prices'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add lownumparticipants > highnumparticipants', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '10';
            activityDict.highnumparticipants = '1';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'invalid participants'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add null low price', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            //activityDict.lowprice = '25';
            activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null lowprice'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add null high price', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'backstreet boys concert';
            activityDict.description = 'I want it that way...';
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.begindate = date1.getTime();
            activityDict.enddate = date2.getTime();
            activityDict.lowprice = '25';
            //activityDict.highprice = '200';
            activityDict.lownumparticipants = '1';
            activityDict.highnumparticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: 'null highprice'};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add free activity', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'walk in the';
            activityDict.description = "It's nice outside";
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.beginDate = date1.getTime();
            activityDict.endDate = date2.getTime();
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lowNumParticipants = '0';
            activityDict.highNumParticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add activity with no flag', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'walk in the';
            activityDict.description = "It's nice outside";
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            //activityDict.flag = 'startEnd';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.beginDate = date1.getTime();
            activityDict.endDate = date2.getTime();
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lowNumParticipants = '0';
            activityDict.highNumParticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: "null flag"};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add activity with invalid flag', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'walk in the';
            activityDict.description = "It's nice outside";
            activityDict.category = 'Entertainment';
            //7pm in milliseconds since midnight
            var sevenPM = 1000 * 60 * 60 * 19;
            activityDict.time1 = sevenPM;
            //10pm in milliseconds senice midnight
            var tenPM = 1000 * 60 * 60 * 22;
            activityDict.time2 = tenPM;
            activityDict.flag = 'startEeend';
            //date is june 15th 2013
            var date1 = new Date(2013, 6, 15, 19, 0, 0, 0);
            var date2 = new Date(2013, 6, 15, 22, 0, 0, 0);
            activityDict.beginDate = date1.getTime();
            activityDict.endDate = date2.getTime();
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lowNumParticipants = '0';
            activityDict.highNumParticipants = '10';
            //oracle arena
            activityDict.latitude = '37.751';
            activityDict.longitude = '-122.200';
            activityDict.duration = '3';

            Activity.add(activityDict, function(response){
                var expected = {errCode: 6, message: "invalid flag"};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add lowNumParticipants 0', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '0';
            activityDict.highnumparticipants = '3';
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 6, message: "invalid participants"};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add highNumParticipants 0', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '5';
            activityDict.highnumparticipants = '0';
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 6, message: "invalid participants"};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add invalid duration', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '5';
            activityDict.highnumparticipants = '6';
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '0';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 6, message: "invalid duration"};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add time1 = 0', function(){
        it('should return errCode:6', function(done){
            var activityDict = {};
            activityDict.name = 'jogging';
            activityDict.description = 'go for a run with some friends!';
            activityDict.category = 'Sports';
            activityDict.time1 = '0';
            activityDict.time2 = '5';
            activityDict.flag = 'startEnd';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '0';
            activityDict.highprice = '0';
            activityDict.lownumparticipants = '5';
            activityDict.highnumparticipants = '6';
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                var expected = {errCode: 1};
                assert.deepEqual(response,expected);
                done();
            });
        });
    });

    describe('Activity.add duplicate activities', function(){
        it('should return errCode:1', function(done){
            var activityDict = {};
            activityDict.name = 'playing tennis';
            activityDict.description = 'go to a park near by and play tennis';
            activityDict.category = 'Sports';
            activityDict.time1 = undefined;
            activityDict.time2 = undefined;
            activityDict.flag = 'anyTime';
            activityDict.begindate = undefined;
            activityDict.enddate = undefined;
            activityDict.lowprice = '1';
            activityDict.highprice = '2';
            activityDict.lownumparticipants = '2';
            activityDict.highnumparticipants = '4';
            activityDict.latitude = undefined;
            activityDict.longitude = undefined;
            activityDict.duration = '2';

            Activity.add(activityDict, function(response)
            {
                
                activityDict = {};
                activityDict.name = 'playing tennis';
                activityDict.description = 'go to a park near by and play tennis';
                activityDict.category = 'Sports';
                activityDict.time1 = undefined;
                activityDict.time2 = undefined;
                activityDict.flag = 'anyTime';
                activityDict.begindate = undefined;
                activityDict.enddate = undefined;
                activityDict.lowprice = '1';
                activityDict.highprice = '2';
                activityDict.lownumparticipants = '2';
                activityDict.highnumparticipants = '4';
                activityDict.latitude = undefined;
                activityDict.longitude = undefined;
                activityDict.duration = '2';

                Activity.add(activityDict, function(response)
                {
                    var expected = {errCode: 10, message: "That Activity already exists."};
                    assert.deepEqual(response,expected);
                    done();
                });
            });
        });
    });
});