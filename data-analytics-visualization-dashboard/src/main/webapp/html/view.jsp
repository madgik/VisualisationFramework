<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.liferay.portal.util.PortalUtil"%>
<%@ page import="javax.portlet.PortletPreferences" %>
<%@ page import="com.liferay.portal.kernel.util.ParamUtil" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<portlet:defineObjects />
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <script
                src="https://code.jquery.com/jquery-3.4.1.min.js"
                integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                crossorigin="anonymous"></script>
        <script crossorigin src="https://unpkg.com/react@16.5.1/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16.5.1/umd/react-dom.production.min.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/jsmind@0.4.6/js/jsmind.min.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/jsmind@0.4.6/js/jsmind.screenshot.min.js"></script>
        <script crossorigin src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js" type="text/javascript"></script>

        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.14/semantic.min.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsmind@0.4.6/style/jsmind.min.css"></link>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
            integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
            crossorigin="" />
        <link rel="stylesheet" type="text/css" href="<c:url value="/css/overrides.css?1.0.1" />" />
    </head>
    <%
        PortletPreferences preferences = renderRequest.getPreferences();

        String portletResource = ParamUtil.getString(request, "portletResource");
        String facetFields = preferences.getValue("facet_fields", "assetType,thesaurus");
        String  searchFields = preferences.getValue("search_fields", "assetTitle,assetDescription"); %>
    <body>
    	<p id="portletInfo" data-namespace="<portlet:namespace/>" data-loginurl="<portlet:resourceURL />" hidden></p>

        <div id="<portlet:namespace/>root"></div>
        <script type="text/javascript">
        	window.staticFileBaseUrl = '<%=request.getContextPath()%>/static/';
        </script>
        <script src="<%=request.getContextPath()%>/static/bundle.min.js?1.0.1"></script>
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
            var workspaceEndpoint = '<%= renderRequest.getAttribute("workspaceEndpoint") %>';
            var username = '<%= renderRequest.getAttribute("username") %>';
            var token = '<%= renderRequest.getAttribute("token") %>';

			//var username = <%=facetFields%>
            console.log("Resource URL:: " + resourceURL);
            ReactDOM.render(React.createElement(window.reactComponents['data-analytics-visualization-dashboard'].reactComponent, {
			    routing: {
			        baseUrl: resourceURL,
                    workspaceUrl: workspaceEndpoint,
                    workspaceUsername: username,
                    workspaceToken: token
			    }
			}), document.getElementById('<portlet:namespace/>root'));
		});
	})();
</script>
