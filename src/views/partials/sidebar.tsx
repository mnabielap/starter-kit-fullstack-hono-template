import { FC } from 'hono/jsx';

interface Props {
  path?: string;
}

export const Sidebar: FC<Props> = ({ path = '/' }) => {
  const isDashboard = path === '/';
  const isUsers = path.startsWith('/users');

  return (
    <div className="offcanvas-lg offcanvas-start bg-dark text-white sidebar sidebar-responsive" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
      
      {/* Offcanvas Header (Visible only on Mobile) */}
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarMenuLabel">Starter Kit</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body d-flex flex-column p-3 pt-0 h-100">
          {/* Logo Area (Visible on Desktop via flex flow, and Mobile body) */}
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none pt-3 pt-lg-0">
            <i className="bi bi-box-seam fs-4 me-2"></i>
            <span className="fs-4">Starter Kit</span>
          </a>
          <hr />
          
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/" className={`nav-link ${isDashboard ? 'active' : ''}`} aria-current="page">
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/users" className={`nav-link ${isUsers ? 'active' : ''}`}>
                <i className="bi bi-people me-2"></i>
                Users
              </a>
            </li>
          </ul>
          <hr />
          
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle fs-4 me-2"></i>
              <strong>User</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onclick="API.logout()">Sign out</a></li>
            </ul>
          </div>
      </div>
    </div>
  );
};