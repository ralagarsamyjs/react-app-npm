import React from "react";

interface IHeadingProps {
  title: string;
}

function Heading(props: IHeadingProps) {
  const { title } = props;
  return (
    <div>
      <h2 className="heading-text">{title}</h2>
    </div>
  );
}

export default Heading;
