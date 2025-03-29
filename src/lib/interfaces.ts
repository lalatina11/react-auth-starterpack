export interface UserFromDB {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  isAuthenticated: boolean;
  authenticationCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserSession{
    token:string|null
    error:boolean
    user:UserFromDB
}
