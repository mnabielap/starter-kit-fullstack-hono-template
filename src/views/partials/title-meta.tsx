import { FC } from 'hono/jsx';

interface Props {
  title?: string;
}

export const TitleMeta: FC<Props> = ({ title }) => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{title ? title : ''} | Hono Fullstack Template</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta content="Fullstack Hono Starter with Bootstrap 5" name="description" />
      <meta content="Starter" name="author" />
      {/* You can add a favicon link here if you have one in public/ */}
    </>
  );
};