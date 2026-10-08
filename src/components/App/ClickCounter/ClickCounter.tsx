import Button from '../../Button/Button';

interface ClickCounter {
  clicks: number;
  onClick: () => void;
}
export default function ClickCounter({ clicks, onClick }: ClickCounter) {
  return <Button text={`Clicks: ${clicks}`} onClick={onClick} />;
}
