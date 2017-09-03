import { faker } from 'ember-cli-mirage';

export default function(server) {
  faker.seed(20);

  server.createList('tag', 10);
  server.createList('user', 200);
}
