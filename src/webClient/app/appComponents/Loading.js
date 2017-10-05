import React from "react";
import { Loading, Text } from "../../components";

// import Lottie from "./Lottie";
// import * as animationData from "../loading.json";

export default props =>
  <Loading {...props}>
    <Text>Loading</Text>
    {/* <Lottie animationData={animationData} /> */}
  </Loading>;
