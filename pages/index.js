import React, { useContext } from 'react';

export default function Home() {
  return (
    <>
      <Title />
    </>
  );
}

const Title = () => {
  return (
    <div className="flex flex-col items-center mt-10 font-normal text-4xl font-lato">
      <h1>Please meet some talented people who’ve worked at Avast.</h1>
    </div>
  );
};
