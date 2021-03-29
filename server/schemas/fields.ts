import { checkbox } from "@keystone-next/fields";

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: "Role can CRUD products",
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: "Role CRUD users",
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: "Role can CRUD roles",
  }),
};

export type Permission = keyof typeof permissionFields;

//return aus einem Object ein Array mit den keys, hier: canManageProducts, canSeeOtherUses ...Rest
export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
