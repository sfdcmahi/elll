/*
 * Project Elll  Current Location service.
 */

exports.currentLocationImpl = function (req, res)
{
        var mobile = req.body.mobile;

        console.log(mobile);
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end("Successful");
};
