import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import ContactPage from './components/customer/ContactPage';
import HomePage from './components/customer/HomePage';
import DeviceList from './components/customer/DeviceList';
import ProductDetail from './components/customer/ProductDetailView';
import LoginPage from './components/auth/Login';
import DeviceManagement from './components/customer/DeviceManagement';
import DeviceHistory from './components/customer/history/HistoryPage';
import DeviceReport from './components/customer/DeviceReport';
import Notification from './components/customer/NotificationList';
import RequestBorrow from './components/customer/RequestBorrow';
import Img from './components/customer/Img';
import MyInfo from './components/customer/MyInfoPage.jsx';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminDevices from './components/admin/AdminDevices';
import AdminCategories from './components/admin/AdminCategories';
import AdminHistoryPage from './components/admin/history/HistoryPage';
import AdminUsers from './components/admin/AdminUsers';
import AdminApproval from './components/admin/AdminApproval';
import AdminSetting from './components/admin/AdminErrorHandle';
import PrivateRoute from './components/shared/PrivateRoute';
import TechnicianLayout from './layouts/TechnicianLayout'
import TechnicianDashboard from './components/technician/TechnicianDashboard';
import TechnicianTasksHistory from './components/technician/TechnicianTasksHistory';
import TechnicianToday from './components/technician/TechnicianToday';
import TechnicianMyInfo from './components/technician/TechnicianProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* ----------- PUBLIC PAGES ----------- */}
        <Route
          path='/'
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path='/detail/:keyword'
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />

        <Route
          path='/devices'
          element={
            <MainLayout>
              <DeviceList />
            </MainLayout>
          }
        />
        <Route
          path='/contact'
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

         <Route
          path='/technician'
          element={
            <TechnicianLayout>    
              <TechnicianDashboard />
            </TechnicianLayout>
          }
        />

        <Route
          path='technician/my-info'
          element={ 
            <TechnicianLayout>    
              <TechnicianMyInfo />
            </TechnicianLayout>
          }
        />

        <Route
          path='technician/tasks-history'
          element={
              <TechnicianLayout>    
              <TechnicianTasksHistory />
            </TechnicianLayout>
          }
        />

        <Route
          path='technician/in-progress'
          element={
               <TechnicianLayout>    
              <TechnicianToday />
            </TechnicianLayout>
          }
        />

        {/* ----------- PROTECTED USER PAGES ----------- */}
        <Route element={<PrivateRoute />}>
          <Route
            path='/img'
            element={
              <MainLayout>
                <Img />
              </MainLayout>
            }
          />
          <Route
            path='/my-info'
            element={
              <MainLayout>
                <MyInfo />
              </MainLayout>
            }
          />
          <Route
            path='/history'
            element={
              <MainLayout>
                <DeviceHistory />
              </MainLayout>
            }
          />
          <Route
            path='/report'
            element={
              <MainLayout>
                <DeviceReport />
              </MainLayout>
            }
          />
          <Route
            path='/request_borrow'
            element={
              <MainLayout>
                <RequestBorrow />
              </MainLayout>
            }
          />
          <Route
            path='/notification'
            element={
              <MainLayout>
                <Notification />
              </MainLayout>
            }
          />
        </Route>

        {/* ----------- ADMIN PAGES ----------- */}
        <Route element={<PrivateRoute admin />}>
          <Route
            path='/admin'
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          <Route
            path='admin/my-info'
            element={
              <AdminLayout>
                <MyInfo />
              </AdminLayout>
            }
          />
          <Route
            path='/admin/devices'
            element={
              <AdminLayout>
                <AdminDevices />
              </AdminLayout>
            }
          />
          <Route
            path='/admin/categories'
            element={
              <AdminLayout>
                <AdminCategories />
              </AdminLayout>
            }
          />
          <Route
            path='/admin/approval'
            element={
              <AdminLayout>
                <AdminApproval />
              </AdminLayout>
            }
          />
          <Route
            path='/admin/history'
            element={
              <AdminLayout>
                <AdminHistoryPage />
              </AdminLayout>
            }
          />
          
          <Route
            path='/admin/users'
            element={
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            }
          />
          <Route
            path='/admin/settings'
            element={
              <AdminLayout>
                <AdminSetting />
              </AdminLayout>
            }
          />
       
        </Route>

        {/* ----------- AUTH ----------- */}
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
