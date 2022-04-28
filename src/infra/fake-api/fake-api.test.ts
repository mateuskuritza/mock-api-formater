import FakeApi from "./fake-api";

describe('FakeApi.getFakeUsersData', () => {
    it('should fetch and return correctly fake users', async () => {
        const sut = new FakeApi()
        const users = await sut.getFakeUsersData()

        expect(users.length).toBeDefined()

        expect(users[0]).toMatchObject({
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            status: expect.any(String),
            role: expect.any(String),
            last_activity: expect.any(Number),
        })
    })
})
