interface ErrorMessageProps {
  err?: Error;
}

export default function ErrorMessage({ err }: ErrorMessageProps) {
  return err ? (
    <p>{`Error: ${err.message}`}</p>
  ) : (
    <p>Something went wrong...</p>
  );
}
