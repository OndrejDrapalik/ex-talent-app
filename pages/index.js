import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostFeed from '../components/PostFeed';

import { firestore, postToJSON } from '../lib/firebase';

export async function getStaticProps() {
  const postQuery = firestore
    .collectionGroup('entry_collection')
    .orderBy('id', 'asc');

  const firstLoad = (await postQuery.get()).docs.map(postToJSON);

  return {
    props: { firstLoad },
    revalidate: 30,
  };
}

export default function Home(props) {
  const [firstData] = useState(props.firstLoad);
  const [entries, setEntries] = useState([]);
  const [shuffle, setShuffle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cleanCountry, setCleanCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');

  const [cleanDepartment, setCleanDepartment] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState('');

  const [remoteSelected, setRemoteSelected] = useState(false);
  const [relocationSelected, setRelocationSlected] = useState(false);

  // Swap firstLoad data with entries that are further shuffled once all data are fetched
  useEffect(() => {
    async function fetchData() {
      let response = await firstData;
      setEntries(response);
      setLoading(false);

      // Randomise entries and save it as a shuffle state
      const dataSortable = [...response].map((x) => {
        return {
          ...x,
          sortKey: Math.random(),
        };
      });
      dataSortable.sort((a, b) => a.sortKey - b.sortKey);

      setShuffle(dataSortable);
    }

    fetchData();
  }, [firstData]);

  // Clean & order entries data for usage in the filters
  useEffect(() => {
    const mapCountries = [...entries].map((item) => item.values.justCountry);
    const filterCountries = mapCountries
      .filter((item, index) => mapCountries.indexOf(item) >= index)
      .filter((item) => item !== '');

    const orderCountries = filterCountries.sort();
    setCleanCountry(orderCountries);

    const mapDepartments = [...entries].map((item) => item.values.department);
    const filterDepartments = mapDepartments.filter(
      (item, index) => mapDepartments.indexOf(item) >= index
    );
    const orderDepartments = filterDepartments.sort();
    setCleanDepartment(orderDepartments);
  }, [entries]);

  // Filter rendering logic
  useEffect(() => {
    let filtered = [];

    const countryFilter = () => {
      const filterCountry = entries.filter(
        (i) => countrySelected === i.values.justCountry
      );
      countrySelected ? (filtered = filterCountry) : (filtered = entries);
      setShuffle(filtered);
    };

    const departmentFilter = () => {
      const filterDepartment = filtered.filter(
        (i) => departmentSelected === i.values.department
      );
      departmentSelected ? (filtered = filterDepartment) : filtered;
      setShuffle(filtered);
    };

    const remoteFilter = () => {
      const filterRemote = filtered.filter(
        (i) => remoteSelected === i.values.remoteWork
      );
      remoteSelected ? (filtered = filterRemote) : filtered;
      setShuffle(filtered);
    };

    const relocationFilter = () => {
      const filterRelocation = filtered.filter(
        (i) => relocationSelected === i.values.relocation
      );
      relocationSelected ? (filtered = filterRelocation) : filtered;
      setShuffle(filtered);
    };

    countryFilter();
    departmentFilter();
    remoteFilter();
    relocationFilter();
  }, [
    countrySelected,
    departmentSelected,
    entries,
    relocationSelected,
    remoteSelected,
  ]);

  const firstHalf = Math.floor(entries.length / 2);
  const colA = shuffle.slice(0, firstHalf);
  const colB = shuffle.slice(firstHalf, entries.length);
  console.log(loading ? 'loading firstLoad' : 'loading SHUFFLE');

  return (
    <>
      <Navbar />
      <div
        // Container main
        className="m-auto max-w-6xl px-[5vw] md:px-10"
      >
        <h1 className="pt-20 pb-10 text-3xl sm:text-4xl md:pb-10 md:text-5xl">
          Please meet some talented people who’ve worked at Avast.
        </h1>
        <div
          // Filter group
          className="flex-col 
                  "
        >
          <div
            // Main filters
            className=" grid grid-cols-1 md:grid-cols-3 md:gap-4"
          >
            <div className="w-auto">
              <select
                name="countryFilter"
                className="filter-main w-full"
                value={countrySelected}
                onChange={(e) => setCountrySelected(e.target.value)}
              >
                <option value="">All countries</option>
                {cleanCountry.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-auto">
              <select
                name="departmentFilter"
                className="filter-main w-full"
                value={departmentSelected}
                onChange={(e) => setDepartmentSelected(e.target.value)}
              >
                <option value="">All departments</option>
                {cleanDepartment.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-auto">
              <select
                name="departmentFilter"
                className="filter-main w-full"
                value={departmentSelected}
                onChange={(e) => setDepartmentSelected(e.target.value)}
              >
                <option value="">All departments</option>
                {cleanDepartment.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            // Minor fiters
            className="flex flex-row md:flex-row "
          >
            <div>
              <button
                onClick={() => setRemoteSelected(!remoteSelected)}
                className={`filter-minor px-4 ${
                  remoteSelected && 'bg-green-200'
                }`}
              >
                Open to remote
              </button>
            </div>
            <div className=" w-2 md:w-4" />
            <div>
              <button
                onClick={() => setRelocationSlected(!relocationSelected)}
                className={`filter-minor px-4 ${
                  relocationSelected && 'bg-green-200'
                }`}
              >
                Open to relocation
              </button>
            </div>
          </div>
        </div>
        <div
          // EntryFeed
          className="flex flex-col  pt-10 
       md:flex-row"
        >
          <div className="md:w-1/2 ">
            <PostFeed entries={colA} />
          </div>
          <div
            // Instead of 'md:gap-5' in the div above I use this div to create the space
            className=" w-0 md:w-5"
          />
          <div className="md:w-1/2 ">
            <PostFeed entries={colB} />
          </div>
        </div>
      </div>
    </>
  );
}
