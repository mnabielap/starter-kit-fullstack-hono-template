import { FC } from 'hono/jsx';
import { AuthLayout } from '../../layouts/auth';

export const LoginView: FC = () => {
  return (
    <AuthLayout title="Sign In">
      <div className="card shadow-sm">
        <div className="card-body p-4">
            <div className="text-center mb-4">
                <i className="bi bi-box-seam fs-1 text-primary"></i>
                <h4 className="mt-2">Welcome Back</h4>
                <p className="text-muted">Sign in to continue.</p>
            </div>

            <form id="loginForm">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required defaultValue="admin@example.com" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password" required defaultValue="password123" />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="/forgot-password" class="text-decoration-none">Forgot Password?</a>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign In</button>
            </form>

            <div className="mt-4 text-center">
                <p className="mb-0">Don't have an account? <a href="/register" className="text-primary fw-bold text-decoration-none">Sign Up</a></p>
            </div>
        </div>
      </div>
      
      {/* Client-side Login Logic */}
      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const btn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerText;
            btn.innerText = 'Signing In...';
            btn.disabled = true;

            try {
                const response = await API.fetch('/v1/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    API.saveTokens(data.tokens);
                    window.location.href = API.baseUrl + '/'; 
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.message
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred connecting to server'
                });
            } finally {
                btn.innerText = originalBtnText;
                btn.disabled = false;
            }
        });
      `}}></script>
    </AuthLayout>
  );
};