import bcrypt from "bcrypt";

const { hashSync, compareSync } = bcrypt;

export const performPasswordHash = (password: string) => hashSync(password, 10);

export const comparePassword = ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => compareSync(password, hashedPassword);
