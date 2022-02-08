import prisma from "../../../lib/prisma";

// Transaction: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#transaction-api

// Prisma suggests to use transaction only when all the operations are isolated. Else, the nested querying also works well for most use-cases

export default async function handle(req, res) {
  const { title, content, email } = req.body;

  const feed = await prisma.post.findMany({
    where: { published: true },
  });
  const newContent = feed.map((item) => item.title).join("\n");
  const createPost = prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email } },
      published: true,
    },
  });

  // "All Posts" is a post that contains data about all the Posts. On every new post creation, we update the "All Posts" post and add new content to it.
  const updateAllPosts = prisma.post.updateMany({
    where: {
      title: "All Posts",
    },
    data: {
      content: newContent,
    },
  });

  const result = await prisma.$transaction([createPost, updateAllPosts]);
  console.log(result);
  res.json(result);
}
