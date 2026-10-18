import css from './SelectList.module.css';

interface SelectListProps<T> {
  items: T[];
  onSelect: (item: T | null) => void;
}

export default function SelectList<T extends { name: string }>({
  items,
  onSelect,
}: SelectListProps<T>) {
  if (items.length <= 0) return;
  return (
    <ul className={css.list}>
      <li className={css.listItem} onClick={() => onSelect(null)}>
        Reset Person
      </li>
      {items.map((item) => (
        <li
          key={item.name}
          className={css.listItem}
          onClick={() => onSelect(item)}
        >
          <p className={css.itemName}>{item.name}</p>
        </li>
      ))}
    </ul>
  );
}
