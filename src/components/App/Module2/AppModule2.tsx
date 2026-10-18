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
// import PersonInfo from '../../Person/PersonInfo';
import PersonInfo2 from '../../PersonInfo2/PersonInfo2';
// import Modal2 from '../../Modal2/Modal2';
// import Modal3 from '../../Modal3/Modal3';

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

  const [showPerson, setShowPerson] = useState<boolean>(false);
  const [person, setPerson] = useState(null);
  const [count, setCount] = useState<number>(() => {
    const savedCount = window.localStorage.getItem('count');
    if (savedCount !== null) {
      return JSON.parse(savedCount);
    }
    return 1;
  });

  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const [clicks, setClicks] = useState<number>(() => {
    const savedClicks = window.localStorage.getItem('clicks');
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return 0;
  });

  useEffect(() => {
    console.log('You can see me only once');
  }, []);

  useEffect(() => {
    // console.log('First Effect');
    window.localStorage.setItem('count', JSON.stringify(count));
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

  useEffect(() => {
    window.localStorage.setItem('clicks', JSON.stringify(clicks));
  }, [clicks]);

  console.log('App Rendered', person);

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

  const toggleShowPerson = () => {
    setShowPerson(!showPerson);
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

          <h2>Block: Modal</h2>
          <div>
            <Button text="Open Modal" onClick={openModal} />
            {isModal && (
              <Modal onClose={closeModal}>
                <p>Props children</p>
              </Modal>
            )}
          </div>

          <h2>Block: Forms</h2>
          <div>
            <SimpleForm />
            <ReactForm />
          </div>

          <h2>Block: Place your order</h2>
          <div>
            <OrderForm onSubmit={handleOrder} />
          </div>

          <h2>Block: Enter search text</h2>
          <div>
            <SearchForm onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {articles.length > 0 && <ArticlesList articles={articles} />}
          </div>

          <h2>Block: Person</h2>
          <div>
            <Button
              text={showPerson ? 'Hide Person Block' : 'Show Person Block'}
              onClick={toggleShowPerson}
            ></Button>
            {showPerson && (
              <>
                <h3>Person Navigation</h3>
                <Button
                  text="< Show previous Person "
                  onClick={() => {
                    if (count !== 1) setCount(count - 1);
                  }}
                />
                <Button
                  text="Show next Person >"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                />
                <Button
                  text="Reset Person"
                  onClick={() => {
                    setCount(1);
                  }}
                />

                {person && (
                  <>
                    <p>{`Current person No: ${count}`}</p>
                    <PersonInfo2 person={person} />
                  </>
                )}
              </>
            )}
          </div>

          <h2>Block: Timer </h2>
          <div>
            <Button
              text={isTimerOpen ? 'Hide Timer' : 'Show Timer'}
              onClick={() => {
                setIsTimerOpen(!isTimerOpen);
              }}
            />
            {isTimerOpen && <Timer />}
          </div>

          <h2>Block: Clicks to local Storage </h2>
          <div>
            <Button
              text={String(clicks)}
              onClick={() => setClicks(clicks + 1)}
            />
            <Button text="Reset clicks" onClick={() => setClicks(0)} />
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
