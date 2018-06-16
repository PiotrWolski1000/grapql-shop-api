const connection = require('../config.js');
const { graphql, buildSchema } = require('graphql');

const { productsSchema, productsQuery } = require('../schemas/products')(buildSchema);


module.exports = {

    all: (req, res) => {
        connection.query('SELECT * FROM product', async (err, rows) => {
            if (!err) {
                const response = await graphql(productsSchema, productsQuery, {products: rows});
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

    create: (req, res, next) => {
        let response;
        const name = req.body.name;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const description = req.body.description;
        const productCategory = req.body.productCategory;
        const id_u = req.body.id_u//user id later change to be from a cookie?

        if (
            typeof name !== 'undefined'
            && typeof price !== 'undefined'
            && typeof quantity !== 'undefined'
            && typeof description !== 'undefined'
            && typeof productCategory !== 'undefined'
            && typeof id_u !== 'undefined'

        ) {
            connection.query('INSERT INTO product (id_pc, id_u, name, price, description, quantity)  VALUES (?, ?, ?, ?, ?, ?)',
                [productCategory, id_u, name, price, description, quantity],
                (err, result) => {
                    handleSuccessOrErrorMessage(err, result, res);
                });

        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },

     destroy: (req, res) => {
        connection.query('DELETE FROM product WHERE pid = ?', [req.params.pid], (err, result) => {
            handleSuccessOrErrorMessage(err, result, res);
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
