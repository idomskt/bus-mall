var chart;

function loadChart () {
    chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "My First Chart in CanvasJS"              
		},
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: images
		}
		]
	});
	chart.render();
}
// loadChart();