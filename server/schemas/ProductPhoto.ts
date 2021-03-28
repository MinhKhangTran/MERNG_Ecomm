import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from "@keystone-next/cloudinary";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.CLOUDINARY_KEY as string,
  apiSecret: process.env.CLOUDINARY_SECRET as string,
  folder: "gönnershop",
};

export const ProductPhoto = list({
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
