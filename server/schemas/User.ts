import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";
import { permissions, rules } from "../acces";

// user schema as List
export const User = list({
  //access,
  // access: {
  //   create: () => true, //everyone can create an account
  //   read: rules.canManageUsers, //own
  //   update: rules.canManageUsers, //own
  //   //you cannot delete yourself, only admins
  //   delete: permissions.canManageUsers,
  // },
  // // ui
  // ui: {
  //   //hide ui if user has no permissions
  //   hideCreate: (args) => !permissions.canManageUsers(args),
  //   hideDelete: (args) => !permissions.canManageUsers(args),
  // },

  //fields
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // products: relationship({ ref: "Product.user", many: true }),
    role: relationship({ ref: "Role.assignedTo" }),
  },
});
