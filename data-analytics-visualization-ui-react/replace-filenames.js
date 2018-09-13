const fs = require('fs');
const replace = require('replace');

const directoryContent = fs.readdirSync('./dist');

// let cssFile;
let jsFile;

directoryContent.forEach(item => {
	// if (item.match(/\.css$/)) {
	// 	cssFile = item;
	// }
	if (item.match(/\.js$/)) {
		jsFile = item;
	}
});

if (!jsFile) {
	console.log('\n\nError: Could not find the JS or CSS file\n\n');
	process.exit(1);
}

// replace({ 
// 	regex: '<link title="react-css" rel="stylesheet" href="<%=request.getContextPath()%>\/css\/bundle.*?\.css.*?"\/>',
// 	replacement: `<link title="react-css" rel="stylesheet" href=<%=request.getContextPath()%>/css/${cssFile}.css"/>`,
// 	paths: ['../aginfra-analytics-visualization-portlet/src/main/webapp/html/view.jsp']
// });

replace({
    
	regex: '<script id="react-script" type="type\/javascript" src="<%=request.getContextPath()%>\/static\/bundle.*?\.js.*?"><\/script>',
	replacement: `<script id="react-script" type="type\/javascript" src="<%=request.getContextPath()%>/static/${jsFile}"></script>`,
	paths: ['../data-analytics-visualization-ui/src/main/webapp/html/view.jsp']
});