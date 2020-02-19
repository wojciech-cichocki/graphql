const users = [
  {
    id: "1",
    name: "User1",
    email: "user1@example.com",
    password: "password"
  },
  {
    id: "2",
    name: "User2",
    email: "user2@example.com",
    password: "password"
  },
  {
    id: "3",
    name: "User3",
    email: "user3@example.com",
    password: "password"
  }
];

const posts = [
  {
    id: "1",
    title: "title1",
    body: "This is title1",
    author: "1"
  },
  {
    id: "2",
    title: "title2",
    body: "This is title2",
    author: "1"
  },
  {
    id: "3",
    title: "title3",
    body: "This is title3",
    author: "2"
  }
];

const comments = [
  {
    id: "1",
    text: "Comment text1.",
    author: "3",
    post: "1"
  },
  {
    id: "2",
    text: "Comment text2.",
    author: "1",
    post: "2"
  },
  {
    id: "3",
    text: "Comment text3.",
    author: "2",
    post: "3"
  },
  {
    id: "4",
    text: "Comment text4.",
    author: "2",
    post: "1"
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
