import Button from '../Button/Button';
import css from './ReactForm.module.css';

export default function ReactForm() {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    console.log('Username:', username);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input type="text" name="username" defaultValue="Dmytro" />
      <Button type="submit" text="React Action From Submit" />
    </form>
  );
}
