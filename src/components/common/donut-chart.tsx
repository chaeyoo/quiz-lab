import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DonutChartProps {
	data: { label: string; value: number }[];
	width: number;
	height: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, width, height }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		const radius = Math.min(width, height) / 2;
		const innerRadius = radius / 1.5; 
		const color = d3.scaleOrdinal<string>(["#5EF5BD", "#FF7873"]);
		const pie = d3
			.pie<{ label: string; value: number }>()
			.value((d) => d.value);

		const arc = d3
			.arc<d3.PieArcDatum<{ label: string; value: number }>>()
			.innerRadius(innerRadius)
			.outerRadius(radius);

		const arcs = pie(data);

		svg.attr("width", width).attr("height", height);

		const g = svg
			.append("g")
			.attr("transform", `translate(${width / 2}, ${height / 2})`);

		g.selectAll("path")
			.data(arcs)
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d) => color(d.data.label))
			.attr("stroke", "none");

		const firstDataValue = data[0]?.value || 0;
		const totalValue = data.reduce((sum, d) => sum + d.value, 0);
		const percentage = ((firstDataValue / totalValue) * 100).toFixed(0);

		g.append("text")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "central")
			.attr("font-size", "18px") 
			.attr("fill", "#F6F7FB")
			.attr("font-weight", "bold")
			.text(`${percentage}%`);
	}, [data, width, height]);

	return <svg ref={svgRef} />;
};

export default DonutChart;
