import { useId } from 'react';
import Button from '../Button/Button';
import type { handleOrderProps } from '../App/Module3/AppModule3';
import css from './OrderForm.module.css';

interface OrderFormProps {
  onSubmit: (orderFormData: handleOrderProps) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const fieldId = useId();

  const handleSubmit = (formData: FormData) => {
    const data: handleOrderProps = {
      ...Object.fromEntries(formData.entries()),
      restrictions: formData.getAll('restrictions') as string[],
    } as handleOrderProps;
    onSubmit(data);

    // const username = formData.get('username') as string;
    // const deliveryMethod = formData.get('delivery') as string;
    // const restrictions = formData.getAll('restrictions') as string[];
    // const deliveryTime = formData.get('deliveryTime') as string;
    // onSubmit({ username, deliveryMethod, restrictions, deliveryTime });
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <label htmlFor={`${fieldId}-username`}>Enter your name</label>
      <input type="text" name="username" id={`${fieldId}-username`} />

      <fieldset>
        <legend>Delivery method:</legend>

        <label htmlFor={`${fieldId}-pickup`}>Pickup</label>
        <input
          type="radio"
          name="delivery"
          value="pickup"
          id={`${fieldId}-pickup`}
          defaultChecked
        />

        <label htmlFor={`${fieldId}-courier`}>Courier</label>
        <input
          type="radio"
          name="delivery"
          value="courier"
          id={`${fieldId}-courier`}
        />

        <label htmlFor={`${fieldId}-drone`}>Drone</label>
        <input
          type="radio"
          name="delivery"
          value="drone"
          id={`${fieldId}-drone`}
        />
      </fieldset>

      <fieldset>
        <legend>Dietary restrictions:</legend>

        <label htmlFor={`${fieldId}-vegan`}>Vegan</label>
        <input
          type="checkbox"
          name="restrictions"
          value="vegan"
          id={`${fieldId}-vegan`}
        />

        <label htmlFor={`${fieldId}-gluten-free`}>Gluten-free</label>
        <input
          type="checkbox"
          name="restrictions"
          value="gluten-free"
          id={`${fieldId}-gluten-free`}
        />

        <label htmlFor={`${fieldId}-nut-free`}>Nut-free</label>
        <input
          type="checkbox"
          name="restrictions"
          value="nut-free"
          id={`${fieldId}-nut-free`}
        />
      </fieldset>

      <label htmlFor={`${fieldId}-deliveryTime`}></label>
      <select
        name="deliveryTime"
        id={`${fieldId}-deliveryTime`}
        defaultValue=""
      >
        <option value="">-- Choose delivery time --</option>
        <option value="morning">Morning (8:00–12:00)</option>
        <option value="afternoon">Afternoon (12:00–16:00)</option>
        <option value="evening">Evening (16:00–20:00)</option>
      </select>
      <Button text="Place Order" type="submit" />
    </form>
  );
}
