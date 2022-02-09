import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/contexts/user-context';

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
        className="text-input h-7 w-[275px]  rounded-sm border  bg-gray-100
        pl-1
        text-gray-900 placeholder-gray-400
        autofill:bg-white autofill:text-gray-700  
        focus:border-green-500 focus:bg-white
        focus:placeholder-white focus:outline-none focus:ring-1 focus:ring-green-500"
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
        className="text-sm text-gray-400  after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input h-7 w-[275px] rounded-sm border bg-gray-100
        pl-1
        text-gray-900 placeholder-gray-400
        autofill:bg-white autofill:text-gray-700  
        focus:border-green-500 focus:bg-white
        focus:placeholder-white focus:outline-none focus:ring-1 focus:ring-green-500"
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
        className="flex  h-7 w-[275px] rounded-sm border bg-gray-100  text-gray-900
                    invalid:text-gray-400"
      />
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[1px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function AddTextForm({ zIndex, onSubmit }) {
  const { entryCheck } = useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      setFieldValue
      initialValues={{
        firstName: '',
        lastName: '',
        department: '',
        jobTitle: '',
        company: '',
        location: '',
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
        location: Yup.string().required('Required'),
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
    >
      {({ setFieldValue, initialValues }) => {
        /// is there a way how to go around not using the lintrule?
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (entryCheck) {
            const fields = Object.keys(initialValues);
            fields.forEach((field) =>
              setFieldValue(field, entryCheck.values[field], false)
            );
          }
        }, []);

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
              className={`${zIndex} bg-primary mt-10 flex
             flex-col gap-4 rounded-lg  px-14 pt-14
                  pb-14  shadow-md`}
            >
              <h1 className="text-3xl text-gray-900">
                {entryCheck ? 'Edit you entry' : 'Add your entry'}
              </h1>
              <Form className="flex flex-col gap-8">
                <div
                  // Personal info group
                  className="flex flex-col gap-3"
                >
                  <div
                    // Full name
                    className="flex flex-row gap-6 "
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

                  <div
                  // Address
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <MyTextInputRequired
                          label="City"
                          type="text"
                          name="city"
                          placeholder="Prague"
                          required
                        ></MyTextInputRequired>
                      </div>
                      <div className="flex flex-col">
                        <MyTextInputRequired
                          label="Country"
                          type="text"
                          name="country"
                          placeholder="Prague"
                          required
                        ></MyTextInputRequired>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  // Info about your work
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-row items-end justify-between">
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
                        selected
                        value=""
                        className="text-gray-400"
                      >
                        My department
                      </option>
                      <option value="designer">Designer</option>
                      <option value="development">Developer</option>
                      <option value="product">Product Manager</option>
                      <option value="other">Other</option>
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
                        selected
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
                  className="flex flex-row justify-between"
                >
                  <div className="flex flex-col">
                    <MyTextInput
                      label="LinkedIn URL"
                      name="linkedIn"
                      type="text"
                      placeholder="linkedin.com/in/ondrej-drapalik-65a071a5/"
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
                  <Link href={'/'} passHref>
                    <button
                      type="reset"
                      className="rounded-md bg-gray-200 px-12
                            py-2"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
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
