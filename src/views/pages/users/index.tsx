import { FC } from 'hono/jsx';
import { MainLayout } from '../../layouts/main';

export const UserListView: FC = () => {
  return (
    <MainLayout title="User List" path="/users">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">User Management</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
            <a href="/users/create" className="btn btn-sm btn-primary">
                <i className="bi bi-plus-lg me-1"></i> Create User
            </a>
        </div>
      </div>

      <style>{`
        .sortable { cursor: pointer; user-select: none; }
        .sortable:hover { background-color: #f1f1f1; }
        .sort-icon { font-size: 0.8em; margin-left: 5px; }
      `}</style>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
             <div className="row g-3">
                {/* 1. Search Scope & Input */}
                <div className="col-md-5">
                    <div className="input-group">
                        <select className="form-select flex-shrink-0" style={{maxWidth:'120px'}} id="searchScope" onchange="resetPageAndLoad()">
                            <option value="all">All</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="id">ID</option>
                        </select>
                        <input type="text" className="form-control" id="searchQuery" placeholder="Search..." oninput="debounceSearch()" />
                        <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                    </div>
                </div>

                {/* 2. Role Filter */}
                <div className="col-md-3">
                    <select className="form-select" id="filterRole" onchange="resetPageAndLoad()">
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* 3. Rows Per Page */}
                <div className="col-md-2">
                    <select className="form-select" id="limit" onchange="resetPageAndLoad()">
                        <option value="10">10 Rows</option>
                        <option value="25">25 Rows</option>
                        <option value="50">50 Rows</option>
                        <option value="all">All</option>
                    </select>
                </div>

                {/* 4. Reset Button */}
                <div className="col-md-2">
                    <button className="btn btn-outline-secondary w-100" onclick="clearFilters()">
                        <i className="bi bi-arrow-counterclockwise"></i> Reset
                    </button>
                </div>
            </div>
        </div>

        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-striped table-hover mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className="sortable ps-4" onclick="updateSort('id')" data-sort="id">ID <span className="sort-icon"></span></th>
                            <th className="sortable" onclick="updateSort('name')" data-sort="name">Name <span className="sort-icon"></span></th>
                            <th className="sortable" onclick="updateSort('email')" data-sort="email">Email <span className="sort-icon"></span></th>
                            <th className="sortable" onclick="updateSort('role')" data-sort="role">Role <span className="sort-icon"></span></th>
                            <th className="sortable" onclick="updateSort('created_at')" data-sort="created_at">Created At <span className="sort-icon"></span></th>
                            <th className="text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                         <tr><td colSpan={6} className="text-center p-5">Loading...</td></tr>
                    </tbody>
                </table>
            </div>

            {/* No Result State */}
            <div id="noresult" className="text-center p-5" style={{display: 'none'}}>
                <i className="bi bi-search fs-1 text-muted"></i>
                <h5 className="mt-3">No Result Found</h5>
                <p className="text-muted">We've searched our database but did not find any data.</p>
            </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
             <div className="text-muted small">
                Showing <span className="fw-bold" id="totalResults">0</span> results <span id="pageInfo"></span>
             </div>
             <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end mb-0" id="paginationControls"></ul>
             </nav>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        // --- State ---
        let currentPage = 1;
        let totalPages = 1;
        let currentLimit = 10;
        
        let currentSortField = 'created_at';
        let currentSortOrder = 'desc';
        let debounceTimer;

        const STORAGE_KEY = 'user_table_state';

        function saveState() {
            const state = {
                page: currentPage,
                limit: document.getElementById('limit').value,
                sortField: currentSortField,
                sortOrder: currentSortOrder,
                searchQuery: document.getElementById('searchQuery').value,
                searchScope: document.getElementById('searchScope').value,
                filterRole: document.getElementById('filterRole').value
            };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        function restoreState() {
            const savedState = sessionStorage.getItem(STORAGE_KEY);
            if (savedState) {
                try {
                    const state = JSON.parse(savedState);
                    currentPage = state.page || 1;
                    currentLimit = state.limit || 10;
                    currentSortField = state.sortField || 'created_at';
                    currentSortOrder = state.sortOrder || 'desc';

                    document.getElementById('limit').value = state.limit || 10;
                    document.getElementById('searchQuery').value = state.searchQuery || '';
                    document.getElementById('searchScope').value = state.searchScope || 'all';
                    document.getElementById('filterRole').value = state.filterRole || '';
                } catch (e) {
                    console.error("Failed to restore state", e);
                    sessionStorage.removeItem(STORAGE_KEY);
                }
            }
        }

        function formatDate(dateString) {
            if(!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

        function debounceSearch() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                currentPage = 1;
                loadUsers();
            }, 500);
        }

        function clearFilters() {
            document.getElementById('searchQuery').value = '';
            document.getElementById('searchScope').value = 'all';
            document.getElementById('filterRole').value = '';
            document.getElementById('limit').value = '10';
            
            currentPage = 1;
            currentSortField = 'created_at';
            currentSortOrder = 'desc';

            sessionStorage.removeItem(STORAGE_KEY);
            loadUsers();
        }

        function updateSort(field) {
            if (currentSortField === field) {
                currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortField = field;
                currentSortOrder = 'asc';
            }
            resetPageAndLoad(false);
        }

        function updateHeaderIcons() {
            document.querySelectorAll('.sortable').forEach(th => {
                const iconSpan = th.querySelector('.sort-icon');
                iconSpan.innerHTML = '<i class="bi bi-arrow-down-up text-muted opacity-25"></i>'; // Default
            });

            const activeHeader = document.querySelector(\`th[data-sort="\${currentSortField}"]\`);
            if (activeHeader) {
                const iconSpan = activeHeader.querySelector('.sort-icon');
                if (currentSortOrder === 'asc') iconSpan.innerHTML = '<i class="bi bi-arrow-up text-primary"></i>';
                else iconSpan.innerHTML = '<i class="bi bi-arrow-down text-primary"></i>';
            }
        }

        function resetPageAndLoad(resetPage = true) {
            if(resetPage) currentPage = 1;
            loadUsers();
        }

        function goToPage(page) {
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                loadUsers();
            }
        }

        async function loadUsers() {
            const query = document.getElementById('searchQuery').value;
            const scope = document.getElementById('searchScope').value;
            const role = document.getElementById('filterRole').value;
            currentLimit = document.getElementById('limit').value;

            const params = new URLSearchParams({
                page: currentPage,
                limit: currentLimit,
                sortBy: \`\${currentSortField}:\${currentSortOrder}\`
            });

            if (query) {
                params.append('search', query);
                params.append('scope', scope);
            }
            if (role) {
                params.append('role', role);
            }

            updateHeaderIcons();

            try {
                const response = await API.fetch(\`/v1/users?\${params.toString()}\`);
                const data = await response.json();

                if (response.ok) {
                    renderTable(data.results);
                    
                    totalPages = data.totalPages;
                    document.getElementById('totalResults').innerText = data.totalResults;
                    
                    if (currentLimit !== 'all') {
                        document.getElementById('pageInfo').innerText = \`(Page \${data.page} of \${data.totalPages})\`;
                    } else {
                        document.getElementById('pageInfo').innerText = '';
                    }

                    renderPagination(data.page, data.totalPages);
                    saveState();
                } else {
                    Swal.fire({icon: 'error', title: 'Error', text: data.message || 'Error loading data'});
                }
            } catch (error) {
                console.error(error);
            }
        }

        function renderTable(users) {
            const tbody = document.getElementById('usersTableBody');
            const noResult = document.getElementById('noresult');
            tbody.innerHTML = '';

            if (users.length === 0) {
                noResult.style.display = 'block';
            } else {
                noResult.style.display = 'none';
                users.forEach(user => {
                    const editUrl = \`\${API.baseUrl}/users/edit?id=\${user.id}\`;
                    const badgeClass = user.role === 'admin' ? 'text-bg-danger' : 'text-bg-success';
                    
                    const tr = \`
                        <tr>
                            <td class="ps-4 fw-bold">#\${user.id}</td>
                            <td>\${user.name}</td>
                            <td>\${user.email}</td>
                            <td><span class="badge \${badgeClass} text-uppercase">\${user.role}</span></td>
                            <td>\${formatDate(user.created_at)}</td>
                            <td class="text-end pe-4">
                                <div class="btn-group btn-group-sm">
                                    <a href="\${editUrl}" class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i> Edit</a>
                                    <button class="btn btn-outline-danger" onclick="deleteUser('\${user.id}')"><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    \`;
                    tbody.innerHTML += tr;
                });
            }
        }

        function renderPagination(current, total) {
            const container = document.getElementById('paginationControls');
            container.innerHTML = '';

            if (total <= 1) return;

            const createItem = (text, page, isActive = false, isDisabled = false) => {
                const li = document.createElement('li');
                li.className = \`page-item \${isActive ? 'active' : ''} \${isDisabled ? 'disabled' : ''}\`;
                
                const a = document.createElement('a');
                a.className = 'page-link';
                a.href = 'javascript:void(0);';
                a.innerHTML = text;
                
                if (!isDisabled) a.onclick = () => goToPage(page);
                
                li.appendChild(a);
                return li;
            };

            container.appendChild(createItem('<span aria-hidden="true">&laquo;</span>', 1, false, current === 1));
            container.appendChild(createItem('<span aria-hidden="true">&lsaquo;</span>', current - 1, false, current === 1));

            let startPage = Math.max(1, current - 1);
            let endPage = Math.min(total, current + 1);

            if (current === 1) endPage = Math.min(total, 3);
            if (current === total) startPage = Math.max(1, total - 2);

            for (let i = startPage; i <= endPage; i++) {
                container.appendChild(createItem(i, i, i === current));
            }

            container.appendChild(createItem('<span aria-hidden="true">&rsaquo;</span>', current + 1, false, current === total));
            container.appendChild(createItem('<span aria-hidden="true">&raquo;</span>', total, false, current === total));
        }

        async function deleteUser(userId) {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                try {
                    const response = await API.fetch(\`/v1/users/\${userId}\`, { method: 'DELETE' });
                    if (response.ok || response.status === 204) {
                        Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        loadUsers();
                    } else {
                        const data = await response.json();
                        Swal.fire({icon: 'error', title: 'Oops...', text: data.message});
                    }
                } catch (error) {
                    Swal.fire({icon: 'error', title: 'Oops...', text: 'Something went wrong!'});
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            restoreState();
            loadUsers();
        });
      `}}></script>
    </MainLayout>
  );
};