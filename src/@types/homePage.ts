type IHomePage = {
  id: number;
  banner: IBannerHomePage;
  whyChooseUs: ICommon;
  jobOffer: IJobOfferHomePage;
  news: {
    title: string;
    content: string;
  };
  partner: (string | File)[];
};

type IBannerHomePage = {
  title: string;
  content: string;
  backgroundUrl: string | File;
};

type IJobOfferHomePage = ICommon & {
  outstandingJobId: {
    label: string;
    value: number;
  };
};

type ICommon = {
  title: string;
  subtitle: string;
  content: { title: string; content: string }[];
  image: string | File;
};
