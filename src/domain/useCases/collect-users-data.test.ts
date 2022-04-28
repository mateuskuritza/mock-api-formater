import { IFakeApi, IUsers } from "../protocols/fake-api";
import CollectUsersData from "./collect-users-data"

class mockFakeApi implements IFakeApi {
    users: IUsers[];

    constructor(users: IUsers[]) {
        this.users = users
    }

    async getFakeUsersData() {
        return new Promise<IUsers[]>((resolve) => {
            resolve(this.users)
        })
    }
}

function makeSut(users: IUsers[]) {
    const fakeApi = new mockFakeApi(users);
    return new CollectUsersData(fakeApi);
}

describe('collect-users-data', () => {
    it('should return an array of formated users', async () => {
        const users = [
            {
                "id": "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
                "name": "John Connor",
                "email": "john.connor@niuco.com.br",
                "status": "active" as 'active',
                "role": "admin" as 'admin',
                "last_activity": 1649179152
            }
        ];

        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0]).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            last_activity: expect.any(Date),
            paying: expect.any(Boolean),
            active: expect.any(Boolean),
        })
    })
    it('should return an user original email if niuco domain', async () => {
        const users = [
            {
                "id": "0373e634-2d03-457e-a24d-2b0c8c3b7c37",
                "name": "John Connor",
                "email": "john.connor@niuco.com.br",
                "status": "active" as 'active',
                "role": "admin" as 'admin',
                "last_activity": 1649179152
            }
        ]
        const sut = makeSut(users);

        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].email).toEqual(expect.not.stringContaining('***'));
    })
    it('should return an user with hashed email if not niuco domain (...@niuco.com.br)', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "editor" as 'editor',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].email).toContain('***');
    })
    it('should return an inactive user if status is inactive', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "inactive" as 'inactive',
                "role": "editor" as 'editor',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].active).toBeFalsy();
    })
    it('should return an active user if status is active', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "editor" as 'editor',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].active).toBeTruthy();
    })
    it('should return an paying user if role is editor', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "editor" as 'editor',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeTruthy();
    })
    it('should return an paying user if role is admin', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "admin" as 'admin',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeTruthy();
    })
    it('should return an not paying user if role is viewer', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "viewer" as 'viewer',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
    it('should return an not paying user if role is system', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "active" as 'active',
                "role": "system" as 'system',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
    it('should return an not paying user if role is editor but status is inactive', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "inactive" as 'inactive',
                "role": "editor" as 'editor',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
    it('should return an not paying user if role is admin but status is inactive', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "inactive" as 'inactive',
                "role": "admin" as 'admin',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
    it('should return an not paying user if role is editor and status is inactive', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "inactive" as 'inactive',
                "role": "viewer" as 'viewer',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
    it('should return an not paying user if role is system and status is inactive', async () => {
        const users = [
            {
                "id": "5fb75748-efa6-4d48-9930-14289d87466f",
                "name": "Kyle Reese",
                "email": "kyle.reese@gmail.com",
                "status": "inactive" as 'inactive',
                "role": "system" as 'system',
                "last_activity": 1649073600
            }
        ]
        const sut = makeSut(users);
        const formatedUsers = await sut.execute();

        expect(formatedUsers.length).toBeDefined();
        expect(formatedUsers[0].paying).toBeFalsy();
    })
})