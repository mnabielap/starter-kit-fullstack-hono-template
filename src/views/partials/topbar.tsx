import { FC } from 'hono/jsx';

export const Topbar: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-3 px-lg-4">
      <div className="container-fluid p-0">
        
        {/* Toggle Button: Visible on Mobile (< lg), Toggles Sidebar */}
        <button className="btn btn-outline-secondary d-lg-none me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
            <i className="bi bi-list fs-5"></i>
        </button>

        {/* Brand on Mobile Topbar (Optional, since sidebar is hidden) */}
        <a className="navbar-brand d-lg-none fw-bold" href="#">Starter Kit</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href="#" onclick="API.logout()">Logout</a>
                </li>
            </ul>
        </div>
      </div>
    </nav>
  );
};