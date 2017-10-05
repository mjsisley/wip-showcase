import { addLocaleData } from "react-intl";
import esDate from "react-intl/locale-data/es";
import en from "./en";
addLocaleData([...esDate]);

const es = {
  "app.language": "Spanish",
  "app.pageTitle.Home": "Casa",
  "app.pageTitle.Intl": "Internacional",
  "app.consume.notifications": "Spanish Results from Notifications: ",
  "app.consume.authentication":
    "Spanish Results from authentication: {authenticationStatus}"
};

export default { ...en, ...es };
