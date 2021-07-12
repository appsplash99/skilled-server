import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { resJson } from '../utils/responseHelpers';
import { loginValidation } from '../utils/validation';
import { generateToken } from '../utils/generateToken';
import { IRequest, IResponse } from '../interfaces/express.interface';

export const loginUser = async (req: IRequest, res: IResponse): Promise<void | IResponse> => {
  // validate user before logging in
  const { error } = loginValidation(req.body);
  if (error) return resJson(res, 400, false, error.details[0].message, error);

  // does email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return resJson(res, 404, false, `Email (${req.body.email}) not found!`);

  // is typed password correct?
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return resJson(res, 400, false, 'Please Enter Correct Password', 'no error');

  const token = generateToken(user);

  // pass token into response headers
  res.header('auth-token', token).json({
    success: true,
    token,
  });
};
