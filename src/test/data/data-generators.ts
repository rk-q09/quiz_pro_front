import { faker } from '@faker-js/faker';

export const userGenerator = () => ({
  id: faker.datatype.uuid(),
  username: faker.word.noun(8),
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const quizGenerator = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.word(),
  questions: {
    content: faker.lorem.word(),
    choices1: faker.lorem.word(),
    choices2: faker.lorem.word(),
    choices3: faker.lorem.word(),
    choices4: faker.lorem.word(),
    answer: 1
  }
});
