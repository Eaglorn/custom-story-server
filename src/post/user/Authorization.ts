import { Request, Response } from "express";
import logger from "../../logger";
import { AppDataSource } from "../../dataSource";
import { User } from "../../entity/User";

export const UserAuthorization = async function (req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  let email = false;
  let password = false;
  userRepository
    .findOne({
      where: {
        email: req.body.email,
      },
      select: {
        password: true,
        type: true,
      },
    })
    .then((user: User) => {
      if (user != null) {
        if(user.isPassword({ pass: req.body.password })) {
          password = true;
        }
        email = true;
      }
      if (email && password) {
        res.send({ success: true, type: user.type });
      } else {
        res.send({
          success: false,
          email: email,
          password: password,
        });
      }
    })
    .catch((err: string) => {
      logger.error(err);
    });
};
