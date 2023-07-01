import React from "react";
import { ResponsiveLine } from "@nivo/line";

function AmortizationChart({ amortizationSchedule }) {
  const data = [
    {
      id: "Interest",
      data: amortizationSchedule.map((entry) => ({
        x: entry.month,
        y: entry.interest,
      })),
    },
    {
      id: "Principal",
      data: amortizationSchedule.map((entry) => ({
        x: entry.month,
        y: entry.principal,
      })),
    },
    {
      id: "Mortgage",
      data: amortizationSchedule.map((entry) => ({
        x: entry.month,
        y: entry.payment,
      })),
    },
  ];

  return (
    <>
      <div style={{ height: "400px" }}>
        <ResponsiveLine
          data={data}
          animate
          enableSlices="x"
          margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
          xScale={{ type: "linear" }}
          yScale={{ type: "linear", stacked: false, min: 0, max: 2500 }}
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          colors={{ scheme: "set2" }}
          lineWidth={1}
          enablePoints={false}
          pointSize={2}
          pointColor={{ theme: "grid.line.stroke" }}
          pointBorderWidth={1}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-right",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 4,
              symbolSize: 20,
              symbolShape: "circle",
              itemDirection: "left-to-right",
              itemTextColor: "#777",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <p className="p-3 mx-2 border rounded">
        The amortization chart shows how the repayment of the loan and interest
        is correlated with mortgage over time. In general, it shows higher
        portion of the mortgage payement goes toward paying the interest payment
        than the principal payment. For more details, hover on the graph.
      </p>
    </>
  );
}

export default AmortizationChart;
