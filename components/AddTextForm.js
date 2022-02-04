import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-gray-400 text-sm" htmlFor={props.id || props.name}>
        {label}
      </label>

      <input
        className="text-input w-auto h-7 border rounded-sm 
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
      <label className="text-gray-400 text-sm" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="flex w-[170px] h-7 border rounded-sm  bg-gray-100"
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
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          linkedIn: '',
          otherURL: '',
          shareEmail: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address'),

          company: Yup.string()
            .oneOf(['Avast', 'Norton', 'Other'])
            .required('Required'),
          linkedIn: Yup.string()
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              'Enter correct url!'
            )
            .required('Please enter website'),
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
            className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full ${zIndex}
                          bg-secondary opacity-100 
                          cursor-default`}
          ></div>
          <div
            className={`${zIndex} flex px-14 pt-14 pb-14 rounded-lg
                  bg-primary  shadow-md`}
          >
            <Form className="flex flex-col gap-8 ">
              <div className="flex flex-row gap-6">
                <div className="flex flex-col ">
                  <MyTextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Ondrej"
                  />
                </div>
                <div className="flex flex-col">
                  <MyTextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Drapalik"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="ondrej.drapalik@gmail.com"
                />
              </div>
              <div className="flex flex-row gap-6">
                <MySelect
                  label="Company"
                  name="company"
                  className="flex flex-col "
                >
                  <option value="">Select a company</option>
                  <option value="Avast">Avast</option>
                  <option value="Norton">Norton</option>
                  <option value="Other">Other</option>
                </MySelect>

                {/* <MySelect
                  label="Department"
                  name="department"
                  className="flex flex-col "
                >
                  <option value="">Select a job type</option>
                  <option value="designer">Designer</option>
                  <option value="development">Developer</option>
                  <option value="product">Product Manager</option>
                  <option value="other">Other</option>
                </MySelect> */}
              </div>

              <div className="flex flex-col">
                <MyTextInput
                  label="LinkedIn"
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

              <MyCheckbox
                name="shareEmail"
                className="appearance-none border-2 bg-contain  w-4 h-4 cursor-pointer rounded-sm
                      checked:bg-check-box checked:bg-secondary checked:border-secondary"
              >
                <div>I wish to share my email with others publicly.</div>
              </MyCheckbox>

              <div className="flex justify-between items-center gap-4">
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
