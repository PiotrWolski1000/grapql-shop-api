const connection = require('../config.js');
const { graphql, buildSchema } = require('graphql');

const { userAuthenticationSchema, userAuthenticationQuery } = require('../schemas/userAuthentication')(buildSchema);

const { allUserSchema, allUserQuery } = require('../schemas/userAll')(buildSchema);

module.exports = {

    login: (req, res) => {
        connection.query('SELECT uid, username, password, email  FROM user where username = ? ', [req.params.username], async (err, rows) => {
            if (!err) {
                const response = await graphql(userAuthenticationSchema, userAuthenticationQuery, {loggedUsers: rows});
                // console.log(response)
                // console.log(typeof(response))
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': response.data
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
}

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err){
        let response;
        if (result.affectedRows != 0) {
            response = {'result' : 'success'};
        } else {
            response = {'msg' : 'No Result Found'};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
}
