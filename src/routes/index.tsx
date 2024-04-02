import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from 'auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  BlankPage,
  BrandListPage,
  ComingSoonPage,
  ContactListPage,
  CreateBrandPage,
  CreateContactPage,
  CreateJobApplyPage,
  CreateJobPage,
  CreateNewsPage,
  CreateServicePage,
  EditAboutPage,
  EditCarrerPage,
  EditContactPage,
  EditFooterPage,
  EditHomePage,
  EditBrandPage,
  EditJobPage,
  EditNewsPage,
  EditServicePage,
  JobApplyPage,
  JobListPage,
  LoginPage,
  MaintenancePage,
  NewPasswordPage,
  //
  NewsListPage,
  Page403,
  Page404,
  //
  Page500,
  PermissionDeniedPage,
  RegisterPage,
  ResetPasswordPage,
  ServiceListPage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  // Dashboard: User
  UserListPage,
  UserProfilePage,
  VerifyCodePage,
  EditLogoPage,
  EditServiceContentWeb,
  TaxDocumentPage,
  InvoicePage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        // <AuthGuard>
        // </AuthGuard>
          <DashboardLayout />
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'home',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },

            {
              path: 'job',
              children: [
                { element: <Navigate to="/dashboard/home/job/list" replace />, index: true },
                {
                  path: 'list',
                  element: <JobListPage />,
                },
                {
                  path: 'new',
                  element: <CreateJobPage />,
                },
                {
                  path: 'edit/:id',
                  element: <EditJobPage />,
                },
                {
                  path: 'apply',
                  element: <JobApplyPage />,
                },
                {
                  path: 'apply/new',
                  element: <CreateJobApplyPage />,
                },
              ],
            },
            {
              path: 'brand',
              children: [
                { element: <Navigate to="/dashboard/home/brand/list" replace />, index: true },
                {
                  path: 'list',
                  element: <BrandListPage />,
                },
                {
                  path: 'new',
                  element: <CreateBrandPage />,
                },
                {
                  path: 'edit/:id',
                  element: <EditBrandPage />,
                },
              ],
            },
            {
              path: 'service',
              children: [
                {
                  path: '/dashboard/home/service',
                  element: <ServiceListPage />,
                },
                {
                  path: '/dashboard/home/service/new',
                  element: <CreateServicePage />,
                },
                {
                  path: '/dashboard/home/service/:id',
                  element: <EditServicePage />,
                },
              ],
            },
            {
              path: 'tax-document',
              element: <TaxDocumentPage />,
            },
            {
              path: 'invoice',
              element: <InvoicePage />,
            },
            {
              path: 'news',
              children: [
                {
                  path: '/dashboard/home/news',
                  element: <NewsListPage />,
                },
                {
                  path: '/dashboard/home/news/new',
                  element: <CreateNewsPage />,
                },
                {
                  path: '/dashboard/home/news/:id',
                  element: <EditNewsPage />,
                },
              ],
            },
            {
              path: 'contact',
              children: [
                {
                  path: '/dashboard/home/contact',
                  element: <ContactListPage />,
                },
                {
                  path: '/dashboard/home/contact/new',
                  element: <CreateContactPage />,
                },
              ],
            },
            {
              path: 'edit-website',
              children: [
                {
                  path: '/dashboard/home/edit-website/logo',
                  element: <EditLogoPage />,
                },
                {
                  path: '/dashboard/home/edit-website/home',
                  element: <EditHomePage />,
                },
                {
                  path: '/dashboard/home/edit-website/about',
                  element: <EditAboutPage />,
                },
                {
                  path: '/dashboard/home/edit-website/service',
                  element: <EditServiceContentWeb />,
                },
                {
                  path: '/dashboard/home/edit-website/carrer',
                  element: <EditCarrerPage />,
                },
                {
                  path: '/dashboard/home/edit-website/contact',
                  element: <EditContactPage />,
                },
                {
                  path: '/dashboard/home/edit-website/footer',
                  element: <EditFooterPage />,
                },
              ],
            },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },

        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <JobListPage />, index: true }],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
