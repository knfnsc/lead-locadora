interface Profile {
  id: number;
  name: string;
  createdAt: Date;
  isAdmin: boolean;
  favouritesID?: number[];
}

type Guest = Profile & { favouritesID: [] } & {
  isAdmin: false;
};

type Admin = Profile & { isAdmin: true };
export type User = Guest | Admin;
