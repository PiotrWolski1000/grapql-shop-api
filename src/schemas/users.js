module.exports = (buildSchema) => {
    return {
      usersSchema: buildSchema(`
        type User {
          uid: ID
          username: String
          name: String
          surname: String
          address: String
          phone: Int
          email: String
        }

        type Query {
          users(id: ID): [User]
        }`
      ),
      usersQuery: `
        {
          users {
            uid
            username
            name
            surname
            address
            phone
            email
          }
        }`
      }
  };