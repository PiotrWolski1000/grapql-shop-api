module.exports = (buildSchema) => {
    return {
      productsSchema: buildSchema(`
        type Product {
          pid: ID
          name: String
          price: Int
          description: String
          id_pc: Int
          id_u: Int
          quantity: Int
        }

        type Query {
          products(id: ID): [Product]
        }`
      ),
      productsQuery: `
        {
          products {
            pid
            name
            price
            description
            id_pc
            id_u
            quantity
          }
        }`
      }
  };