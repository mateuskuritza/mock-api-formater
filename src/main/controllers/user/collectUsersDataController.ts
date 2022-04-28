import { Request, Response } from "express";
import collectUsersUseCase from "../../factories/user/collect-users-use-case";

export default async function collectUsersDataController(req: Request, res: Response) {
    const usersData = await collectUsersUseCase().execute();
    res.send(usersData);
}