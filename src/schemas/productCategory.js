module.exports = (buildSchema) => {
    return {
      productCategorySchema: buildSchema(`
        type ProductCategory {
          pcid: ID
          name: String
        }

        type Query {
          productsCategory(id: ID): [ProductCategory]
        }`
      ),
      productCategoryQuery: `
        {
          productsCategory {
            pcid
            name
          }
        }`
      }
  };