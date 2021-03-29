import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { permissions } from "../acces";
import { permissionFields } from "./fields";

export const Role = list({
  //   access: {
  //     create: permissions.canManageRoles, //admin
  //     read: permissions.canManageRoles, //admin
  //     update: permissions.canManageRoles, //admin
  //     delete: permissions.canManageRoles, //admin
  //   },
  //   ui: {
  //     hideCreate: (args) => !permissions.canManageRoles(args),
  //     hideDelete: (args) => !permissions.canManageRoles(args),
  //     isHidden: (args) => !permissions.canManageRoles(args),
  //   },

  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: { itemView: { fieldMode: "read" } },
    }),
  },
});
