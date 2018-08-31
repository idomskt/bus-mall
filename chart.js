var chart;

function loadChart () {
    chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "User Pick"              
		},
		axisX:{
			labelAngle: 0,
		  },
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "bar",
			dataPoints: images
		}
		]
	});
	chart.render();
}

function loadTotalChart () {
	chart = new CanvasJS.Chart("totalChartContainer", {
	title:{
		text: "All Time Total"              
	},
	axisX:{
		// labelAngle: 270,
		},
	data: [              
	{
		// Change type to "doughnut", "line", "splineArea", etc.
		type: "bar",
		dataPoints: buildTotalChart()
	}
	]
});
chart.render();
}