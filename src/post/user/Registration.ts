import { Request, Response } from "express";
import logger from "../../logger";
import { AppDataSource } from "../../dataSource";
import { User } from "../../entity/User";

export const UserRegistration = async function (req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  userRepository
    .findOne({
      where: {
        password: req.body.password,
      },
      select: {
        email: true,
      },
    })
    .then((user: User) => {
      if (user === null) {
        const user = new User();
        user.email = req.body.email;
        user.setPassword(req.body.password);
        userRepository
          .save(user)
          .then(() => {
            res.send({
              success: true,
            });
          })
          .catch((err: string) => {
            logger.error(err);
          });
      } else {
        res.send({
          success: false,
        });
      }
    })
    .catch((err: string) => {
      logger.error(err);
    });
};
