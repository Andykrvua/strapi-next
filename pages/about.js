import getMembers from './api/members';

export default function About({ members }) {
  console.log('members', members);
  return (
    <div className="container">
      <h1>About page</h1>
      <ul>
        <li>About</li>
        <li>Link</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const members = await getMembers();

  return {
    props: {
      members,
    },
  };
}
