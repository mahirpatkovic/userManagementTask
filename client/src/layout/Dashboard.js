import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Users from '../pages/Users';
import SingleUserPage from '../pages/SingleUserPage';
import PermissionsPage from '../pages/Permissions';
import ContentHome from './Content';

function Dashboard() {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path='/' element={<ContentHome />}>
                        <Route index element={<Users />} />
                        <Route
                            path='/permissions'
                            element={<PermissionsPage />}
                        />
                        <Route path='/users/:id' element={<SingleUserPage />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default Dashboard;
