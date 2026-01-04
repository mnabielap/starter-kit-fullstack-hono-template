import { FC } from 'hono/jsx';
import { MainLayout } from '../../layouts/main';

export const DashboardView: FC = () => {
  return (
    <MainLayout title="Dashboard" path="/">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Welcome Back!</h5>
              <p className="card-text text-muted">This is a starter kit template using Hono and Bootstrap 5.</p>
              
              <div className="alert alert-info mt-3" role="alert">
                <i className="bi bi-info-circle-fill me-2"></i>
                <strong>Logged in User ID:</strong> <span id="user-id-display">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        // Fetch User Profile locally to test Token availability
        const user = API.getUser();
        if(user) {
            document.getElementById('user-id-display').innerText = user.sub;
        } else {
            document.getElementById('user-id-display').innerText = 'Not Authenticated';
        }
      `}}></script>
    </MainLayout>
  );
};