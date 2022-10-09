import { Client } from '@notionhq/client';

// 노션으로 만든 API 등록
const notion = new Client({
  auth: 'secret_dkkNXMLZPDanuvkg6ivS6F5q4KZ2JwZX6yuL2c0siPK',
});

const databaseId = 'e35f07a9212940279ddfbff723aa3f7b';

// 아이템 상세조회 API
async function getDetail(pageId, propertyId) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
export default async function handler(req, res) {
  try {
    const { pageId, propertyId } = req.query;

    const response = await getDetail(pageId, propertyId);
    res.status(200).json({ detail: response, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
