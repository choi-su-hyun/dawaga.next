export const getPageName = (pathName: string) => {
  let pageName;
  switch (pathName) {
    case "/sign-in":
      pageName = "로그인";
      break;
    case "/sign-up":
      pageName = "회원가입";
      break;

    default:
      pageName = "";
      break;
  }
  return pageName;
};
