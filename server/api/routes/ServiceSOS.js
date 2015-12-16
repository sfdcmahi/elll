/*
 * Project Elll SOS service.
 */

exports.sosImpl = function (req, res)
{
        var mobile = req.body.mobile;

        console.log(mobile);
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end("Successful");
};
