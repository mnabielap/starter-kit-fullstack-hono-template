import { FC } from 'hono/jsx';

export const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-3 bg-white border-top text-center text-muted">
      <div className="container">
        <span>{year} © Starter Kit. Design with Bootstrap 5.</span>
      </div>
    </footer>
  );
};