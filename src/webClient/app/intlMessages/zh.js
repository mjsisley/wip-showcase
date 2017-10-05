import { addLocaleData } from "react-intl";
import zhDate from "react-intl/locale-data/zh";
import en from "./en";
addLocaleData([...zhDate]);

const zh = {
  "app.language": "Chinese",
  "app.pageTitle.Home": "家",
  "app.pageTitle.Intl": "国际"
};

console.log({ ...en, ...zh });
export default { ...en, ...zh };
