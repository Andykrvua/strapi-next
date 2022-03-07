import styled from '@emotion/styled';
export default function Post({ title, content }) {
  return (
    <PostStyled>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </PostStyled>
  );
}

const PostStyled = styled.div`
  margin-bottom: 15px;
  background-color: #727881;
  padding: 15px;
  h3 {
    margin-bottom: 5px;
  }
`;
