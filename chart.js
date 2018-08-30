var chart;

function loadChart () {
    chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "User Pick"              
		},
		axisX:{
			labelAngle: 270,
		  },
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: images,
		}
		]
	});
	chart.render();
}
// loadChart();

function loadTotalChart () {
	chart = new CanvasJS.Chart("chartContainerTotals", {
	title:{
		text: "All Time Total"              
	},
	axisX:{
		labelAngle: 270,
		},
	data: [              
	{
		// Change type to "doughnut", "line", "splineArea", etc.
		type: "column",
		dataPoints: buildTotalChart(),
	}
	]
});
chart.render();
}
// loadChart();