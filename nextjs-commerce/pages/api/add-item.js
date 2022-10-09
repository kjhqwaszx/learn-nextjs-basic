import { Client } from '@notionhq/client';

// 노션으로 만든 API 등록
const notion = new Client({
  auth: 'secret_dkkNXMLZPDanuvkg6ivS6F5q4KZ2JwZX6yuL2c0siPK',
});

const databaseId = 'e35f07a9212940279ddfbff723aa3f7b';

// 아이템 등록 API
async function addItem(name) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
export default async function handler(req, res) {
  const { name } = req.query;
  if (name == null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(name);
    res.status(200).json({ message: `Success ${name} added` });
  } catch (error) {
    res.status(400).json({ message: `Fail to add` });
  }
}
