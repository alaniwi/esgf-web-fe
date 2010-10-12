<!-- Search results -->
<%@ include file="/WEB-INF/views/common/include.jsp" %>
<style>

#search-results {
    font-size: 1.2em;
    margin-top: 12px;
}

#search-result table {
    padding: 0.2em;
    vertical-align: top;
}
    
</style>


<div id="search-results">

<c:if test="${param['search_model'] != null}">
		
<!-- Table of search results -->
<table class="datatable">
	<c:set var="j" value="0" />
	<c:forEach var="record" items="${search_output.results}">
		<c:set var="j" value="${j+1}"/>
		<tr>
			<td><c:out value="${j}"/>.</td>
			<td>
				<a href="${record.fields['url'][0]}"><c:out value="${record.fields['title'][0]}"/></a>
				<c:if test="${record.fields['description'][0]}"><br/>
				<c:out value="${record.fields['description'][0]}"/>
				</c:if>
				<br/>
				
				<c:forEach var="field" items="${record.fields}">
					<c:if test="${field.key != 'title'  && field.key != 'url' && 
					       field.key != 'type' && field.key != 'score'}">
						<c:out value="${field.key}"/>=<c:out value="${field.value}"/>
					</c:if>
				</c:forEach>
			</td>
		</tr>
	</c:forEach>
</table>

</c:if>

</div>	