import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import PostFeed from '../components/PostFeed';
import { FaFirstAid } from 'react-icons/fa';
import Filters from '../components/Filters';

// SSR is used for inital render for better UX
export async function getServerSideProps() {
  const postQuery = firestore
    .collectionGroup('entry_collection')
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

  const [cleanCountry, setCleanCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');

  const [cleanDepartment, setCleanDepartment] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState('');

  const [remoteSelected, setRemoteSelected] = useState(false);
  const [relocationSelected, setRelocationSlected] = useState(false);

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

  // Clean & order entries data for usage in the filters
  useEffect(() => {
    const mapCountries = entries.map((item) => item.values.justCountry);
    const filterCountries = mapCountries
      .filter((item, index) => mapCountries.indexOf(item) >= index)
      .filter((item) => item !== '');

    const orderCountries = filterCountries.sort();
    setCleanCountry(orderCountries);

    const mapDepartments = entries.map((item) => item.values.department);
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
  const colA = (loading ? firstData : shuffle).slice(0, firstHalf);
  const colB = (loading ? firstData : shuffle).slice(firstHalf, entries.length);
  console.log(loading ? 'loading firstLoad' : 'loading SHUFFLE');

  return (
    <>
      <Navbar />
      <div
        // container
        className="mt-10  flex flex-col
        px-[5vw] font-normal lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]
                  "
      >
        <h1 className="text-5xl ">
          Please meet some talented people who’ve worked at Avast.
        </h1>
        <div
          className="flex flex-col pt-5 text-base font-normal
        
        "
        >
          <div
            // Main filters
            className=" flex flex-col justify-between md:flex-row"
          >
            <div>
              <select
                name="countryFilter"
                className="filter-main "
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
            <div>
              <select
                name="departmentFilter"
                className="filter-main"
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
            <div>
              <select
                name="departmentFilter"
                className="filter-main "
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
          <div className="w-[20px] appearance-none" />
          <div
            // Minor fiters
            className="flex flex-row md:flex-row"
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
            <div className="w-[8px] appearance-none" />
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
      </div>

      <div
        className="flex flex-col px-[5vw] pt-14 
       md:flex-row lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]
       
       "
      >
        <div className="md:w-1/2 ">
          <PostFeed entries={colA} />
        </div>
        <div
          // Instead of 'md:gap-5' in the div above I use this div to create the space
          className="w-0 appearance-none md:w-5"
        />
        <div className="md:w-1/2 ">
          <PostFeed entries={colB} />
        </div>
      </div>
    </>
  );
}
