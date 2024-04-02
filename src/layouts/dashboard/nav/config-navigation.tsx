import i18next from 'i18next';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: i18next.t('systemManagement'),

    items: [
      {
        title: i18next.t('home'),
        path: PATH_DASHBOARD.app.root,
        icon: ICONS.label,
        children: [
          // {
          //   title: i18next.t('product'),
          //   path: PATH_DASHBOARD.app.product.product,
          // },
          {
            title: i18next.t('job'),
            path: PATH_DASHBOARD.app.job.root,
            children: [
              { title: i18next.t('listOfJob'), path: PATH_DASHBOARD.app.job.job },
              { title: i18next.t('listOfCV'), path: PATH_DASHBOARD.app.job.apply },
            ],
          },
          {
            title: i18next.t('service'),
            path: PATH_DASHBOARD.app.service.service,
          },
          {
            title: i18next.t('brandName'),
            path: PATH_DASHBOARD.app.brand.brand,
          },

          {
            title: i18next.t('news'),
            path: PATH_DASHBOARD.app.news.news,
          },
          {
            title: i18next.t('taxDocument'),
            path: PATH_DASHBOARD.app.taxDocument.root,
          },
          {
            title: i18next.t('invoice'),
            path: PATH_DASHBOARD.app.invoice.root,
          },
          {
            title: i18next.t('editWebsite'),
            path: PATH_DASHBOARD.app.editWebsite.root,
            children: [
              { title: i18next.t('logo'), path: PATH_DASHBOARD.app.editWebsite.logo },
              { title: i18next.t('Home'), path: PATH_DASHBOARD.app.editWebsite.home },
              { title: i18next.t('Service'), path: PATH_DASHBOARD.app.editWebsite.service },
              { title: i18next.t('aboutPage'), path: PATH_DASHBOARD.app.editWebsite.about },
              { title: i18next.t('carrer'), path: PATH_DASHBOARD.app.editWebsite.carrer },
              { title: i18next.t('Contact'), path: PATH_DASHBOARD.app.editWebsite.contact },
              { title: i18next.t('footer'), path: PATH_DASHBOARD.app.editWebsite.footer },
            ],
          },
        ],
      },
    ],
  },
];

export default navConfig;
