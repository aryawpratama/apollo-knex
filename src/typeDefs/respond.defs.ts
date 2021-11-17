import { gql } from "apollo-server-core";
export const respondDef = gql`
  type Respond {
    status: String
    msg: String
  }
`;
