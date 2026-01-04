import { FC } from 'hono/jsx';

export const HeadCss: FC = () => {
  return (
    <>
      {/* Bootstrap 5 CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
      
      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

      {/* Sweet Alert 2 CSS */}
      <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet" />
      
      {/* API Client */}
      <script src="/js/api-client.js"></script>

      <style>{`
        body {
            background-color: #f8f9fa;
        }
        
        /* Sidebar Styles */
        .sidebar {
            background-color: #212529; /* Dark bg */
        }

        /* Desktop: Sidebar has fixed width and sits in the flow */
        @media (min-width: 992px) {
            .sidebar-responsive {
                width: 280px !important;
                height: 100vh;
                position: sticky;
                top: 0;
                z-index: 1000;
                display: flex !important; /* Force display on desktop */
                flex-direction: column;
            }
        }

        /* Mobile: Adjust layout since sidebar is offcanvas */
        @media (max-width: 991.98px) {
            .main-content-wrapper {
                width: 100%;
            }
        }
        
        .nav-link {
            color: rgba(255,255,255, .75);
        }
        .nav-link:hover, .nav-link.active {
            color: #fff;
            background-color: rgba(255,255,255, .1);
        }
      `}</style>
    </>
  );
};