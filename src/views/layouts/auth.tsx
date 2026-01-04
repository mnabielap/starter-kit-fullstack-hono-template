import { FC, PropsWithChildren } from 'hono/jsx';
import { TitleMeta } from '../partials/title-meta';
import { HeadCss } from '../partials/head-css';
import { VendorScripts } from '../partials/vendor-scripts';

interface AuthLayoutProps {
  title: string;
}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <TitleMeta title={title} />
        <HeadCss />
        <style>{`
            body, html {
                height: 100%;
            }
            .auth-container {
                display: flex;
                align-items: center;
                padding-top: 40px;
                padding-bottom: 40px;
                background-color: #f5f5f5;
                min-height: 100vh;
            }
            .form-auth {
                width: 100%;
                max-width: 400px;
                padding: 15px;
                margin: auto;
            }
        `}</style>
      </head>
      <body className="text-center auth-container">
        <main className="form-auth">
            {children}
        </main>
        <VendorScripts />
      </body>
    </html>
  );
};