var ftpd = require('./ftpd.js');

var server = ftpd.createServer("177.71.130.255", "/home/ec2-user/ftpd", 14000, 50);

// this event passes in the client socket which emits further events
// but should recommend they don't do socket operations on it
// so should probably encapsulate and hide it
server.on("client:connected", function(socket) {
    var username = null;
    console.log("client connected: " + socket.remoteAddress);
    socket.on("command:user", function(user, success, failure) {
        if (user) {
            username = user;
            success();
        } else failure();
    });

    socket.on("command:pass", function(pass, success, failure) {
        if (pass) success(username);
        else failure();
    });
});
server.debugging = 4;
server.listen(21);
