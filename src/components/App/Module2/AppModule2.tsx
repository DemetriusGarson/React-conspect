import Button from '../../Button/Button';
import OrderForm from '../../OrderForm/OrderForm';
import ReactForm from '../../ReactForm/ReactForm';
import SearchForm from '../../SearchForm/SearchForm';
import SimpleForm from '../../SimpleForm/SimpleForm';
import type { ModuleOptions, Modules } from '../../types/Modules';
import type { Article } from '../../types/Article';
import { useEffect, useState } from 'react';
import ArticlesList from '../../ArticlesList/ArticlesList';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { fetchArticles } from '../../../services/articleService';
import axios from 'axios';
import Timer from '../../Timer/Timer';
import Modal from '../../Modal/Modal';
import Modal2 from '../../Modal2/Modal2';

interface AppModule2Props {
  modules: Modules;
  visibilityHandler: (module: ModuleOptions) => void;
}

export interface handleOrderProps {
  username: string;
  deliveryMethod: string;
  restrictions: string[];
  deliveryTime: string;
}
export default function AppModule2({
  modules,
  visibilityHandler,
}: AppModule2Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const [person, setPerson] = useState(null);
  const [count, setCount] = useState<number>(1);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    console.log('You can see me only once');
  }, []);

  useEffect(() => {
    // console.log('First Effect');
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://swapi.info/api/people/${count}`,
        );
        setPerson(response.data);
        // console.log('Response received');
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacter();
    console.log('Effect run for', count);
    return () => {
      console.log('Effect cleanup for', count);
    };
  }, [count]);

  // useEffect(() => {
  //   // console.log('Second Effect');
  //   if (!person) return;
  //   // console.log(`Second Effect, Person:${person}`);
  // }, [person]);

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  console.log('App Rendered');

  const handleOrder = ({
    username,
    deliveryMethod,
    restrictions,
    deliveryTime,
  }: handleOrderProps) => {
    console.log(
      `Order received from: ${username}, Delivery method: ${deliveryMethod}, Restrictions: ${restrictions}, Delivery Time: ${deliveryTime}`,
    );
  };

  const handleSearch = async (topic: string) => {
    console.log(topic);

    try {
      setIsError(false);
      setIsLoading(true);

      const articlesData = await fetchArticles({ topic });

      setIsLoading(false);
      setArticles(articlesData);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      {modules.module2 && (
        <>
          <h1>MODULE_2: Форми та ефекти</h1>
          <div>
            <Button text="Open Modal" onClick={openModal} />
            {isModal && (
              <Modal2 onClose={closeModal}>
                <p>Props children</p>
              </Modal2>
            )}
          </div>
          <div>
            <SimpleForm />
            <ReactForm />
          </div>

          <div>
            <h2>Place your order</h2>
            <OrderForm onSubmit={handleOrder} />
          </div>

          <div>
            <h2>Enter search text</h2>
            <SearchForm onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {articles.length > 0 && <ArticlesList articles={articles} />}
          </div>

          <div>
            <Button
              text={count.toString()}
              onClick={() => {
                setCount(count + 1);
              }}
            />
          </div>

          <div>
            <Button
              text={isTimerOpen ? 'Hide Timer' : 'Show Timer'}
              onClick={() => {
                setIsTimerOpen(!isTimerOpen);
              }}
            />
            {isTimerOpen && <Timer />}
          </div>

          <Button
            text={modules.module2 ? 'Hide Module_2' : 'Show Module_2'}
            variant={modules.module2 ? 'primary' : undefined}
            onClick={() => visibilityHandler('module2')}
          />
        </>
      )}
    </>
  );
}
