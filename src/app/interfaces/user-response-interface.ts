export interface UserReponse {
  id?: number;
  name?: string;
  age?: number;
  position?: Position;
  joinDate?: Date;
}

export interface Position {
  idPosition?: number;
  jobTitle?: string;
}
