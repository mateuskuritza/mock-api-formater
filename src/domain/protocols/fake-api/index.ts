interface IFakeApi {
    getFakeUsersData(): Promise<IUsers[]>;
}

interface IUsers {
    id: string,
    name: string;
    email: string;
    status: 'active' | 'inactive';
    role: 'viewer' | 'system' | 'editor' | 'admin';
    last_activity: number
}

export { IFakeApi, IUsers };