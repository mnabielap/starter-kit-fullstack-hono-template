import { FC, PropsWithChildren } from 'hono/jsx';
import { TitleMeta } from '../partials/title-meta';
import { HeadCss } from '../partials/head-css';
import { VendorScripts } from '../partials/vendor-scripts';
import { Sidebar } from '../partials/sidebar';
import { Topbar } from '../partials/topbar';
import { Footer } from '../partials/footer';

interface MainLayoutProps {
  title: string;
  path?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({ children, title, path }) => {
  return (
    <html lang="en">
      <head>
        <TitleMeta title={title} />
        <HeadCss />
      </head>
      <body>
        <div className="d-flex" id="wrapper">
            {/* Sidebar: Becomes Offcanvas on Mobile, Flex Item on Desktop */}
            <Sidebar path={path} />

            {/* Page Content: Flex Grow to fill remaining space */}
            <div className="d-flex flex-column w-100 min-vh-100 main-content-wrapper">
                <Topbar />
                
                <div className="container-fluid p-3 p-lg-4 flex-grow-1">
                    {children}
                </div>

                <Footer />
            </div>
        </div>

        <VendorScripts />
      </body>
    </html>
  );
};