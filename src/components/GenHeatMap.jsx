import React from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { Tooltip } from "@mui/material";

function max(data, value) {
  return Math.max(...data.map(value));
}

function min(data, value) {
  return Math.min(...data.map(value));
}

function HeatMap({
  binData,
  tooltips,
  width,
  height,
  text,
  textHeight,
  highColor,
  lowColor,
  events = false,
  separation = 20,
}) {
  const bins = (d) => d.bins;
  const count = (d) => d.count;

  const colorMax = max(binData, (d) => max(bins(d), count));
  const bucketSizeMax = max(binData, (d) => bins(d).length);

  // scales
  const xScale = scaleLinear({
    domain: [0, binData.length],
  });
  const yScale = scaleLinear({
    domain: [0, bucketSizeMax],
  });

  const rectColorScale = scaleLinear({
    range: [lowColor, highColor],
    domain: [0, colorMax],
  });
  const opacityScale = scaleLinear({
    range: [0.1, 1],
    domain: [0, colorMax],
  });
  const margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10,
  };

  const xMax = width * 0.99;
  const yMax = height - margin.bottom - margin.top;
  const binWidth = width / binData.length;
  const binHeight = height - textHeight;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <text x="1%" y={textHeight}>
        {text}
      </text>
      <Group top={textHeight * 0.6} left={width * 0.01}>
        <HeatmapRect
          data={binData}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binHeight}
          gap={1}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <Tooltip title={tooltips[bin.column]} arrow placement="top">
                  <rect
                    key={`heatmap-rect-${bin.row}-${bin.column}`}
                    className="visx-heatmap-rect"
                    width={bin.width}
                    height={bin.height}
                    x={bin.x}
                    y={textHeight}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                  />
                </Tooltip>
              ))
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
}

export default HeatMap;
