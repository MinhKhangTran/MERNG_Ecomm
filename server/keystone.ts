//dotenv config
import "dotenv/config";
//keystone magic
import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
//schemas
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductPhoto } from "./schemas/ProductPhoto";
import { Role } from "./schemas/Role";

// database
const dbURL = process.env.MONGO_URI;

// session duration
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 7,
  secret: process.env.COOKIE_SECRET as string,
};

// auth beim abruf des Interfaces
const { withAuth } = createAuth({
  // user list mit identify und pw
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

// config keystone
export default withAuth(
  config({
    // server
    server: {
      cors: {
        origin: [process.env.CLIENT_URL as string],
        credentials: true,
      },
    },
    // db
    db: {
      adapter: "mongoose",
      url: dbURL as string,
      async onConnect(keystone) {
        console.log("✨ Verbunden mit der Datenbank 😬");
      },
    },

    // lists
    lists: createSchema({
      User,
      Product,
      ProductPhoto,
      Role,
    }),
    //falls man manuel resolvers machen muss
    // extendGraphqlSchema,

    // ui
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
      // isAccessAllowed: () => true,
    },
    //session
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email`,
    }),
  })
);
