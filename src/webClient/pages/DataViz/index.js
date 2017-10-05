import React from "react";
import Helmet from "react-helmet";
import {
  Heading,
  Flex,
  PageName,
  TopPage,
  Text,
  Button
} from "../../components";
import { Bar } from "nivo";

import data1 from "./data1.json";
import data2 from "./data2.json";

const data = {
  data1,
  data2
};

export default class DataViz extends React.Component {
  state = { data: "data1" };

  render() {
    return (
      <Flex column align="center" justify="center" py={3}>
        <TopPage color="green" title="Data Viz" />
        <Button
          onClick={() => {
            const newData = this.state.data === "data1" ? "data2" : "data1";
            this.setState({ data: newData });
          }}
        >
          Swap Data
        </Button>
        <Bar
          data={data[this.state.data]}
          keys={["hot dogs", "burgers", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{
            top: 50,
            right: 60,
            bottom: 50,
            left: 60
          }}
          xPadding={0.2}
          groupMode="stacked"
          layout="vertical"
          colors="nivo"
          colorBy="id"
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "center",
            legendOffset: 36
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "center",
            legendOffset: -40
          }}
          enableGridX={false}
          enableGridY={true}
          enableLabels={false}
          labelsTextColor="inherit:darker(1.6)"
          labelsLinkColor="inherit"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
          width={500}
          height={500}
        />
      </Flex>
    );
  }
}
