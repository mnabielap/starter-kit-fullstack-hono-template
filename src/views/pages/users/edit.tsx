import { FC } from 'hono/jsx';
import { MainLayout } from '../../layouts/main';

export const UserEditView: FC = () => {
  return (
    <MainLayout title="Edit User" path="/users">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Edit User</h1>
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
                    <form id="editUserForm">
                        <input type="hidden" id="userId" />
                        
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Full Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="name" />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" id="email" />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" id="password" placeholder="Leave blank to keep current" />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <a href="/users" className="btn btn-light">Cancel</a>
                            <button type="submit" className="btn btn-primary px-4">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        async function loadUser() {
            if (!userId) return;
            const response = await API.fetch(\`/v1/users/\${userId}\`);
            const data = await response.json();
            
            if (response.ok) {
                document.getElementById('userId').value = data.id;
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;
            } else {
                 Swal.fire({icon: 'error', title: 'Not Found', text: 'User not found'}).then(() => window.location.href = API.baseUrl + '/users');
            }
        }

        document.getElementById('editUserForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {};
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (name) data.name = name;
            if (email) data.email = email;
            if (password) data.password = password;

            try {
                const response = await API.fetch(\`/v1/users/\${userId}\`, {
                    method: 'PATCH',
                    body: JSON.stringify(data)
                });
                const resData = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User updated successfully',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = API.baseUrl + '/users';
                    });
                } else {
                    let errorMessage = resData.message;
                    if(typeof resData.message === 'object') errorMessage = Object.values(resData.message).join('<br>');
                    Swal.fire({icon: 'error', title: 'Failed', html: errorMessage});
                }
            } catch (error) {
                Swal.fire({icon: 'error', title: 'Error', text: 'An unexpected error occurred.'});
            }
        });

        loadUser();
      `}}></script>
    </MainLayout>
  );
};