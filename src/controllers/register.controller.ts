import { User } from '@src/models/user.model';
import { resJson } from '@src/utils/responseHelpers';
import { registerValidation } from '@src/utils/validation';
import { initializeNewUser } from '@src/utils/initializeNewUser';
import { IRequest, IResponse } from '@src/interfaces/express.interface';
import { generateHashedPassword } from '@src/utils/generateHashedPassword';

export const registerNewUser = async (req: IRequest, res: IResponse): Promise<void | IResponse> => {
  // validate user before saving to database
  const { error } = registerValidation(req.body);
  if (error) return resJson(res, 400, false, error.details[0].message, error);

  // check if email exists
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists) return resJson(res, 400, false, 'Email already Exists');

  // proceed to save user
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = await generateHashedPassword(password);

  // save new user - with hashedPassword
  const user = new User({ name, email, password: hashedPassword });

  try {
    const registeredUser = await initializeNewUser(user);
    resJson(res, 201, true, 'User Registered Successfully', 'no error', registeredUser);
  } catch (err) {
    resJson(res, 500, false, 'User Registeration Failed', err);
  }
};
