import { addLocaleData } from "react-intl";
import enDate from "react-intl/locale-data/en";

addLocaleData([...enDate]);

export default {
  "app.language": "English",
  "app.pageTitle.Home": "Home",
  "app.pageTitle.Intl": "International",
  "app.consume.notifications":
    "Results from Notifications: {notificationsStatus}",
  "app.consume.authentication":
    "Result from authentication: {authenticationStatus}"
};
