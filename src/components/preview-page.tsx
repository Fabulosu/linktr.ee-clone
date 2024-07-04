import React from 'react';

interface Props {
  username: string;
}

const PreviewPage: React.FC<Props> = ({ username }) => {
  return (
    <iframe
      src={"/" + username}
      width="325px"
      height="650px"
      className="ml-5 border-4 border-primary rounded-[2rem] shadow-xl shadow-accent"
      allowFullScreen
    />
  )
}

export default PreviewPage;