import { Context } from "apollo-server-core";
import { Respond } from "index";
import { UserServices } from "../services/users.service";
import { User } from "../typeDefs/users.defs";

type UsersResolvers = {
  Query: {
    users: (parent: any, args: any, ctx: Context) => Promise<User[]>;
    user: (parent: any, args: User, ctx: Context) => Promise<User>;
  };
  Mutation: {
    createUser: (parent: any, args: User, ctx: Context) => Promise<User>;
    updateUser: (parent: any, args: User, ctx: Context) => Promise<User>;
    deleteUser: (parent: any, args: any, ctx: Context) => Promise<Respond>;
  };
};
export const usersResolver: UsersResolvers = {
  Query: {
    async users(parent, args, ctx) {
      return UserServices.users({ parent, args, ctx });
    },
    async user(parent, args, ctx) {
      return UserServices.user({ parent, args, ctx });
    },
  },
  Mutation: {
    async createUser(parent, args, ctx) {
      return UserServices.createUser({ parent, args, ctx });
    },
    async updateUser(parent, args, ctx) {
      return UserServices.updateUser({ parent, args, ctx });
    },
    async deleteUser(parent, args, ctx) {
      return UserServices.deleteUser({ parent, args, ctx });
    },
  },
};
