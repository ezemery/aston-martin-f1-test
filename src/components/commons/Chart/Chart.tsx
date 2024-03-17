import { useEffect } from "react";
import * as d3 from "d3";
import { ChartData, Timing } from "../../../types/charttypes";

export const Chart = ({ data }: { data: ChartData }) => {
  useEffect(() => {
    barChartJS();
  }, []);

  const parseTime = (time: string): number => {
    return (
      parseInt(time.slice(0, time.indexOf(":"))) * 60 +
      parseInt(time.slice(time.indexOf(":") + 1, time.indexOf("."))) +
      parseInt(time.slice(time.indexOf(".") + 1)) * 1e-3
    );
  };

  const timeToString = (time: number): string => {
    const timeString = time + "";
    let numMili = "000";
    if (timeString.includes(".")) {
      numMili = timeString.slice(timeString.indexOf(".") + 1);
      for (let i = numMili.length; i < 3; i++) {
        numMili += "0";
      }
    }

    const numSeconds = Math.trunc(time % 60);
    let numMinutes = Math.trunc(time / 60);
    if (numMinutes > 60) {
      const numHours = Math.trunc(numMinutes / 60);
      numMinutes = numMinutes - numHours * 60;
      return numHours + ":" + numMinutes + ":" + numSeconds + "." + numMili;
    }
    if (numMinutes > 0) {
      return numMinutes + ":" + numSeconds + "." + numMili;
    } else {
      return numSeconds + "." + numMili;
    }
  };

  const calcTimeToLeader = (leaderTime: number, time: number): number => {
    return Math.round((time - leaderTime + Number.EPSILON) * 1000) / 1000;
  };

  const barChartJS = () => {
    // Define width and height of the SVG container
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500;
    const height = 300;

    /**
     * TODO: Fix weird errors that causes some races overtake the lap leader on the chart.
     * This happens because the calculation below returns a negative timeToLeader due to the 
     * lap time of the racer being less than the lap time of the leader
     */
    const formattedData: Timing[][] = data.map((d) => {
      const leaderTime = d["Timings"][0].time;
      return d.Timings.map((t) => {
        t.y = 1;
        t.time = parseTime(String(t.time));
        t.position = Number(t.position);
        t.timeToLeader = calcTimeToLeader(
          parseTime(String(leaderTime)),
          t.time
        );
        return t;
      });
    });

    const slider = d3
      .select("#slider")
      .append("input")
      .attr("type", "range")
      .attr("min", 1)
      .attr("max", 50)
      .attr("value", 1)
      .style("width", width + "px")
      .style("position", "absolute")
      .style("left", "50%")
      .style("bottom", "10px")
      .style("transform", "translateX(-50%)")
      .on("input", function (this: HTMLInputElement) {
        update(formattedData, Number(this.value) + 1);
      });

    // Define scales for x-axis and y-axis
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData[0].map((d) => d.position)) as number])
      .range([0, width]);

    const yScale = d3.scaleLinear().range([height, 0]);

    const driverColor = d3
      .scaleOrdinal<string>()
      .domain(formattedData[0].map((d) => d.driverId))
      .range(d3.schemeCategory10);

    // Create SVG container
    const svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .style("position", "relative")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const lapLabel = svg
      .append("text")
      .attr("y", height - 10)
      .attr("x", width - 90)
      .attr("font-size", "40px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("Lap");

    const timeLabel = svg
      .append("text")
      .attr("y", height - 10)
      .attr("x", width - 40)
      .attr("font-size", "40px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text("1");

    // Append x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .text("Position");

    // Append y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 12) 
      .style("text-anchor", "middle")
      .attr("fill", "white") 
      .text("Time to Leader");

    // Define x-axis
    const xAxis = d3.axisBottom(xScale);

    // Define y-axis
    const yAxis = d3.axisLeft(yScale);

    // Append x-axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("color", "white")
      .call(xAxis);
    // Append y-axis
    svg.append("g").style("color", "white").call(yAxis);

    function update(data: Timing[][], index: number) {
      const t = d3.transition().duration(100);
      yScale.domain([
        0,
        d3.max(formattedData[0].map((d) => d.timeToLeader)) as number,
      ]);

      // JOIN new data with old elements.
      const texts = svg
        .selectAll<SVGTextElement, Timing>(".datapoint")
        .data(data[index], (d) => d.driverId);

      // Update existing text data points
      texts
        .text((d) => d.driverId)
        .attr("x", (d) => xScale(d.position) as number)
        .attr("y", (d) => yScale(d.timeToLeader) as number);

      // Append text elements for each data point
      texts
        .enter()
        .append("text")
        .attr("class", "datapoint")
        .attr("x", (d) => xScale(d.position) as number)
        .attr("y", (d) => yScale(d.timeToLeader) as number)
        .attr("text-anchor", "middle")
        .text((d) => d.driverId)
        .style("font-size", "10px")
        .attr("fill", (d) => driverColor(d.driverId));

      // EXIT old elements not present in new data.
      texts.exit().remove();

      // update the time label
      timeLabel.text(String(index + 1));
    }

    update(formattedData, 0);
  };

  return (
    <>
      <div id="chart-area">
        <div id="slider"></div>
      </div>
      
    </>
  );
};
