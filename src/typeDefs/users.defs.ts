import { gql } from "apollo-server-core";
export type User = {
  id?: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};
export const usersDef = gql`
  type User {
    id: Int
    name: String
    email: String
    username: String
  }

  type Query {
    users: [User]
    user(name: String, username: String, email: String, password: String): User
  }

  type Mutation {
    createUser(
      name: String
      username: String
      email: String
      password: String
    ): User
    updateUser(
      id: Int
      name: String
      username: String
      email: String
      password: String
    ): User
    deleteUser(id: Int): Respond
  }
`;
