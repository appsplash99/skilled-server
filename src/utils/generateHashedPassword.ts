import bcrypt from 'bcrypt';

export const generateHashedPassword = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};
