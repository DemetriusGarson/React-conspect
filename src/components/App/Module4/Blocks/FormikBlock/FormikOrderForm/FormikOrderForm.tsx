import css from './FormikOrderForm.module.css';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

interface FormikOrderFormValues {
  username: string;
  email: string;
  deliveryTime: '' | 'morning' | 'afternoon' | 'evening';
  delivery: 'pickup' | 'courier' | 'drone';
  restrictions: ('vegan' | 'gluten-free' | 'nut-free')[];
  comment: string;
}

const initialValues: FormikOrderFormValues = {
  username: 'Demetrius',
  email: 'demetriusgarson@gmail.com',
  deliveryTime: '',
  delivery: 'pickup',
  restrictions: [],
  comment: '',
};

const FormikOrderFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(30, 'Name is to long')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  deliveryTime: Yup.string().oneOf(
    ['', 'morning', 'afternoon', 'evening'],
    'Delivery Time must be one of these values: (""|morning|afternoon|evening)',
  ),

  delivery: Yup.string().oneOf(
    ['pickup', 'courier', 'drone'],
    'Delivery Method must be one of these values: (pickup|courier|drone)',
  ),
  restrictions: Yup.array().of(
    Yup.string().oneOf(
      ['vegan', 'gluten-free', 'nut-free'],
      'Restrictions must be are these values:(vegan | gluten-free | nut-free)',
    ),
  ),
  comment: Yup.string(),
});

export default function FormikOrderForm() {
  const formId = useId();
  const handleFormikOrderFormSubmit = (
    values: FormikOrderFormValues,
    actions: FormikHelpers<FormikOrderFormValues>,
  ) => {
    console.log('Data:', values);
    actions.resetForm();
  };

  return (
    <>
      <h4>FormikOrderForm</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={FormikOrderFormSchema}
        onSubmit={handleFormikOrderFormSubmit}
      >
        {(formikProps) => {
          console.log(formikProps);
          return (
            <Form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Client Info</legend>

                <label className={css.label} htmlFor={`${formId}-username`}>
                  Username
                </label>

                <Field
                  className={css.field}
                  type="text"
                  name="username"
                  id={`${formId}-username`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className={css.error}
                />

                <label className={css.label} htmlFor={`${formId}-email`}>
                  Email
                </label>

                <Field
                  className={css.field}
                  type="email"
                  name="email"
                  id={`${formId}-email`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={css.error}
                />
              </fieldset>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Order Info</legend>

                <label className={css.label} htmlFor={`${formId}-deliveryTime`}>
                  Delivery Time
                </label>
                <Field
                  as="select"
                  className={css.select}
                  name="deliveryTime"
                  id={`${formId}-deliveryTime`}
                >
                  <option className={css.option} value="">
                    -- Choose delivery time --
                  </option>
                  <option className={css.option} value="morning">
                    Morning (8:00–12:00)
                  </option>
                  <option className={css.option} value="afternoon">
                    Afternoon (12:00–16:00)
                  </option>
                  <option className={css.option} value="evening">
                    Evening (16:00–20:00)
                  </option>
                </Field>
                <ErrorMessage
                  name="deliveryTime"
                  component="p"
                  className={css.error}
                />

                <fieldset className={css.fieldset}>
                  <legend className={css.legend}>Delivery Method:</legend>

                  <label className={css.label}>
                    Pickup
                    <Field
                      type="radio"
                      className={css.radio}
                      name="delivery"
                      value="pickup"
                    />
                  </label>

                  <label className={css.label}>
                    Courier
                    <Field
                      type="radio"
                      className={css.radio}
                      name="delivery"
                      value="courier"
                    />
                  </label>

                  <label className={css.label}>
                    Drone delivery
                    <Field
                      type="radio"
                      className={css.radio}
                      name="delivery"
                      value="drone"
                    />
                  </label>
                  <ErrorMessage
                    name="delivery"
                    component="p"
                    className={css.error}
                  />
                </fieldset>

                <fieldset className={css.fieldset}>
                  <legend className={css.legend}>Restrictions:</legend>

                  <label className={css.label}>
                    Vegan
                    <Field
                      type="checkbox"
                      className={css.checkbox}
                      name="restrictions"
                      value="vegan"
                    />
                  </label>

                  <label className={css.label}>
                    Gluten-free
                    <Field
                      type="checkbox"
                      className={css.checkbox}
                      name="restrictions"
                      value="gluten-free"
                    />
                  </label>

                  <label className={css.label}>
                    Nut-free
                    <Field
                      type="checkbox"
                      className={css.checkbox}
                      name="restrictions"
                      value="nut-free"
                    />
                  </label>
                  <ErrorMessage
                    name="restrictions"
                    component="p"
                    className={css.error}
                  />
                </fieldset>

                <fieldset className={css.fieldset}>
                  <legend className={css.legend}>Comment to order:</legend>
                  <Field
                    as="textarea"
                    className={css.textarea}
                    name="comment"
                  />
                  <ErrorMessage
                    name="comment"
                    component="p"
                    className={css.error}
                  />
                </fieldset>
              </fieldset>

              <button className={css.button} type="submit">
                Place Order
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
