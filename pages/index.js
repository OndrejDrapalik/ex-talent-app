import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import { FaFirstAid } from 'react-icons/fa';

export async function getServerSideProps() {
  const postQuery = firestore
    .collectionGroup('entry collection')
    .orderBy('id', 'desc');

  const entries = (await postQuery.get()).docs.map(postToJSON);
  console.log(entries);

  return {
    props: { entries },
  };
}

export default function Home(props) {
  const [entries, setEntries] = useState(props.entries);
  console.log('entries', entries);

  // sort is a mutable fn, but with sppread we make a copy first
  const shuffle = [...entries].sort(() => Math.random() - 0.5);
  console.log('shuffeled entries', shuffle);

  const length = entries.length;
  // Takes the whole number
  const firstHalf = Math.floor(length / 2);

  const colA = entries.slice(0, firstHalf);
  const colB = entries.slice(firstHalf, length);

  return (
    <>
      <Navbar />
      <div
        className="font-lato mt-10  flex flex-row
                  items-center px-[5vw] text-5xl font-normal lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]
                  "
      >
        <h1>Please meet some talented people who’ve worked at Avast.</h1>
      </div>
      {/* <div className="grid grid-cols-1 gap-5 px-[5vw] pt-14 sm:grid-cols-2  lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]">
        <PostFeed entries={entries} />
      </div> */}
      <div className="flex flex-col px-[5vw] pt-14 sm:flex-row sm:gap-5 lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]">
        <div className="sm:w-1/2">
          <PostFeed entries={colA} />
        </div>
        <div className="sm:w-1/2">
          <PostFeed entries={colB} />
        </div>
      </div>
    </>
  );
}
