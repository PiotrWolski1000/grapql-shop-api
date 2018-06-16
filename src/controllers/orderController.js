const connection = require('../config.js');
const { graphql, buildSchema } = require('graphql');

const { ordersSchema, ordersQuery } = require('../schemas/orders')(buildSchema);


module.exports = {

    all: (req, res) => {
        connection.query('SELECT * FROM `order` inner join user on id_u = uid', async (err, rows) => {
            if (!err) {
                const response = await graphql(ordersSchema, ordersQuery, {orders: rows});
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
    orderById: (req, res) => {
        const oid = req.body.oid;
        if(oid !== 'undefined')
        connection.query('SELECT * FROM `order` WHERE oid=?',[oid] , async (err, rows) => {
            if (!err) {
                const response = await graphql(ordersSchema, ordersQuery, {orders: rows});
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
    orderById2: (req, res) => {
        connection.query('SELECT * FROM `order` WHERE oid=?',[req.params.id] , async (err, rows) => {
            if (!err) {
                const response = await graphql(ordersSchema, ordersQuery, {orders: rows});
                // console.log(response)
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
    }
};

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
