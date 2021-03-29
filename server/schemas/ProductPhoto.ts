import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import { isSignedIn, permissions, rules } from "../acces";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.CLOUDINARY_KEY as string,
  apiSecret: process.env.CLOUDINARY_SECRET as string,
  folder: "gönnershop",
};

export const ProductPhoto = list({
  // access: {
  //   create: isSignedIn, //only signed in User can create a photo
  //   read: () => true, //everyone can read photos
  //   update: permissions.canManageProducts, //admin
  //   delete: permissions.canManageProducts, //admin
  // },

  fields: {
    //cloudinary
    photo: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    alt: text(),

    //relationship
    product: relationship({ ref: "Product.photo" }),
  },
  ui: {
    listView: {
      initialColumns: ["photo", "alt", "product"],
    },
  },
});
