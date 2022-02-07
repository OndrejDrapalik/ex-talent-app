import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';

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
  return (
    <>
      <Navbar />
      <div
        className="font-lato mt-10  flex flex-row
                  items-center px-[5vw] text-5xl font-normal lg:px-[10vw] xl:px-[22vw]
                  "
      >
        <h1>Please meet some talented people who’ve worked at Avast.</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 px-[5vw] pt-14 sm:grid-cols-2  lg:px-[10vw] xl:px-[22vw]">
        <PostFeed entries={entries} />
      </div>
    </>
  );
}
