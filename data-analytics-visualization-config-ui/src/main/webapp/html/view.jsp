<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.liferay.portal.util.PortalUtil"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>

<portlet:defineObjects />
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/overrides.css?1.0.7" />" />

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossorigin="anonymous"></script>
        <script crossorigin src="https://unpkg.com/react@16.5.1/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16.5.1/umd/react-dom.production.min.js"></script>
    </head>
    <body>
    	<p id="portletInfo" data-namespace="<portlet:namespace/>" data-loginurl="<portlet:resourceURL />" hidden></p>

        <div id="<portlet:namespace/>root"></div>
        <script type="text/javascript">
            window.staticFileBaseUrl = '<%=request.getContextPath()%>/static/';
        </script>
        <script src="<%=request.getContextPath()%>/static/bundle.min.js?1.0.7"></script>
    </body>
</html>

<script type="text/javascript">
	(function() {
		$(document).ready(function () {
			var renderURL = '<portlet:renderURL><portlet:param name="jspPage" value="{url}.jsp" /><portlet:param name="getParams" value="{params}" /></portlet:renderURL>';
			var resourceURL = '<portlet:resourceURL id="{url}?{parameters}" />';
			var resourceURLNoParams = '<portlet:resourceURL id="{url}" />';
			var contextPath = '<%=request.getContextPath()%>/';
			var nameSpace = $('#portletInfo').data('namespace');

            ReactDOM.render(React.createElement(window.reactComponents['data-analytics-visualization-config-ui'].reactComponent,{
                routing: {
                    baseUrl: resourceURL
                }
            }), document.getElementById('<portlet:namespace/>root'));
		});
	})();
</script>

