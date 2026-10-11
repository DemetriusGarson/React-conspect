import { useId } from 'react';
import Button from '../Button/Button';
import css from './SearchForm.module.css';

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}
export default function SearchForm({ onSubmit }: SearchFormProps) {
  const fieldId = useId();
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get('topic') as string;

    if (topic === '') {
      alert('Please enter search topic');
      return;
    }

    onSubmit(topic);
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <label htmlFor={`${fieldId}-topic`}>Search News</label>
      <input type="text" name="topic" id={`${fieldId}-topic`} />
      <Button type="submit" text="Search" />
    </form>
  );
}
