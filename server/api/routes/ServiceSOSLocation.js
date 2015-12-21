/*
 * Project Elll SOS Location service.
 */

exports.sosLocationImpl = function (req, res)
{
    var mobile = req.body.mobile;
    var reqID = req.params.requestid;

    console.log(mobile);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end("Successfully recived: " + reqID);
};
