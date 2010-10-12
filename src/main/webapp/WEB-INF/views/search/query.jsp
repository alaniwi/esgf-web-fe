<style>
label {
	font-weight: bold;
	float: left;
	text-align: right;
	width: 88px;
	margin-right: 6px;
}

#optionContainer {
	float: left;
}

#optionPane {
	clear: both;
	margin-bottom: 4px;
	padding: 4px 0;
	/* border: 1px dotted #9fca6a; */ 
}

#dataScope, #withMap {
    padding: 4px 0;
    margin-bottom: 4px;
}
    
form {
    font-size: 1.1em;
}


</style>


<script>

$(function() {
	$('div#showOptions').click(function() {
		$('div#optionPane').toggle(
				'fast',  function() {
		    if ($(this).is(':hidden'))
                     $('div#showOptions').html('<a href="#">More Options</a>')
                 else						
			$('div#showOptions').html('<a href="#">Remove Options</a>')
					
					
		})
	})
	
})

</script>

<h2>Experimental GeoSpatial Search:</h2>

<form method="post" id="search-form" class="form">
<table>
	<tr align="center">
		<td><input id="searchbox" name="queryString" type="text"
			size="50" value="Search projects, datasets, and more" /></td>
		<td> <div id="showOptions"><a href="#">More Options</a></div>
		</td>
	</tr>
</table>

    <div id="optionPane" style="display:none">

		<div id="dataScope"><label for="dataScope"> Scope: </label>
		<div><input type="radio" name="effect" value="model" /> Model <input
			type="radio" name="effect" value="obs" /> Observational <input
			type="radio" name="effect" value="all" /> All</div>
		</div>
		
		<div id="withMap"><label for="dataScope">Show Map: </label>
		<div><input type="radio" name="effect" value="model" /> 2D 
		    <input type="radio" name="effect" value="obs" /> 3D 
		</div></div>

    </div> <!--  end of optionPane -->

    <div id="submitBtn">
        <input type="submit" value="Search" />
    </div>

</form>
