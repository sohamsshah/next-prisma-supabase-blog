import prisma from "../../../lib/prisma";

// Transaction: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#transaction-api

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
