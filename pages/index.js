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

  const [cleanCountry, setCleanCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');

  const [cleanDepartment, setCleanDepartment] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState('');

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
    const filterCountries = mapCountries.filter(
      (item, index) => mapCountries.indexOf(item) >= index
    );
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
    const filter = {
      country: countrySelected,
      department: departmentSelected,
    };

    const updateFiltersOr = () => {
      const filteredData = entries.filter((i) => {
        const countryMatch = filter.country === i.values.justCountry;
        const departmentMatch = filter.department === i.values.department;
        return countryMatch || departmentMatch;
      });
      setShuffle(filteredData);
    };

    const updateFiltersAnd = () => {
      const filteredData = entries.filter((i) => {
        const countryMatch = filter.country === i.values.justCountry;
        const departmentMatch = filter.department === i.values.department;
        return countryMatch && departmentMatch;
      });
      setShuffle(filteredData);
    };

    !countrySelected && !departmentSelected && setShuffle(entries);
    !countrySelected && departmentSelected && updateFiltersOr();
    countrySelected && !departmentSelected && updateFiltersOr();
    countrySelected && departmentSelected && updateFiltersAnd();
  }, [countrySelected, departmentSelected, entries]);

  const handleChange = (e) => {
    setCountrySelected(e.target.value);

    // if (e.target.value !== '') {
    //   // Reassign fresh values everytime this callback runs
    //   shuffle = entries;
    //   const countryFilter = shuffle.filter(
    //     (item) => item.values.justCountry === e.target.value
    //   );
    //   setShuffle(countryFilter);
    // } else {
    //   setShuffle(entries);
    // }
  };

  const handleDepartmentChange = (e) => {
    setDepartmentSelected(e.target.value);

    // // Department selected but not country
    // if (e.target.value !== '' && countrySelected === '') {
    //   /// Reassign fresh values everytime this callback runs
    //   shuffle = entries;
    //   const departmentFilter = shuffle.filter(
    //     (item) => item.values.department === e.target.value
    //   );
    //   setShuffle(departmentFilter);
    //   // Country selected but not department
    // } else if (e.target.value === '' && countrySelected !== '') {
    //   shuffle = entries;
    //   const departmentFilter = shuffle.filter(
    //     (item) => item.values.justCountry === countrySelected
    //   );
    //   setShuffle(departmentFilter);
    //   // Both country and department selected
    // } else if (e.target.value !== '' && countrySelected !== '') {
    //   shuffle = entries;
    //   const departmentFilter = shuffle.filter(
    //     (item) =>
    //       item.values.department === e.target.value &&
    //       item.values.justCountry === countrySelected
    //   );
    //   setShuffle(departmentFilter);
    // } else {
    //   setShuffle(entries);
    // }
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
            onChange={(e) => handleChange(e)}
          >
            <option value="">All countries</option>
            {cleanCountry.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-5 text-xl font-normal">
          <select
            name="departmentFilter"
            value={departmentSelected}
            onChange={(e) => handleDepartmentChange(e)}
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
