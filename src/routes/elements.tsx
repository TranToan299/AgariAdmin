import { ElementType, Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// Edit Page
export const EditHomePage = Loadable(lazy(() => import('../pages/edit-website/home/index')));
export const EditAboutPage = Loadable(lazy(() => import('../pages/edit-website/about/index')));
export const EditServiceContentWeb = Loadable(
  lazy(() => import('../pages/edit-website/service/index'))
);
export const EditCarrerPage = Loadable(lazy(() => import('../pages/edit-website/carrer/index')));
export const EditContactPage = Loadable(lazy(() => import('../pages/edit-website/contact/index')));
export const EditFooterPage = Loadable(lazy(() => import('../pages/edit-website/footer/index')));
export const EditLogoPage = Loadable(lazy(() => import('../pages/edit-website/logo/index')));
// ----------------------------------------------------------------------
// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));
// Brand
export const CreateBrandPage = Loadable(lazy(() => import('../pages/dashboard/brand/create')));
export const BrandListPage = Loadable(lazy(() => import('../pages/dashboard/brand/index')));
export const EditBrandPage = Loadable(lazy(() => import('../pages/dashboard/brand/edit')));
// Job
export const CreateJobPage = Loadable(lazy(() => import('../pages/dashboard/job/create')));
export const JobListPage = Loadable(lazy(() => import('../pages/dashboard/job/index')));
export const EditJobPage = Loadable(lazy(() => import('../pages/dashboard/job/edit')));
// Job Apply
export const JobApplyPage = Loadable(lazy(() => import('../pages/dashboard/job-apply/index')));
export const CreateJobApplyPage = Loadable(
  lazy(() => import('../pages/dashboard/job-apply/create'))
);
// Service
export const CreateServicePage = Loadable(lazy(() => import('../pages/dashboard/service/create')));
export const ServiceListPage = Loadable(lazy(() => import('../pages/dashboard/service/index')));
export const EditServicePage = Loadable(lazy(() => import('../pages/dashboard/service/edit')));

// News
export const CreateNewsPage = Loadable(lazy(() => import('../pages/dashboard/news/create')));
export const NewsListPage = Loadable(lazy(() => import('../pages/dashboard/news/index')));
export const EditNewsPage = Loadable(lazy(() => import('../pages/dashboard/news/edit')));
// Tax Document
export const TaxDocumentPage = Loadable(
  lazy(() => import('../pages/dashboard/tax-document/index'))
);
export const InvoicePage = Loadable(
  lazy(() => import('../pages/dashboard/invoice/index'))
);
// Contact
export const CreateContactPage = Loadable(lazy(() => import('../pages/dashboard/contact/create')));
export const ContactListPage = Loadable(lazy(() => import('../pages/dashboard/contact/index')));
// DASHBOARD: USER
export const UserProfilePage = Loadable(lazy(() => import('../pages/dashboard/UserProfilePage')));
export const UserCardsPage = Loadable(lazy(() => import('../pages/dashboard/UserCardsPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));

// TEST RENDER PAGE BY ROLE
export const PermissionDeniedPage = Loadable(
  lazy(() => import('../pages/dashboard/PermissionDeniedPage'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
