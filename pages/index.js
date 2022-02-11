import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import { FaFirstAid } from 'react-icons/fa';

// SSR is used for inital render for better UX
export async function getServerSideProps() {
  const postQuery = firestore
    .collectionGroup('entry collection')
    .orderBy('id', 'asc');

  const firstLoad = (await postQuery.get()).docs.map(postToJSON);

  return {
    props: { firstLoad },
  };
}

export default function Home(props) {
  const [firstData] = useState(props.firstLoad);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Once all data are fetched, we swap firstLoad data with entries that are further
  // randomised
  useEffect(() => {
    async function fetchData() {
      let response = await firstData;
      setEntries(response);
      setLoading(false);
    }

    fetchData();
  }, [firstData]);

  const shuffle = [...entries].sort(() => Math.random() - 0.5);
  const firstHalf = Math.floor(entries.length / 2);

  const colA = (loading ? firstData : shuffle).slice(0, firstHalf);
  const colB = (loading ? firstData : shuffle).slice(firstHalf, entries.length);
  console.log(loading ? 'loading firstLoad' : 'loading SHUFFLE');

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
