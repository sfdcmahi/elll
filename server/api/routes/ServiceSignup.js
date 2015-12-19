/*
 * Project Elll Signup service.
 */

exports.signupImpl = function (req, res)
{
        var data = req.body;

        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	//console.log(data);
        res.end("Successful..Data: "+ JSON.stringify(data.mobile));
};
