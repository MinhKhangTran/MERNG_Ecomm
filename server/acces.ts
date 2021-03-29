import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

//check if user is logged in
export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

//Yes or no questions
//transforms a list of key-value pairs into an object
//new Map([["foo","bar"],["bau",42]]) ==> {foo:"bar", baz:42}
// hier resultat: z.B. {canManageProduct : true or false}
const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
  //here you can add additional yes-or-no questions
};

//rules basend on the permissions

export const rules = {
  //CRUD Products
  canManageProduct({ session }: ListAccessArgs) {
    //check if user is signed in
    if (!isSignedIn({ session })) {
      return false;
    }
    //Returns true if user can
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    //return their limited access
    return { user: { id: session.itemId } };
  },
  //CRUD Users
  canManageUsers({ session }: ListAccessArgs) {
    //check if user is signed in
    if (!isSignedIn({ session })) {
      return false;
    }
    //Returns true if user can
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    //return their limited access
    return { user: { id: session.itemId } };
  },
  //CRUD Roles
  canManageRoles({ session }: ListAccessArgs) {
    //check if user is signed in
    if (!isSignedIn({ session })) {
      return false;
    }
    //Returns true if user can
    if (permissions.canManageRoles({ session })) {
      return true;
    }
    //return their limited access
    return { user: { id: session.itemId } };
  },
};
