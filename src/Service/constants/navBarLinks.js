export const navBarLinks = (t) => {
  return [
    {
      title: t("navLinks.home"),
      route: "/",
    },
    {
      title: t("navLinks.about"),
      route: "/about",
    },
    {
      title: t("navLinks.contactUs"),
      route: "/contact",
    },
    {
      title: t("navLinks.basket"),
      route: "/basket",
    },
  ];
};
