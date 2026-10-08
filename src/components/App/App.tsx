import { useState } from 'react';
import Alert from '../Alert/Alert';
import BooksList from '../BooksList/BooksList';
import Button from '../Button/Button';
import Clicker from '../Clicker/Clicker';
import MailBox from '../MailBox/MailBox';
import Product from '../Product/Product';
import type { Book } from '../types/Book';
import UsersContainer from '../UsersContainer/UsersContainer';
import ClickCounter from './ClickCounter/ClickCounter';
import type { Values } from '../types/Values';

const books: Book[] = [
  { id: 'id-1', name: 'JS for beginners' },
  { id: 'id-2', name: 'React basics' },
  { id: 'id-3', name: 'React Query overview' },
];

function App() {
  const [clicks, setClicks] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, setValues] = useState<Values>({ x: 0, y: 0 });

  const clickHandler = () => {
    setClicks(clicks + 1);
  };

  const toggleHideMessage = () => {
    setIsOpen(!isOpen);
  };

  const updateValue = (key: keyof Values) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  };

  const updateX = () => {
    setValues({
      ...values,
      x: values.x + 1,
    });
  };

  const updateY = () => {
    setValues({
      ...values,
      y: values.y + 1,
    });
  };
  return (
    <>
      <h1>TITLE</h1>
      <MailBox username="User" messages={['message', 'tra']} />
      <Product name="React" price={1} imgUrl="/" />
      <Product name="Next" price={2} imgUrl="/" />
      <p>Books:</p>
      <BooksList books={books} />
      <Alert type="success" message="Success" />
      <Alert type="error" message="Error" />
      <Alert />
      <Button text="Default Button" />
      <Button text="Primary Button" variant="primary" />
      <Button text="Secondary Button" variant="secondary" />
      <Clicker />
      <Clicker />
      <ClickCounter clicks={clicks} onClick={clickHandler} />
      <ClickCounter clicks={clicks} onClick={clickHandler} />
      <Button
        text={isOpen ? 'Hide message' : 'Show Message'}
        onClick={toggleHideMessage}
      />
      {isOpen && <p>Hidden Message</p>}
      <Button text="X+1" onClick={updateX} />
      <Button text="Y+1" onClick={updateY} />
      <Button
        text="Update X+1"
        onClick={() => updateValue('x')}
        variant="secondary"
      />
      <Button
        text="Update Y+1"
        onClick={() => updateValue('y')}
        variant="secondary"
      />
      <p>{`Value X: ${values.x}; Value Y: ${values.y};`}</p>
      <UsersContainer users={[{ name: '1' }, { name: '2' }]} />
    </>
  );
}

export default App;
