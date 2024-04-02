import * as Yup from 'yup';
import { differenceInYears, addYears, isBefore } from 'date-fns';
import i18n from 'locales/i18n';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
const numberReg = /^[0-9]+$/;
const wordReg = /^([a-zA-ZÀ-ỹ]+\s)*[a-zA-ZÀ-ỹ]+$/;

const contactFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(i18n.t<string>('validate.information.nameRequired'))
    .matches(wordReg, i18n.t<string>('validate.information.nameInvalid')),
  email: Yup.string()
    .required(i18n.t<string>('validate.information.emailRequired'))
    .email(i18n.t<string>('validate.information.emailValid')),
  phoneNumber: Yup.string()
    .required(i18n.t<string>('validate.information.phoneRequired'))
    .min(10, i18n.t<string>('validate.information.minPhone'))
    .max(11, i18n.t<string>('validate.information.maxPhone'))
    .matches(numberReg, i18n.t<string>('validate.information.phoneValid')),
});

const serviceSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t<string>('validate.service.nameRequired')),
  thumbnail: Yup.mixed()
    .test({
      message: i18n.t<string>('validate.service.thumbnailRequired'),
      test: (value) => {
        if (value) {
          return true;
        }
        return false;
      },
    })
    .nullable(i18n.t<string>('validate.service.thumbnailRequired')),
  description: Yup.string().required(i18n.t<string>('validate.service.descriptionRequired')),
});

const newsSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t<string>('validate.news.nameRequired')),
  thumbnail: Yup.mixed()
    .test({
      message: i18n.t<string>('validate.news.thumbnailRequired'),
      test: (value) => {
        if (value) {
          return true;
        }
        return false;
      },
    })
    .nullable(i18n.t<string>('validate.news.thumbnailRequired')),
  description: Yup.string().required(i18n.t<string>('validate.news.descriptionRequired')),
});
const brandSchema = Yup.object().shape({
  objectName: Yup.string()
    .required(i18n.t<string>('validate.brand.brandNameRequired'))
    .max(50, i18n.t<string>('validate.common.maxLengthDescription')),
  objectCode: Yup.string()
    .required(i18n.t<string>('validate.brand.brandCodeRequired'))
    .max(50, i18n.t<string>('validate.common.maxLengthDescription')),
});

