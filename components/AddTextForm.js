import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/contexts/user-context';
import { useRouter } from 'next/router';

import Autocomplete from 'react-google-autocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-control flex flex-col ">
      <label
        className="text-sm text-gray-400  "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className=" h-36 w-auto rounded-sm border pl-1"
        {...field}
        {...props}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[50px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-sm text-gray-400  "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input h-7 min-w-fit rounded-sm  border bg-gray-100  pl-1
        text-gray-900
        placeholder-gray-400 autofill:bg-white
        autofill:text-gray-700 focus:border-green-500  
        focus:bg-white focus:placeholder-white
        focus:outline-none focus:ring-1 focus:ring-green-500 md:w-[275px]"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[50px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextInputRequired = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-sm text-gray-400 after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input h-7 min-w-fit rounded-sm border bg-gray-100 pl-1
        
        text-gray-900
        placeholder-gray-400 autofill:bg-white
        autofill:text-gray-700 focus:border-green-500  
        focus:bg-white focus:placeholder-white
        focus:outline-none focus:ring-1 focus:ring-green-500 md:w-[275px]"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[50px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input flex flex-row items-center gap-2">
        <input className="" type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[1px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="text-sm text-gray-400  after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="flex h-7 min-w-full rounded-sm border bg-gray-100 text-gray-900 invalid:text-gray-400  md:w-[275px]
                    md:min-w-fit"
      />
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[1px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function AddTextForm({ zIndex, onSubmit }) {
  const { entryCheck } = useContext(UserContext);
  const router = useRouter();

  return (
    <Formik
      enableReinitialize={true}
      setFieldValue
      initialValues={{
        firstName: '',
        lastName: '',
        city: '',
        justCity: '',
        justCountry: '',
        department: '',
        jobTitle: '',
        company: '',
        linkedIn: '',
        otherURL: '',
        remoteWork: false,
        relocation: false,
        aboutYou: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        jobTitle: Yup.string()
          .max(50, 'Must be 50 characters or less')
          .required('Required'),
        company: Yup.string()
          .oneOf(['Avast', 'Norton', 'Other'])
          .required('Required'),
        department: Yup.string().required('Required'),
        linkedIn: Yup.string().matches(
          /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#-]+\/?)*$/,
          'Enter correct url'
        ),
        otherURL: Yup.string().matches(
          /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#-]+\/?)*$/,
          'Enter correct url'
        ),
      })}
      onSubmit={onSubmit}
      handleChange

      // Debugging kit
      // validator={() => ({})}
      // onSubmit={() => {
      //   console.log('submit!');
      // }}
    >
      {({ props, setFieldValue, initialValues, handleChange, values }) => {
        /// is there a way how to go around not using the lintrule?
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (entryCheck) {
            const fields = Object.keys(initialValues);
            fields.forEach((field) =>
              setFieldValue(field, entryCheck.values[field], false)
            );
          }
        }, [initialValues, setFieldValue]);

        {
          /* // react-google-autocomplete –> custom implementation part 1
        const {
          placePredictions,
          getPlacePredictions,
          isPlacePredictionsLoading,
          // eslint-disable-next-line react-hooks/rules-of-hooks
        } = useGoogle({
          apiKey: process.env.REACT_APP_GOOGLE,
        });
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('');
        console.log('placePredictions', placePredictions); */
        }

        return (
          <>
            <div
              // Blue background
              className={`fixed top-0 right-0 bottom-0 left-0 h-full w-full ${zIndex}
                          bg-secondary cursor-default 
                          opacity-100`}
            ></div>
            <div
              // White window
              className={`${zIndex} bg-primary px-[5vw]sm:flex-col  
                        mt-16 flex flex-col gap-4  
                        rounded-lg px-[12vw] pt-14 
                        pb-14 md:px-[5vw] lg:px-[6vw] xl:px-[7vw] 2xl:px-[8vw]
                  `}
            >
              <h1 className="flex text-3xl text-gray-900">
                {entryCheck ? 'Edit you entry' : 'Add your entry'}
              </h1>
              <Form
                onKeyUp={(e) => {
                  e.key === 'Escape' && router.push('/');
                }}
                className="flex flex-col gap-8"
              >
                <div
                  // Personal info group
                  className="flex flex-col gap-4"
                >
                  <div
                    // Full name
                    className="md: flex flex-col gap-4 md:flex-row
                              md:gap-6
                              "
                  >
                    <div className="flex flex-col ">
                      <MyTextInputRequired
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Ondrej"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <MyTextInputRequired
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Drapalik"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      // react-google-autocomplete –> formik example - easier, straightforward implementation

                      className="flex text-sm text-gray-400  after:ml-0.5 after:text-red-500 after:content-['*']"
                    >
                      City
                    </label>
                    <Autocomplete
                      className="text-input flex h-7 min-w-fit rounded-sm border bg-gray-100 pl-1
                                    text-gray-900
                                    placeholder-gray-400 autofill:bg-white
                                    autofill:text-gray-700 focus:border-green-500  
                                    focus:bg-white focus:placeholder-white
                                    focus:outline-none focus:ring-1 focus:ring-green-500 md:w-[275px]"
                      id="city"
                      placeholder="My city"
                      language="en"
                      name="city"
                      onKeyPress={(e) => {
                        e.key === 'Enter' && e.preventDefault();
                      }}
                      value={values.city || ''}
                      apiKey={process.env.GOOGLE_MAPS_API_KEY}
                      onPlaceSelected={(place) => {
                        console.log('place:', place);

                        setFieldValue('city', place.formatted_address);
                        setFieldValue(
                          'justCity',
                          place.address_components[0].long_name
                        );
                        if (place.address_components.length < 4) {
                          setFieldValue(
                            'justCountry',
                            place.address_components[2].long_name
                          );
                        } else {
                          setFieldValue(
                            'justCountry',
                            place.address_components[3].long_name
                          );
                        }
                      }}
                      onChange={handleChange}
                      options={{
                        types: ['(cities)'],
                      }}
                    />

                    <MyTextInput
                      // Invisible cmpnt
                      onChange={handleChange}
                      name="justCity"
                      type="text"
                      className="hidden"
                      value={values.justCity || ''}
                    />
                    <MyTextInput
                      // Invisible cmpnt
                      onChange={handleChange}
                      name="justCountry"
                      type="text"
                      className="hidden"
                      value={values.justCountry || ''}
                    />
                    {/* <div
                      // react-google-autocomplete –> custom implementation part 2
                      className="flex flex-col "
                    >
                      <MyTextInputRequired
                        label="City"
                        name="city"
                        type="text"
                        autocomplete="chrome-off"
                        placeholder="My city"
                        onChange={(evt) => {
                          getPlacePredictions({ input: evt.target.value });
                          setFieldValue('city', evt.target.values);
                          handleChange;
                        }}
                        value={values.city}
                      />
                    </div>
                    <div>
                      {!isPlacePredictionsLoading &&
                        placePredictions.map((item) => (
                          // Can we further customised
                          <li
                            key={item.description}
                            onClick={() => {
                              setFieldValue('city', item.description);
                              getPlacePredictions({ input: '' });
                            }}
                          >
                            {item.description}
                          </li>
                        ))}
                    </div> */}
                  </div>
                </div>

                <div
                  // Info about your work
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col">
                      <MyTextInputRequired
                        label="Job Title"
                        name="jobTitle"
                        type="text"
                        placeholder="Marketing Communication Specialist"
                        required
                      />
                    </div>
                    <MySelect
                      label="Department"
                      name="department"
                      className="flex flex-col "
                      required
                    >
                      <option
                        disabled
                        // selected
                        value=""
                        className="text-gray-400"
                      >
                        My department
                      </option>
                      <option value="">All functions</option>
                      <option value="Accounting / Auditing">
                        Accounting / Auditing
                      </option>
                      <option value="Administrative">Administrative</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Art / Creative">Art / Creative</option>
                      <option value="Business Development">
                        Business Development
                      </option>
                      <option value="Consulting">Consulting</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Distribution">Distribution</option>
                      <option value="Education">Education</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="General Business">General Business</option>
                      <option value="Healthcare Provider">
                        Healthcare Provider
                      </option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Legal">Legal</option>
                      <option value="Management">Management</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                      <option value="Policy">Policy</option>
                      <option value="Product Management">
                        Product Management
                      </option>
                      <option value="Production">Production</option>
                      <option value="Project Management">
                        Project Management
                      </option>
                      <option value="Public Relations">Public Relations</option>
                      <option value="Purchasing">Purchasing</option>
                      <option value="Quality Assurance">
                        Quality Assurance
                      </option>
                      <option value="Recruiting">Recruiting</option>
                      <option value="Research">Research</option>
                      <option value="Sales">Sales</option>
                      <option value="Science">Science</option>
                      <option value="Strategy / Planning">
                        Strategy / Planning
                      </option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Training">Training</option>
                      <option value="Writing / Editing">
                        Writing / Editing
                      </option>
                    </MySelect>
                  </div>
                  <div className="flex flex-col">
                    <MySelect
                      label="Company"
                      name="company"
                      className="flex flex-col"
                      required
                    >
                      <option
                        disabled
                        // selected
                        value=""
                        className="text-gray-400"
                      >
                        My company
                      </option>
                      <option value="Avast">Avast</option>
                      <option value="Norton">Norton</option>
                      <option value="Other">Other</option>
                    </MySelect>
                  </div>
                </div>

                <div
                  // Links
                  className="flex flex-col gap-4 md:flex-row md:justify-between"
                >
                  <div className="flex flex-col">
                    <MyTextInput
                      label="LinkedIn URL"
                      name="linkedIn"
                      type="text"
                      placeholder="linkedin.com/in/ondrejdrapalik/"
                    />
                  </div>

                  <div className="flex flex-col">
                    <MyTextInput
                      label="Other URL"
                      name="otherURL"
                      type="text"
                      placeholder="github.com/OndrejDrapalik"
                    />
                  </div>
                </div>

                <div>
                  <TextArea
                    label="About you"
                    name="aboutYou"
                    type="text"
                    placeholder="My text"
                  />
                </div>

                <div>
                  <MyCheckbox
                    name="remoteWork"
                    className="checked checked:bg-check-box checked:bg-secondary checked:border-secondary  h-4 w-4 cursor-pointer appearance-none
                      rounded-sm border-2 bg-contain"
                  >
                    <div>I am open to remote work.</div>
                  </MyCheckbox>
                  <MyCheckbox
                    name="relocation"
                    className="checked:bg-check-box checked:bg-secondary checked:border-secondary  h-4 w-4 cursor-pointer appearance-none
                      rounded-sm border-2 bg-contain"
                  >
                    <div>I am open to relocation.</div>
                  </MyCheckbox>
                </div>

                <div
                  // Buttons
                  className="flex items-center justify-between gap-4"
                >
                  <button
                    type="reset"
                    onClick={() => router.push('/')}
                    className="rounded-md bg-gray-200 px-12
                            py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => router.push('/')}
                    type="submit"
                    className="rounded-md bg-green-500 px-12
                            py-2"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}
