type IAboutPage = {
  id: number;
  banner: IBannerHomePage;
  aboutUs: IBannerHomePage;
  ourTeam: IOurTeamPage;
};

type IOurTeamPage = {
  title: string;
  content: string;
  listImageUrl: (string | File)[];
};
