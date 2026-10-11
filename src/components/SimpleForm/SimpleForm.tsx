import type { SyntheticEvent } from 'react';

import Button from '../Button/Button';

import css from './SimpleForm.module.css';

export default function SimpleForm() {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    console.log('Username:', username);
    form.reset();
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <Button type="submit" text="Submit" />
    </form>
  );
}
