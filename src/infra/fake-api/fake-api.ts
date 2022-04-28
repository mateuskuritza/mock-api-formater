import { IFakeApi, IUsers } from "../../domain/protocols/fake-api";
import axios from 'axios'

export default class FakeApi implements IFakeApi {

    constructor() { }

    async getFakeUsersData(): Promise<IUsers[]> {
        const response = await axios.get('http://localhost:8080/users')
        return response.data
    }
}
