import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isSignedIn, rules } from "../acces";

export const Product = list({
  // access: {
  //   create: isSignedIn, //signed in users
  //   read: rules.canManageProduct, //own
  //   update: rules.canManageProduct, //own
  //   delete: rules.canManageProduct, //own
  // },
  ui: {},
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    price: integer(),
    //relationship many-to-one zu person
    // user: relationship({
    //   ref: "User.products",
    //   //die person die angemeldet ist ist der user => connect to id of user
    //   defaultValue: ({ context }) => ({
    //     connect: { id: context.session.itemId },
    //   }),
    // }),
    //relationship one-to-one zu photo
    photo: relationship({
      ref: "ProductPhoto.product",
      ui: {
        displayMode: "cards",
        cardFields: ["photo", "alt"],
        inlineCreate: { fields: ["photo", "alt"] },
        inlineEdit: { fields: ["photo", "alt"] },
      },
    }),
  },
});
