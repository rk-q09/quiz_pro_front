import { faker } from '@faker-js/faker';

export const userGenerator = () => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});
