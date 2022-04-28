import CollectUsersData from "../../../domain/useCases/collect-users-data";
import FakeApi from "../../../infra/fake-api/fake-api";

export default function collectUsersUseCase() {
    const fakeApi = new FakeApi();
    const collectUsersData = new CollectUsersData(fakeApi);
    return collectUsersData;
}