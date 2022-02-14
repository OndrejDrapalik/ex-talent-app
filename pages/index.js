import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import { FaFirstAid } from 'react-icons/fa';
import Filters from '../components/Filters';

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
  const [shuffle, setShuffle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [uniqueCountrySelect, setUniqueCountrySelect] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');

  // Swap firstLoad data with entries that are further once all data are fetched
  useEffect(() => {
    async function fetchData() {
      let response = await firstData;
      setEntries(response);
      setLoading(false);
    }

    fetchData();
  }, [firstData]);

  // Randomise entries and save it as a shuffle state
  useEffect(() => {
    const shuffleEntries = entries.sort(() => Math.random() - 0.5);
    setShuffle(shuffleEntries);
  }, [entries]);

  // Make names in the country dropdown unique
  useEffect(() => {
    const unfiltered = entries.map((item) => item.values.justCountry);
    const unique = unfiltered.filter(
      (item, index) => unfiltered.indexOf(item) >= index
    );

    setUniqueCountrySelect(unique);
  }, [entries]);

  const handleCountryChange = (e) => {
    setCountrySelected(e.target.value);
    if (e.target.value !== '') {
      // Reassign fresh values everytime this callback runs
      shuffle = entries;
      const countryFilter = shuffle.filter(
        (item) => item.values.justCountry === e.target.value
      );
      setShuffle(countryFilter);
    } else {
      setShuffle(entries);
    }
  };

  const firstHalf = Math.floor(entries.length / 2);
  const colA = (loading ? firstData : shuffle).slice(0, firstHalf);
  const colB = (loading ? firstData : shuffle).slice(firstHalf, entries.length);
  console.log(loading ? 'loading firstLoad' : 'loading SHUFFLE');

  return (
    <>
      <Navbar />
      <div
        className="font-lato mt-10  flex flex-col
                  items-center px-[5vw] text-5xl font-normal lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]
                  "
      >
        <h1>Please meet some talented people who’ve worked at Avast.</h1>

        <div className="pt-5 text-xl font-normal">
          <select
            name="countryFilter"
            value={countrySelected}
            onChange={(e) => handleCountryChange(e)}
          >
            <option value="">All countries</option>
            {uniqueCountrySelect.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="md: flex flex-col px-[5vw] pt-14  md:flex-row md:gap-5 lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]">
        <div className="md:w-1/2 ">
          <PostFeed entries={colA} />
        </div>
        <div className="md:w-1/2 ">
          <PostFeed entries={colB} />
        </div>
      </div>
    </>
  );
}
