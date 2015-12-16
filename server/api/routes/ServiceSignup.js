/*
 * Project Elll Signup service.
 */

exports.signupImpl = function (req, res)
{
        var data = JSON.stringify(req.body);

        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	console.log(req);
        res.end("Successful..Data: "+ req);
};
