import React from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../lib/contexts/user-context';
import { useRouter } from 'next/router';

import Autocomplete from 'react-google-autocomplete';

const MyCity = ({ setFieldValue, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="flex  text-sm text-gray-400  after:ml-0.5 after:text-red-500 after:content-['*']">
        {label}
      </label>
      <Autocomplete
        {...field}
        {...props}
        className="text-input  mt-0.25 flex h-7 min-w-fit rounded-sm border bg-gray-100 pl-1
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
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
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
        <div className="error mt-[2px]">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input flex flex-row items-center gap-2">
        <input className="" type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error mt-[2px]">{meta.error}</div>
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
        className="bg-arrowDown flex h-7 w-full appearance-none rounded-sm border bg-gray-100  bg-no-repeat
                    pl-1 text-gray-900
                    [background-position:99%] invalid:text-gray-400 md:w-[275px] md:min-w-fit
                    "
      />
      {meta.touched && meta.error ? (
        <div className="error  mt-[2px]">{meta.error}</div>
      ) : null}
    </div>
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
                          bg-secondary cursor-default 
                          opacity-100`}
              ></div>
              <div
                // White window
                className={`${zIndex} bg-primary  mt-10  flex w-[90vw] flex-col
                         rounded-lg px-[5vw]  
                        pt-10 pb-10 
                       md:w-auto  md:px-10 
                  `}
              >
                <h1 className="flex text-3xl text-gray-900">
                  {entryCheck ? 'Edit you entry' : 'Add your entry'}
                </h1>
                <div
                  // Instead of 'md:gap-8' in the div above I use this div to create the space
                  className="h-5 "
                />
                <Form
                  onKeyUp={(e) => {
                    e.key === 'Escape' && router.push('/');
                  }}
                  className="flex flex-col "
                >
                  <div
                    // Personal info group
                    className="flex flex-col "
                  >
                    <div
                      // Full name
                      className="flex flex-col md:flex-row
                              
                              "
                    >
                      <div className="flex flex-col pb-2 ">
                        <MyTextInputRequired
                          label="First Name"
                          name="firstName"
                          type="text"
                          placeholder="Ondrej"
                          required
                        />
                      </div>
                      <div
                        // Instead of 'md:gap-8' in the div above I use this div to create the space
                        className="md:w-6"
                      />
                      <div className="flex flex-col pb-2 ">
                        <MyTextInputRequired
                          label="Last Name"
                          name="lastName"
                          type="text"
                          placeholder="Drapalik"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col pb-2">
                      <MyCity
                        name="city"
                        value={values.city || ''}
                        label="City"
                        setFieldValue={setFieldValue}
                      />

                      <div
                        // Instead of 'md:gap-8' in the div above I use this div to create the space
                        className="h-5 "
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
                    className="flex flex-col"
                  >
                    <div className="flex flex-col md:flex-row md:items-end ">
                      <div className="flex flex-col pb-2">
                        <MyTextInputRequired
                          label="Job Title"
                          name="jobTitle"
                          type="text"
                          placeholder="Marketing Communication Specialist"
                          required
                        />
                      </div>
                      <div
                        // Instead of 'md:gap-8' in the div above I use this div to create the space
                        className="md:w-6"
                      />
                      <div className="flex flex-col pb-2">
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
                          <option value="Human Resources">
                            Human Resources
                          </option>
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
                    </div>

                    <div className="flex flex-col pb-2">
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
                    // Instead of 'md:gap-8' in the div above I use this div to create the space
                    className="h-5 "
                  />
                  <div
                    // Links
                    className="flex flex-col  md:flex-row "
                  >
                    <div className="flex flex-col pb-2">
                      <MyTextInput
                        label="LinkedIn URL"
                        name="linkedIn"
                        type="text"
                        placeholder="linkedin.com/in/ondrejdrapalik/"
                      />
                    </div>
                    <div
                      // Instead of 'md:gap-8' in the div above I use this div to create the space
                      className="md:w-6"
                    />
                    <div className="flex flex-col pb-2">
                      <MyTextInput
                        label="Other URL"
                        name="otherURL"
                        type="text"
                        placeholder="github.com/OndrejDrapalik"
                      />
                    </div>
                  </div>
                  <div
                    // Instead of 'md:gap-8' in the div above I use this div to create the space
                    className="h-5 "
                  />
                  <div className="pb-2">
                    <TextArea
                      label="About you"
                      name="aboutYou"
                      type="text"
                      placeholder="My text"
                    />
                  </div>

                  <div className="pb-4">
                    <MyCheckbox
                      name="remoteWork"
                      className="checked checked:bg-check-box checked:bg-secondary checked:border-secondary  h-4 w-4 cursor-pointer appearance-none
                      rounded-sm border-2 bg-contain"
                    >
                      <div>I am open to remote.</div>
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
                    className="flex items-center justify-between"
                  >
                    <button
                      type="reset"
                      onClick={() => router.push('/')}
                      className="w-[40vw] rounded-md bg-gray-200 py-2 
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
                      className="w-[40vw] rounded-md bg-green-500  py-2 disabled:opacity-30 
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
