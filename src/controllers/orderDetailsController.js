const connection = require('../config.js');
const { graphql, buildSchema } = require('graphql');
const { orderDetailsSchema, orderDetailsQuery } = require('../schemas/orderDetails')(buildSchema);


module.exports = {

    all: (req, res) => {
        connection.query('SELECT * FROM order_details', async (err, rows) => {
            if (!err) {
                const response = await graphql(orderDetailsSchema, orderDetailsQuery, {ordersDetails: rows});
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
