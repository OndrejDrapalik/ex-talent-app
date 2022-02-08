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

  // sort is a mutable fn, but with sppread we make a copy first
  const shuffle = [...entries].sort(() => Math.random() - 0.5);

  // Takes the whole number
  const firstHalf = Math.floor(entries.length / 2);

  const colA = shuffle.slice(0, firstHalf);
  const colB = shuffle.slice(firstHalf, entries.length);

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
