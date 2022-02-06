import React, { useContext } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Title />
    </>
  );
}

const Title = () => {
  return (
    <div className="mt-10 flex flex-col items-center font-lato text-4xl font-normal">
      <h1>Please meet some talented people who’ve worked at Avast.</h1>
    </div>
  );
};
