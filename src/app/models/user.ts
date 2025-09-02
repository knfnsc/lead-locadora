interface BaseUser {
  readonly id: number;
  name: string;
  password: string;
  readonly isAdmin: boolean;
  readonly createdAt: Date;
  readonly token: string;
}

interface RegularUser extends BaseUser {
  readonly isAdmin: false;
  favoriteID?: number;
}

interface AdminUser extends BaseUser {
  readonly isAdmin: true;
}

export type User = RegularUser | AdminUser;
export interface PublicUser extends Omit<User, "password" | "token"> {}
