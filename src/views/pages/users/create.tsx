import { FC } from 'hono/jsx';
import { MainLayout } from '../../layouts/main';

export const UserCreateView: FC = () => {
  return (
    <MainLayout title="Create User" path="/users/create">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create New User</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
             <a href="/users" className="btn btn-sm btn-outline-secondary">
                <i className="bi bi-arrow-left"></i> Back to List
             </a>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form id="createUserForm">
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Full Name <span className="text-danger">*</span></label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email <span className="text-danger">*</span></label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password <span className="text-danger">*</span></label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                                <div className="form-text">Must contain at least 8 chars, 1 letter, 1 number.</div>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="role" className="col-sm-3 col-form-label">Role</label>
                            <div className="col-sm-9">
                                <select className="form-select" id="role">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <a href="/users" className="btn btn-light">Cancel</a>
                            <button type="submit" className="btn btn-primary px-4">Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('createUserForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            };

            try {
                const response = await API.fetch('/v1/users', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                const data = await response.json();

                if (response.ok) {
                     Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User created successfully',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = API.baseUrl + '/users';
                    });
                } else {
                    let errorMessage = data.message;
                    if(typeof data.message === 'object') errorMessage = Object.values(data.message).join('<br>');
                    Swal.fire({icon: 'error', title: 'Failed', html: errorMessage});
                }
            } catch (error) {
                Swal.fire({icon: 'error', title: 'Error', text: 'An unexpected error occurred.'});
            }
        });
      `}}></script>
    </MainLayout>
  );
};