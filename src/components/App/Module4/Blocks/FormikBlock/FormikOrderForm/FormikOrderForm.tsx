import { Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './FormikOrderForm.module.css';
import { useId } from 'react';

interface FormikOrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
  delivery: string;
  restrictions: string[];
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

                <label className={css.label} htmlFor={`${formId}-email`}>
                  Email
                </label>

                <Field
                  className={css.field}
                  type="email"
                  name="email"
                  id={`${formId}-email`}
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
                </fieldset>

                <fieldset className={css.fieldset}>
                  <legend className={css.legend}>Comment to order:</legend>
                  <Field
                    as="textarea"
                    className={css.textarea}
                    name="comment"
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
