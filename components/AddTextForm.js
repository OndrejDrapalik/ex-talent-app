import React from 'react';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-control flex flex-col ">
      <label
        className="text-gray-400 text-sm  "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className=" w-auto h-36 border rounded-sm pl-1"
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
        className="text-gray-400 text-sm  "
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input w-[275px] h-7  border rounded-sm  pl-1
        bg-gray-100
        autofill:bg-white autofill:text-gray-700
        focus:bg-white text-gray-900  
        placeholder-gray-400 focus:placeholder-white
        focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
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
        className="text-gray-400 text-sm  after:content-['*'] after:ml-0.5 after:text-red-500"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <input
        className="text-input w-[275px] h-7 border rounded-sm pl-1
        bg-gray-100
        autofill:bg-white autofill:text-gray-700
        focus:bg-white text-gray-900  
        placeholder-gray-400 focus:placeholder-white
        focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
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
        className="text-gray-400 text-sm  after:content-['*'] after:ml-0.5 after:text-red-500"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className=" text-gray-900  flex w-[275px] h-7 border rounded-sm  bg-gray-100
                    invalid:text-gray-400"
      />
      {meta.touched && meta.error ? (
        <div className="error absolute mt-[1px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function AddTextForm({ zIndex }) {
  return (
    <>
      <Formik
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
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          company: Yup.string()
            .oneOf(['Avast', 'Norton', 'Other'])
            .required('Required'),
          department: Yup.string().required('Required'),
          location: Yup.string().required('Required'),
          linkedIn: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url'
          ),
          otherURL: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url'
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <>
          <div
            // Blue background
            className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full ${zIndex}
                          bg-secondary opacity-100 
                          cursor-default`}
          ></div>
          <div
            // White window
            className={`${zIndex} flex flex-col gap-4
             px-14 pt-14 pb-14  mt-10 rounded-lg
                  bg-primary  shadow-md`}
          >
            <h1 className="text-3xl text-gray-900">Welcome.</h1>
            <Form className="flex flex-col gap-8">
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
                // Info about your work
                className="flex flex-col gap-3"
              >
                <div className="flex flex-row justify-between items-end">
                  <MySelect
                    label="Department"
                    name="department"
                    className="flex flex-col "
                    required
                  >
                    <option disabled value="" className="text-gray-400">
                      My department
                    </option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
                  </MySelect>
                  <div className="flex flex-col">
                    <MyTextInputRequired
                      label="Job Title"
                      name="jobTitle"
                      type="text"
                      placeholder="Marketing Communication Specialist"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <MySelect
                    label="Company"
                    name="company"
                    className="flex flex-col"
                    required
                  >
                    <option disabled value="" className="text-gray-400">
                      My company
                    </option>
                    <option value="Avast">Avast</option>
                    <option value="Norton">Norton</option>
                    <option value="Other">Other</option>
                  </MySelect>

                  <MySelect
                    label="Location"
                    name="location"
                    className="flex flex-col "
                    required
                  >
                    <option disabled selected value="">
                      My location
                    </option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
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
                  rows="3"
                />
              </div>

              <div
              // Checkboxes
              >
                <MyCheckbox
                  name="remoteWork"
                  className="appearance-none border-2 bg-contain  w-4 h-4 cursor-pointer rounded-sm
                      checked:bg-check-box checked:bg-secondary checked:border-secondary"
                >
                  <div>I am open to remote work.</div>
                </MyCheckbox>
                <MyCheckbox
                  name="relocation"
                  className="appearance-none border-2 bg-contain  w-4 h-4 cursor-pointer rounded-sm
                      checked:bg-check-box checked:bg-secondary checked:border-secondary"
                >
                  <div>I am open to relocation.</div>
                </MyCheckbox>
              </div>

              <div
                // Buttons
                className="flex justify-between items-center gap-4"
              >
                <Link href={'/'} passHref>
                  <button
                    type="reset"
                    className="px-12 py-2 rounded-md
                            bg-gray-200"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-12 py-2 rounded-md
                            bg-green-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </>
      </Formik>
    </>
  );
}
