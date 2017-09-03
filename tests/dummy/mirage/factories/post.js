import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title() {
    return faker.lorem.sentence(3);
  },

  subtitle() {
    return faker.lorem.sentence();
  },

  content() {
    return faker.lorem.paragraphs();
  },

  afterCreate(post, server) {
    let users = server.schema.users.all().models;
    let tags = server.schema.tags.all().models;
    let comments = server.createList('comment', faker.random.number(3));

    post.authorId = users[faker.random.number(users.length - 1)].id;
    post.tagIds = tags.slice(faker.random.number(tags.length - 1)).map(tag => tag.id);
    post.commentIds = comments.map(comment => comment.id);

    comments.forEach(comment => {
      comment.postId = post.id;
      comment.authorId = users[faker.random.number(users.length - 1)].id;

      comment.post.save();
      comment.author.save();
    });

    post.author.save();
    post.tags.save();
    post.comments.save();
  }
});
