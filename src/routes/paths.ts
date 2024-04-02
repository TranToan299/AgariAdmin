function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),

  app: {
    root: path(ROOTS_DASHBOARD, '/home'),
    job: {
      root: path(ROOTS_DASHBOARD, '/home/job'),
      job: path(ROOTS_DASHBOARD, '/home/job/list'),
      edit: (id: String) => path(ROOTS_DASHBOARD, `/home/job/edit/${id}`),
      new: path(ROOTS_DASHBOARD, '/home/job/new'),
      apply: path(ROOTS_DASHBOARD, '/home/job/apply'),
      applyNew: path(ROOTS_DASHBOARD, '/home/job/apply/new'),
    },
    brand: {
      root: path(ROOTS_DASHBOARD, '/home/brand'),
      brand: path(ROOTS_DASHBOARD, '/home/brand/list'),
      edit: (id: String) => path(ROOTS_DASHBOARD, `/home/brand/edit/${id}`),
      new: path(ROOTS_DASHBOARD, '/home/brand/new'),
    },
    service: {
      root: path(ROOTS_DASHBOARD, '/home/service'),
      service: path(ROOTS_DASHBOARD, '/home/service'),
      edit: (id: String) => path(ROOTS_DASHBOARD, `/home/service/${id}`),
      new: path(ROOTS_DASHBOARD, '/home/service/new'),
    },
    news: {
      root: path(ROOTS_DASHBOARD, '/home/news'),
      news: path(ROOTS_DASHBOARD, '/home/news'),
      edit: (id: String) => path(ROOTS_DASHBOARD, `/home/news/${id}`),
      new: path(ROOTS_DASHBOARD, '/home/news/new'),
    },
    taxDocument: {
      root: path(ROOTS_DASHBOARD, '/home/tax-document'),
    },
    invoice: {
      root: path(ROOTS_DASHBOARD, '/home/invoice'),
    },
    contact: {
      root: path(ROOTS_DASHBOARD, '/home/contact'),
      contact: path(ROOTS_DASHBOARD, '/home/contact'),
      new: path(ROOTS_DASHBOARD, '/home/contact/new'),
    },
    editWebsite: {
      root: path(ROOTS_DASHBOARD, '/home/edit-website'),
      home: path(ROOTS_DASHBOARD, '/home/edit-website/home'),
      about: path(ROOTS_DASHBOARD, '/home/edit-website/about'),
      service: path(ROOTS_DASHBOARD, '/home/edit-website/service'),
      carrer: path(ROOTS_DASHBOARD, '/home/edit-website/carrer'),
      contact: path(ROOTS_DASHBOARD, '/home/edit-website/contact'),
      footer: path(ROOTS_DASHBOARD, '/home/edit-website/footer'),
      logo: path(ROOTS_DASHBOARD, '/home/edit-website/logo'),
    },
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