export const careerSchema = Yup.object().shape({
  province_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.career.provinceRequired'))
    .required(i18n.t<string>('validate.career.provinceRequired'))
    .test({
      message: i18n.t<string>('validate.career.provinceRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  brand_id: Yup.string().required(i18n.t<string>('validate.career.brandRequired')),
  name: Yup.string()
    .required(i18n.t<string>('validate.career.nameCareerRequired'))
    .max(50, i18n.t<string>('validate.common.maxLengthDescription')),
  field: Yup.string()
    .required(i18n.t<string>('validate.career.fieldCareerRequired'))
    .max(50, i18n.t<string>('validate.common.maxLengthDescription')),
  description: Yup.string().max(50, i18n.t<string>('validate.common.maxLengthDescription')),
});

export const careerApplySchema = Yup.object().shape({
  fullName: Yup.string()
    .required(i18n.t<string>('validate.information.nameRequired'))
    .matches(wordReg, i18n.t<string>('validate.information.nameInvalid')),
  phoneNumber: Yup.string()
    .required(i18n.t<string>('validate.information.phoneRequired'))
    .min(10, i18n.t<string>('validate.information.minPhone'))
    .max(11, i18n.t<string>('validate.information.maxPhone'))
    .matches(numberReg, i18n.t<string>('validate.information.phoneValid')),
  experience: Yup.string().required(i18n.t<string>('validate.information.experienceRequired')),
  dateOfBirth: Yup.mixed()
    .nullable(i18n.t<string>('validate.information.dateOfBirthRequired'))

    .required(i18n.t<string>('validate.information.dateOfBirthRequired'))
    .test({
      message: i18n.t<string>('validate.information.dateOfBirthInvalid'),
      test: (value: any) => {
        const today = new Date();
        const ngaySinh = new Date(value);
        const ageDifference = differenceInYears(today, ngaySinh);
        const eighteenYearsAgo = addYears(today, -18);
        const isEighteenOrOlder = isBefore(ngaySinh, eighteenYearsAgo);
        if (isEighteenOrOlder) {
          return true;
        }
        return false;
      },
    }),
  province_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.career.provinceRequired'))
    .required(i18n.t<string>('validate.career.provinceRequired'))
    .test({
      message: i18n.t<string>('validate.career.provinceRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  district_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.career.districtRequired'))
    .required(i18n.t<string>('validate.career.districtRequired'))
    .test({
      message: i18n.t<string>('validate.career.districtRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
  career_id: Yup.mixed()
    .nullable(i18n.t<string>('validate.careerApply.careerRequired'))
    .required(i18n.t<string>('validate.careerApply.careerRequired'))
    .test({
      message: i18n.t<string>('validate.careerApply.careerRequired'),
      test: (value: any) => {
        if (typeof value === 'string') {
          return false;
        }
        return true;
      },
    }),
});

// ----------------------------

const EmployeeIncomeTaxInformationSchema = Yup.object().shape({
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCode'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeInvalid')),
  typeOfTaxDocument: Yup.string().required(i18n.t<string>('validate.employee.typeOfDocumentTax')),
});

const EmployeeSignUpSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t<string>('validate.employee.name')),
  email: Yup.string()
    .required(i18n.t<string>('validate.employee.email'))
    .email(i18n.t<string>('validate.employee.invalidEmail')),
  userName: Yup.string().required(i18n.t<string>('validate.employee.username')),
  password: Yup.string()
    .required(i18n.t<string>('validate.employee.password'))
    .matches(passwordReg, i18n.t<string>('validate.employee.passwordInvalid')),
  confirmPassword: Yup.string()
    .required(i18n.t<string>('validate.employee.verifyPassword'))
    .oneOf([Yup.ref('password')], i18n.t<string>('validate.employee.verifyPasswordInvalid')),
});

const DependentPersonFormSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t<string>('validate.employee.nameRelationshipRequired')),
  identityCard: Yup.string()
    .required(i18n.t<string>('validate.employee.idCardRelationShipMemberRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.idCardRelationShipInvalid')),
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCodeRelationshipRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeRelationshipInvalid')),

  relationship: Yup.string().required(
    i18n.t<string>('validate.employee.relationshipWithEmployeeRequired')
  ),
  typeOfDocument: Yup.string().required(
    i18n.t<string>('validate.employee.documentRelationshipRequired')
  ),
  startDate: Yup.string().required(
    i18n.t<string>('validate.employee.startDateRelationshipRequired')
  ),
  // .max(
  //   Yup.ref('endDateRelationship'),
  //   i18n.t<string>('validate.employee.startDateRelationshipInvalid')
  // )
});

const OrderFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(i18n.t<string>('validate.order.nameRequired'))
    .max(50, i18n.t<string>('validate.order.maxName')),
  email: Yup.string()
    .required(i18n.t<string>('validate.order.emailRequired'))
    .email(i18n.t<string>('validate.order.invalidEmail')),
  phoneNumber: Yup.string()
    .required(i18n.t<string>('validate.order.phoneRequired'))
    .min(10, i18n.t<string>('validate.order.minPhone'))
    .max(11, i18n.t<string>('validate.order.maxPhone'))
    .matches(numberReg, i18n.t<string>('validate.order.invalidPhone')),
  address: Yup.string().required(i18n.t<string>('validate.order.addressRequired')),
  product_id: Yup.string().required(i18n.t<string>('validate.order.productRequired')),
  qty: Yup.number()
    .required(i18n.t<string>('validate.order.quantityRequired'))
    .positive(i18n.t<string>('validate.order.quantityPositive'))
    .integer(i18n.t<string>('validate.order.quantityInvalid'))
    .typeError(i18n.t<string>('validate.order.quantityNumber'))
    .max(100, i18n.t<string>('validate.order.quantityMax')),
  note: Yup.string().required(i18n.t<string>('validate.order.noteRequired')),
});

const EventFormSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t<string>('validate.event.nameRequired'))
    .max(50, i18n.t<string>('validate.event.maxName')),
  description: Yup.string().required(i18n.t<string>('validate.event.descriptionRequired')),
  content: Yup.string().required(i18n.t<string>('validate.event.contentRequired')),
  // thumbnail: Yup.string().required(i18n.t<string>('validate.event.thumbnailRequired')),
  type: Yup.string().required(i18n.t<string>('validate.event.eventTypeRequired')),
});

const HomePageSchema = Yup.object().shape({
  banner: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(100, i18n.t<string>('validate.homePage.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
  whyChooseUs: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(25, i18n.t<string>('validate.whyChooseUs.titleMax')),
    subtitle: Yup.string()
      .required(i18n.t<string>('validate.homePage.subtitle'))
      .max(400, i18n.t<string>('validate.homePage.subtitleMax')),
    image: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
    content: Yup.array().of(
      Yup.object().shape({
        title: Yup.string()
          .required(i18n.t<string>('validate.homePage.title'))
          .max(50, i18n.t<string>('validate.homePage.contentTitleMax')),
        content: Yup.string()
          .required(i18n.t<string>('validate.homePage.content'))
          .max(100, i18n.t<string>('validate.homePage.contentContentMax')),
      })
    ),
  }),
  jobOffer: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),

    image: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
    content: Yup.array().of(
      Yup.object().shape({
        title: Yup.string()
          .required(i18n.t<string>('validate.homePage.title'))
          .max(50, i18n.t<string>('validate.homePage.contentTitleMax')),
        content: Yup.string()
          .required(i18n.t<string>('validate.homePage.content'))
          .max(100, i18n.t<string>('validate.homePage.contentContentMax')),
      })
    ),
    outstandingJobId: Yup.object().required(i18n.t<string>('validate.homePage.outstandingJobId')),
    // .shape({
    //   value: Yup.string().required(i18n.t<string>('validate.homePage.outstandingJobId')),
    // })
  }),
});

const AboutPageSchema = Yup.object().shape({
  banner: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(100, i18n.t<string>('validate.homePage.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
  aboutUs: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(1500, i18n.t<string>('validate.about.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
  ourTeam: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.about.ourTeamTitleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.subtitle'))
      .max(500, i18n.t<string>('validate.about.ourTeamContentMax')),
  }),
});

const CarrerPageSchema = Yup.object().shape({
  banner: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(100, i18n.t<string>('validate.homePage.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
});

const ServicePageSchema = Yup.object().shape({
  banner: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(100, i18n.t<string>('validate.homePage.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
});

const ContactPageSchema = Yup.object().shape({
  banner: Yup.object({
    title: Yup.string()
      .required(i18n.t<string>('validate.homePage.title'))
      .max(100, i18n.t<string>('validate.homePage.titleMax')),
    content: Yup.string()
      .required(i18n.t<string>('validate.homePage.content'))
      .max(100, i18n.t<string>('validate.homePage.contentMax')),
    backgroundUrl: Yup.mixed()
      .test('required', i18n.t<string>('validate.homePage.thumbnailRequired'), (file) => {
        if (file) return true;
        return false;
      })
      .nullable(i18n.t<string>('validate.homePage.thumbnailRequired')),
  }),
  feedback: Yup.string()
    .required(i18n.t<string>('validate.feedback'))
    .max(1000, i18n.t<string>('validate.contact.feedbackMax')),
});

const FooterPageSchema = Yup.object().shape({
  address: Yup.string()
    .required(i18n.t<string>('validate.address'))
    .max(1000, i18n.t<string>('validate.homePage.addressMax')),
  linkZalo: Yup.string().required(i18n.t<string>('validate.zalo')),
  linkFacebook: Yup.string().required(i18n.t<string>('validate.facebook')),
  linkTiktok: Yup.string().required(i18n.t<string>('validate.tiktok')),
});
export {
  // SalaryBasicFormSchema,
  EmployeeIncomeTaxInformationSchema,
  EmployeeSignUpSchema,
  DependentPersonFormSchema,
  OrderFormSchema,
  EventFormSchema,
  // ------------------------
  contactFormSchema,
  serviceSchema,
  newsSchema,
  HomePageSchema,
  AboutPageSchema,
  CarrerPageSchema,
  ContactPageSchema,
  FooterPageSchema,
  brandSchema,
  ServicePageSchema,
};
