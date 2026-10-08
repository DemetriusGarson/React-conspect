import type { Book } from '../types/Book';

interface BooksList {
  books: Book[];
}

export default function BooksList({ books }: BooksList) {
  return (
    <ul>
      {books.map((book) => {
        return (
          <li key={book.id}>
            <p>{book.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
