import { hash, compare } from "bcrypt";
import { Ilogin, Iregister, Iuser } from "../types/app";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export default new (class userServices {
  async register(body: Iregister) {
    try {
      const findEmail = await prisma.user.findFirst({
        where: { email: body.email },
      });
      if (findEmail) {
        throw new Error("email alredy register");
      }

      const hashPassword = await hash(body.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: body.email,
          password: hashPassword,
          userName: body.userName,
          wallet: {
            create: {
              totalAmount: 0,
            },
          },
        },
        include: {
          wallet: true,
        },
      });

      return newUser;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async login(body: Ilogin) {
    try {
      const userByEmail = await prisma.user.findFirst({
        where: { email: body.email },
      });
      if (!userByEmail) {
        throw new Error("wrong input try again");
      }

      const matchPassword = await compare(body.password, userByEmail.password);
      if (!matchPassword) {
        throw new Error("wrong input try again");
      }

      const payload = {
        id: userByEmail.id,
        name: userByEmail.userName,
        email: userByEmail.email,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: "5d",
      });

      return token;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async getLoginUser(userId: string) {
    try {
      const findUser = await prisma.user.findFirst({
        where: { id: userId },
        include: {
          wallet: true,
        },
      });

      if (!findUser) {
        throw new Error("user not found");
      }

      const payload = {
        id: findUser.id,
        username: findUser.userName,
        email: findUser.email,
        wallet: findUser.wallet,
      };
      return payload;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async getAllUser() {
    try {
      return (await prisma.user.findMany()).map((user) => {
        return {
          id: user.id,
          name: user.userName,
          email: user.email,
        };
      });
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async updateUser(body: Iuser, userId: string) {
    try {
      const findUser = await prisma.user.findFirst({ where: { id: userId } });

      if (!findUser) {
        throw new Error("user not found");
      }

      const updateUser = await prisma.user.update({
        where: { id: findUser.id },
        data: body,
      });

      return { username: updateUser.userName };
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
})();
