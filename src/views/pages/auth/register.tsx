import { FC } from 'hono/jsx';
import { AuthLayout } from '../../layouts/auth';

export const RegisterView: FC = () => {
  return (
    <AuthLayout title="Sign Up">
      <div className="card shadow-sm">
        <div className="card-body p-4">
            <div className="text-center mb-4">
                <i className="bi bi-person-plus fs-1 text-success"></i>
                <h4 className="mt-2">Create Account</h4>
                <p className="text-muted">Get your free account now.</p>
            </div>

            <form id="registerForm">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder="John Doe" required />
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password" required />
                    <label htmlFor="password">Password</label>
                </div>

                <button className="btn btn-success w-100 py-2" type="submit">Sign Up</button>
            </form>

            <div className="mt-4 text-center">
                <p className="mb-0">Already have an account? <a href="/login" className="text-primary fw-bold text-decoration-none">Sign In</a></p>
            </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await API.fetch('/v1/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    API.saveTokens(data.tokens);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'Redirecting to dashboard...',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = API.baseUrl + '/';
                    });
                } else {
                    let errorMessage = data.message;
                    if(typeof data.message === 'object') {
                        errorMessage = Object.values(data.message).join('<br>');
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        html: errorMessage
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred connecting to server'
                });
            }
        });
      `}}></script>
    </AuthLayout>
  );
};