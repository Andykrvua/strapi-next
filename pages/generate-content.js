import faker from '@withshepherd/faker';

export default function GenerateContent() {
  async function addContent() {
    for (let i = 0; i < 10; i++) {
      const postData = {
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
        },
      };

      const generate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const generateResp = await generate.json();
      console.log(generateResp);
    }
  }
  return (
    <div className="container">
      <button type="button" onClick={() => addContent()}>
        Generate content
      </button>
    </div>
  );
}
