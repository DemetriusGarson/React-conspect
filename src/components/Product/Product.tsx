import css from './Product.module.css';

interface ProductProps {
  name: string;
  imgUrl: string;
  price: number;
}

export default function Product({ name, imgUrl, price }: ProductProps) {
  return (
    <>
      <h2 className={css.product}>Product: {name}</h2>
      <p>Price: {price}</p>
      <img src={imgUrl} alt={`${name} image`} />
    </>
  );
}
