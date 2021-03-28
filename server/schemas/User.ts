import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";

// user schema as List
export const User = list({
  //access,
  //ui

  //fields
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    products: relationship({ ref: "Product.user", many: true }),
  },
});
