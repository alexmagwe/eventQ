import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/client";
import {setDoc,doc } from "firebase/firestore";
import { generateCode } from "../../../lib/index";
import { eventsCollection } from "../../../firebase/collections";
import { toast, ToastContainer } from "react-toastify";
import { EventForm, EventFormErrors } from "../types";

const CreateEventForm = () => {
    const [user] = useAuthState(auth);

    const saveEvent = async payload => {
      console.log('saving...');
      try {
        const res = await setDoc(doc(eventsCollection, payload.code), { ...payload });
        toast.success("Event Created succesfully");
      }
      catch (err) {
        toast.error('Error occured while creating event ,try again');
      }
    };

    return (
      <div>
        <ToastContainer/>
        <Formik
          initialValues={{
            name: "",
            location: "",
            date: Date(),
            time: "",
            duration: 0,
          }}
          validate={(values) => {
            const errors = {
             
            };

            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.location) {
              errors.location = "Required";
            }
            if (!values.date) {
              errors.date = "Required";
            }
            if (!values.time) {
              errors.time = "Required";
            }
            if (values.duration < 1) {
              errors.duration = "Invalid";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // if Date.now()values.date
            let eventCode = generateCode();
            let payload = { ...values, code: eventCode };
            saveEvent(payload);

            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="text-black  flex flex-col md:w-2/3 sm:w-4/5 lg:w-1/2 mx-auto md:gap-2 2xl:gap-4">
              <span className="text-white font-normal">Event name</span>
              <Field
                className="border-2 border-cyan-400 outline-cyan-400  p-2  capitalize rounded-md text-slate-800"
                type="text"
                name="name"
              />
              <ErrorMessage
                className="text-red-500"
                name="name"
                component="div"
              />
              <span className="text-md text-white font-normal capitalize">
                Event Location
              </span>
              <Field
                className="border-2 border-cyan-400 outline-cyan-400  p-2 rounded-md"
                type="text"
                name="location"
              />
              <ErrorMessage
                className="text-red-500"
                name="location"
                component="div"
              />
              <span className="text-md text-white font-normal">Event Date</span>
              <Field
                className="border-2 border-cyan-400 outline-cyan-400  p-2 rounded-md"
                type="date"
                name="date"
              />
              <ErrorMessage
                className="text-red-500"
                name="date"
                component="div"
              />
              <span className="text-md text-white font-normal">Event Time</span>
              <Field
                className="border-2 border-cyan-400 outline-cyan-400  p-2 rounded-md"
                type="time"
                name="time"
              />
              <ErrorMessage
                className="text-red-500"
                name="time"
                component="div"
              />
              <span className="text-md  text-white font-normal">Event Duration (hours)</span>
              <Field
                className="border-2 border-cyan-400 outline-cyan-400  p-2 rounded-md"
                type="number"
                name="duration"
              />
              <ErrorMessage
                className="text-red-500"
                name="duration"
                component="div"
              />
              <button
                className="border-2 text-slate-800 border-cyan-400 outline-cyan-400  w-48 p-2 rounded-md mx-auto border-none shadow-slate-700 disabled:bg-white bg-cyan-300"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
};
export default CreateEventForm;
