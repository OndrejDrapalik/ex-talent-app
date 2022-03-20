import React from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../lib/contexts/user-context';
import { useRouter } from 'next/router';

import Autocomplete from 'react-google-autocomplete';
import { ArrowDown } from './NavbarComponents/HelperComponents/IconsSvg';

const MyCity = ({ setFieldValue, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="text-dark/75  dark:text-light/75  flex text-sm after:ml-0.5 after:text-red-500 after:content-['*']">
        {label}
      </label>
      <Autocomplete
        {...field}
        {...props}
        className="  mt-0.25  dark:text-lightest text-darkest dark:placeholder-light/50 dark:bg-darker  bg-lighter dark:focus:bg-darkest  focus:bg-lightest dark:focus:placeholder-light/50 placeholder-dark/50
                flex
                h-8 
                min-w-fit 
                rounded-sm  
                pl-1
               focus:outline-none "
        id="city"
        placeholder="My city"
        language="en"
        name="city"
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
        apiKey={process.env.GOOGLE_MAPS_API_KEY}
        onPlaceSelected={(place) => {
          console.log('place:', place);

          try {
            setFieldValue('city', place.formatted_address);
            setFieldValue('justCity', place.address_components[0].long_name);
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
          } catch (error) {
            console.log(error);
          }
        }}
        options={{
          types: ['(cities)'],
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const TextArea = ({ label, logCharCount, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-control flex flex-col ">
      <label
        className=" text-dark/75  dark:text-light/75 text-sm "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className=" dark:text-lightest text-darkest dark:placeholder-light/50 dark:bg-darker  bg-lighter dark:focus:bg-darkest  focus:bg-lightest dark:focus:placeholder-light/50 placeholder-dark/50 h-[15vh]
        w-auto rounded-sm px-2 py-2 focus:outline-none 
        "
        {...field}
        {...props}
      ></textarea>
      <div className="flex flex-row-reverse justify-between">
        <div
          className={`text-xs ${
            logCharCount <= 1000
              ? 'text-dark/75  dark:text-light/75'
              : 'text-red-600'
          } `}
        >
          {logCharCount}/1000
        </div>
        {meta.touched && meta.error ? (
          <div className="error mt-[2px]">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-dark/75  dark:text-light/75  text-sm "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="dark:text-lightest text-darkest dark:placeholder-light/50 dark:bg-darker  bg-lighter dark:focus:bg-darkest  focus:bg-lightest dark:focus:placeholder-light/50 placeholder-dark/50 text-input
        h-8
rounded-sm pl-1  
        focus:outline-none  "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextInputRequired = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-dark/75  dark:text-light/75 text-sm after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input dark:text-lightest text-darkest dark:placeholder-light/50 dark:bg-darker  bg-lighter dark:focus:bg-darkest  focus:bg-lightest dark:focus:placeholder-light/50 placeholder-dark/50 h-8
        
        rounded-sm pl-1
         focus:outline-none  
        "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox-input flex flex-row items-center">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="text-dark/75  dark:text-light/75 text-sm  after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className=" dark:text-lightest text-darkest  dark:bg-darker  bg-lighter dark:focus:bg-darkest  focus:bg-lightest dark:focus:placeholder-light/50  invalid:text-dark/50 dark:invalid:text-light/50 flex  h-8
                    w-full 
                    appearance-none rounded-sm   
                    pl-1 focus:outline-none
                    "
      ></select>

      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function AddTextForm({ zIndex, onSubmit }) {
  const { entryCheck } = useContext(UserContext);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    // console.log('ref.current.values:', ref.current);
    if (entryCheck) {
      const fields = Object.keys(ref.current.values);
      fields.map((field) =>
        ref.current.setFieldValue(field, entryCheck.values[field], false)
      );
    }
  });

  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
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
    aboutYou: Yup.string().max(1000, 'Too Long!'),
  });

  return (
    <>
      <Formik
        innerRef={ref}
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
        validationSchema={validation}
        onSubmit={onSubmit}
        isValid

        // Debugging kit
        // validator={() => ({})}
        // onSubmit={() => {
        //   console.log('submit!');
        // }}
      >
        {({ values, setFieldValue, isValid }) => {
          return (
            <>
              <div
                // Blue background
                className={`fixed top-0 right-0 bottom-0 left-0 h-full w-full ${zIndex}
                          bg-secondary bg-lightest dark:bg-darker cursor-default
                          opacity-100`}
              ></div>
              <div
                // window
                className={`${zIndex} bg-primary dark:bg-dark m-auto flex w-screen max-w-3xl flex-col rounded-lg bg-white px-[3vw]
                         py-[2vh] shadow-lg md:my-[3vh] md:px-10
                  `}
              >
                <h1 className="text-darkest dark:text-lightest flex pb-[2vh] text-3xl">
                  {entryCheck ? 'Edit you entry' : 'Add your entry'}
                </h1>

                <Form
                  onKeyUp={(e) => {
                    e.key === 'Escape' && router.push('/');
                  }}
                  className="flex flex-col "
                >
                  <div
                    // Personal info group
                    className=" grid grid-cols-1 pb-[2vh] md:grid-cols-2 md:gap-x-5"
                  >
                    <div className="flex w-full flex-col pb-2">
                      <MyTextInputRequired
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Ondrej"
                        required
                      />
                    </div>

                    <div className="flex w-full flex-col pb-2 ">
                      <MyTextInputRequired
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Drapalik"
                        required
                      />
                    </div>

                    <div className="flex w-full flex-col pb-2">
                      <MyCity
                        name="city"
                        value={values.city || ''}
                        label="City"
                        setFieldValue={setFieldValue}
                      />

                      <MyTextInput
                        // Invisible cmpnt
                        name="justCity"
                        type="text"
                        className="hidden"
                        value={values.justCity || ''}
                      />
                      <MyTextInput
                        // Invisible cmpnt
                        name="justCountry"
                        type="text"
                        className="hidden"
                        value={values.justCountry || ''}
                      />
                    </div>
                  </div>

                  <div
                    // Info about your work
                    className="grid grid-cols-1 pb-[2vh] md:grid-cols-2 md:gap-x-5"
                  >
                    <div className="flex flex-col pb-2">
                      <MyTextInputRequired
                        label="Job Title"
                        name="jobTitle"
                        type="text"
                        placeholder="Marketing Communication Specialist"
                        required
                      />
                    </div>

                    <div className=" flex flex-col pb-2">
                      <div className="relative">
                        <ArrowDown className="stroke-lightest pointer-events-none absolute right-[4px] top-6" />
                      </div>
                      <MySelect
                        label="Department"
                        name="department"
                        className="flex-co flex "
                        placeholder="Select something"
                        required
                      >
                        <option
                          disabled
                          // selected
                          value=""
                        >
                          My department
                        </option>
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
                        <option value="Customer Service">
                          Customer Service
                        </option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Education">Education</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Finance">Finance</option>
                        <option value="General Business">
                          General Business
                        </option>
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
                        <option value="Public Relations">
                          Public Relations
                        </option>
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

                    <div className="flex flex-col pb-2">
                      <div className="relative">
                        <ArrowDown className="stroke-lightest pointer-events-none absolute right-[4px] top-6" />
                      </div>
                      <MySelect
                        label="Company"
                        name="company"
                        className="flex flex-col "
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
                    className="grid grid-cols-1 pb-[2vh] md:grid-cols-2 md:gap-x-5"
                  >
                    <div className="flex flex-col pb-2">
                      <MyTextInput
                        label="LinkedIn URL"
                        name="linkedIn"
                        type="text"
                        placeholder="linkedin.com/in/ondrejdrapalik/"
                      />
                    </div>

                    <div className="flex flex-col pb-2">
                      <MyTextInput
                        label="Other URL"
                        name="otherURL"
                        type="text"
                        placeholder="github.com/OndrejDrapalik"
                      />
                    </div>
                  </div>

                  <div className="pb-2">
                    <TextArea
                      label="About you"
                      name="aboutYou"
                      type="text"
                      placeholder="My text"
                      logCharCount={values.aboutYou.split('').length}
                    />
                  </div>

                  <div className="pb-5">
                    <MyCheckbox
                      name="remoteWork"
                      className="checked checked:bg-check-box checked:bg-accent   checked:border-accent border-lighter h-4 w-4 cursor-pointer  appearance-none rounded-sm border-2 
                      bg-cover bg-no-repeat"
                    >
                      <div className="text-darkest dark:text-lightest pl-2">
                        I am open to remote.
                      </div>
                    </MyCheckbox>
                    <MyCheckbox
                      name="relocation"
                      className="checked checked:bg-check-box checked:bg-accent  checked:border-accent border-lighter h-4 w-4 cursor-pointer  appearance-none rounded-sm border-2 
                      bg-cover bg-no-repeat"
                    >
                      <div className="text-darkest dark:text-lightest pl-2">
                        I am open to relocation.
                      </div>
                    </MyCheckbox>
                  </div>

                  <div
                    // Buttons
                    className="flex items-center justify-between"
                  >
                    <button
                      type="reset"
                      onClick={() => router.push('/')}
                      className="bg-lightest hover:bg-light/75 text-darkest w-[40vw] rounded-md py-2 
                            md:w-[275px]"
                    >
                      Cancel
                    </button>
                    <div
                      // Instead of 'md:gap-8' in the div above I use this div to create the space
                      className="w-6 md:w-6"
                    />
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="text-darkest bg-accent hover:bg-accent/75 w-[40vw] rounded-md py-2 disabled:opacity-30 
                            md:w-[275px]"
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
    </>
  );
}
