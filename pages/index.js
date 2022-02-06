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
      <Title />
      <PostFeed entries={entries} />
    </>
  );
}

const Title = () => {
  return (
    <div className="font-lato mt-10 flex flex-col items-center text-4xl font-normal">
      <h1>Please meet some talented people who’ve worked at Avast.</h1>
    </div>
  );
};
