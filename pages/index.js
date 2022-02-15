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
        className="font-lato mt-10  flex flex-col
                   px-[5vw] text-5xl font-normal lg:px-[6vw] xl:px-[15vw] 2xl:px-[22vw]
                  "
      >
        <h1>Please meet some talented people who’ve worked at Avast.</h1>
        <div className="flex flex-row justify-between  pt-5 text-xl font-normal">
          <div className="flex flex-row">
            <div>
              <select
                name="countryFilter"
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
            <div className="w-[2vw] appearance-none" />
            {/* <div>
              <select
                name="companyFilter"
                value={departmentSelected}
                onChange={(e) => setDepartmentSelected(e.target.value)}
              >
                <option value="">All companies</option>
                <option value="Avast">Avast</option>
                <option value="Avira">Avira</option>
                <option value="Norton">Norton</option>
              </select>
            </div> */}
            <div>
              <select
                name="departmentFilter"
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
          <div className="flex flex-row">
            <div>
              <button
                onClick={() => setRemoteSelected(!remoteSelected)}
                className={`border ${remoteSelected && 'bg-green-200'}`}
              >
                Open to remote
              </button>
            </div>
            <div className="w-[2vw] appearance-none" />
            <div>
              <button
                onClick={() => setRelocationSlected(!relocationSelected)}
                className={`border ${relocationSelected && 'bg-green-200'}`}
              >
                Open to relocation
              </button>
            </div>
          </div>
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
