import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exeptions/api-error.js';
import userModel from '../models/user-model.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';

class UserSerice {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже сужествует`);
    }

    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuidv4();

    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

	await mailService.sendActivationMail(
      email,
      `${process.env.URL_SERVER}/user/activate/${activationLink}`
    );

    return await this.#createResponseWithTokens(user);
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с email ${email} не зарегистрирован`);
    }

	const isPassEaquals = bcrypt.compare(password, user.password);
    if (!isPassEaquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    return await this.#createResponseWithTokens(user);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.verifyRefreshToken(refreshToken);
    const tokenFromBd = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromBd) {
      throw ApiError.UnauthorizedError()
    }

    const user = await userModel.findById(userData.id);

    return await this.#createResponseWithTokens(user);
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    await user.save();
  }

  async #createResponseWithTokens(user) {
    const userData = new UserDto(user);

	const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(userData.id, tokens.refreshToken);

	return { ...tokens, user: userData };
  }
}

export default new UserSerice();
