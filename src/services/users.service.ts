import { Context } from "apollo-server-core";
import { GraphQLError } from "graphql";
import { Knex } from "../database/Knex";
import { User } from "../typeDefs/users.defs";

type UserParams = {
  parent: any;
  args: User;
  ctx: Context;
};
type Params = {
  parent: any;
  args: any;
  ctx: Context;
};
export const UserServices = {
  // Get All Users
  async users({ parent, args, ctx }: Params) {
    const data: User[] = await Knex.select().table("users");
    return data;
  },
  // Get One User
  async user({ parent, args, ctx }: UserParams) {
    const { email, id, name, username } = args;
    const user = Knex.select();
    if (id) {
      user.orWhere({ id });
    }
    if (email) {
      user.orWhere({ email });
    }
    if (username) {
      user.orWhere("username", "like", `%${username}%`);
    }
    if (name) {
      user.orWhere("name", "like", `%${name}%`);
    }
    const data: User[] = await user.from("users");
    console.log(data, args);
    return data[0];
  },
  // Create New User
  async createUser({ parent, args, ctx }: UserParams) {
    const isSuccess: number[] = await Knex("users").insert(args);
    console.log(isSuccess);
    if (isSuccess) {
      const data: User[] = await Knex.select("id", "username", "name", "email")
        .from("users")
        .where({ id: isSuccess[0] });
      console.log(data);

      return data[0];
    }
    throw new GraphQLError("Error while creating user");
  },
  // Update an Exsiting User Data
  async updateUser({ parent, args, ctx }: UserParams) {
    const { email, id, name, username, password } = args;
    const isSuccess: any = await Knex("users")
      .where({ id })
      .update({ email, name, username, password });

    if (isSuccess === 1) {
      const data: User[] = await Knex.select("id", "username", "name", "email")
        .from("users")
        .where({ id });
      return data[0];
    }
    throw new GraphQLError("Error while updating user");
  },
  // Delete User Data
  async deleteUser({ parent, args, ctx }: UserParams) {
    const { id } = args;
    const isSuccess: number = await Knex("users").where({ id }).delete();
    if (isSuccess === 1) {
      return {
        status: "success",
        msg: `Success delete user with id ${id}`,
      };
    }
    throw new GraphQLError("Error user not found");
  },
};
