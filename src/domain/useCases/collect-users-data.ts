import { IFakeApi, IUsers } from "../protocols/fake-api"
import { IFormatedUsers } from "./IFormatedUser";

export default class CollectUsersData {
    constructor(
        private readonly fakeApi: IFakeApi
    ) { }

    async execute(): Promise<IFormatedUsers[]> {
        const usersData = await this.fakeApi.getFakeUsersData();
        return this.format(usersData);
    }

    private format(usersData: IUsers[]): IFormatedUsers[] {
        return usersData.map(user => {
            const isNiucoEmail = user.email.includes('@niuco.com.br');
            if (!isNiucoEmail) user.email = this.hashEmail(user.email);

            const isActiveUser = user.status === "active";

            const { role, status, ...rest } = user;
            return {
                ...rest,
                last_activity: new Date(user.last_activity * 1000),
                paying: isActiveUser && ['editor', 'admin'].includes(user.role),
                active: isActiveUser,
            }
        });
    }

    private hashEmail(email: string) {
        const splitedEmail = email.split('@');
        const emailDomain = splitedEmail[1];
        const aliasEmail = splitedEmail[0];
        const aliasEmailStart = aliasEmail.substring(0, 2);
        const aliasEmailEnd = aliasEmail.substring(aliasEmail.length - 2);
        return `${aliasEmailStart}***${aliasEmailEnd}@${emailDomain}`;
    }
}