import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export interface DataPoint {
    x: number;
    y: number;
}

interface LineChartProps {
    data?: DataPoint[];
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const LineChart: React.FC<LineChartProps> = ({
                                                 data = [
                                                     {x: 0, y: 10},
                                                     {x: 1, y: 25},
                                                     {x: 2, y: 15},
                                                     {x: 3, y: 30},
                                                     {x: 4, y: 20},
                                                     {x: 5, y: 35},
                                                     {x: 6, y: 25},
                                                     {x: 7, y: 40},
                                                     {x: 8, y: 30},
                                                     {x: 9, y: 45}
                                                 ],
                                                 width = 800,
                                                 height = 400,
                                                 margin = {top: 20, right: 30, bottom: 40, left: 50}
                                             }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y) as [number, number])
            .nice()
            .range([innerHeight, 0]);

        const line = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);


        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add gridlines
        g.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickFormat(() => "")
            )
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.3);

        g.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickFormat(() => "")
            )
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.3);

        // Add X axis
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .style("font-family", "Arial, sans-serif")
            .style("font-size", "12px");

        // Add Y axis
        g.append("g")
            .call(d3.axisLeft(yScale))
            .style("font-family", "Arial, sans-serif")
            .style("font-size", "12px");

        // Add the line
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add dots
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 4)
            .attr("fill", "#3b82f6")
            .style("cursor", "pointer");

        // Create tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "d3-tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("z-index", 1000);

        // Add hover interactions
        g.selectAll(".dot")
            .on("mouseover", function (event, d: any) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("r", 6)
                    .attr("fill", "#1d4ed8");

                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                tooltip.html(`X: ${d.x}<br/>Y: ${d.y}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("r", 4)
                    .attr("fill", "#3b82f6");

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Cleanup function
        return () => {
            d3.select("body").selectAll(".d3-tooltip").remove();
        };
    }, [data, width, height, margin]);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">D3 Line Chart</h2>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="border border-gray-200 rounded-lg shadow-sm"
            />
        </div>
    );
};

export default LineChart;