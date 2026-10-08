interface MailBox {
  username: string;
  messages: string[];
}

export default function MailBox({ username, messages }: MailBox) {
  return (
    <>
      <p>Hello {username}</p>
      {messages.length > 0 ? (
        <>
          <p>You have {messages.length} unread messages</p>
          <p>Check your inbox to read them!</p>
          <button>Open inbox</button>
        </>
      ) : (
        <p>You Don't have unread messages</p>
      )}
    </>
  );
}
