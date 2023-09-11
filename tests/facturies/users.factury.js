import { db } from '../database/serverData.js';
import faker from 'faker';
import bcrypt from 'bcrypt';
export async function createUser() {
  return await db.collection('Users').insertOne({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
  });
}
export async function generateValidBody() {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
}
