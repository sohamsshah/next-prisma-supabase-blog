import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, email } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email } },
      published: true,
    },
  });
  res.json(result);
}
