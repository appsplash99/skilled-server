import consola from 'consola';
import { User } from '../models/user.model';
import { resJson } from '../utils/responseHelpers';
import { registerValidation } from '../utils/validation';
import { initializeNewUser } from '../utils/initializeNewUser';
import { IRequest, IResponse } from '../interfaces/express.interface';
import { generateHashedPassword } from '../utils/generateHashedPassword';

export const registerNewUser = async (req: IRequest, res: IResponse): Promise<void | IResponse> => {
  try {
  // validate user before saving to database
  const { error } = registerValidation(req.body);
  consola.info(error)
  if (error) return resJson(res, 400, false, error.details[0].message, error);

  // check if email exists
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  consola.info({emailAlreadyExists})
  if (emailAlreadyExists) return resJson(res, 400, false, 'Email already Exists');

  // proceed to save user
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = await generateHashedPassword(password);
  consola.info({hashedPassword})

  // save new user - with hashedPassword
  const user = new User({ name, email, password: hashedPassword });
  consola.info({user})

  const registeredUser = await initializeNewUser(user);
  consola.info({registeredUser})
  return resJson(res, 201, true, 'User Registered Successfully', 'no error', registeredUser);
  } catch (err) {
    return resJson(res, 500, false, 'User Registeration Failed', err);
  }
};
