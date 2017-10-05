// import React from "react";
// import { ServiceBox } from "./pageComponents";
// import { Heading, Box, Text, Button, Flex, Border } from "../../components";
// import auth from "../../auth/Auth.js";

// const onAuth = ({ history }) => {
//   auth.isAuthenticated()
//     ? auth.logout(() => {
//         history.push("/consume_services");
//       })
//     : auth.login();
// };

// export default ({ history }) => {
//   const authenticationStatus = auth.isAuthenticated();

//   return (
//     <ServiceBox>
//       <Button onClick={() => onAuth({ history })}>
//         {authenticationStatus ? "Auth Logout" : "Auth Login"}
//       </Button>
//       <Text
//         id="app.consume.authentication"
//         values={{ authenticationStatus: String(authenticationStatus) || null }}
//       />
//     </ServiceBox>
//   );
// };
