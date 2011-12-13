/*****************************************************************************
 * Copyright � 2011 , UT-Battelle, LLC All rights reserved
 *
 * OPEN SOURCE LICENSE
 *
 * Subject to the conditions of this License, UT-Battelle, LLC (the
 * �Licensor�) hereby grants to any person (the �Licensee�) obtaining a copy
 * of this software and associated documentation files (the "Software"), a
 * perpetual, worldwide, non-exclusive, irrevocable copyright license to use,
 * copy, modify, merge, publish, distribute, and/or sublicense copies of the
 * Software.
 *
 * 1. Redistributions of Software must retain the above open source license
 * grant, copyright and license notices, this list of conditions, and the
 * disclaimer listed below.  Changes or modifications to, or derivative works
 * of the Software must be noted with comments and the contributor and
 * organization�s name.  If the Software is protected by a proprietary
 * trademark owned by Licensor or the Department of Energy, then derivative
 * works of the Software may not be distributed using the trademark without
 * the prior written approval of the trademark owner.
 *
 * 2. Neither the names of Licensor nor the Department of Energy may be used
 * to endorse or promote products derived from this Software without their
 * specific prior written permission.
 *
 * 3. The Software, with or without modification, must include the following
 * acknowledgment:
 *
 *    "This product includes software produced by UT-Battelle, LLC under
 *    Contract No. DE-AC05-00OR22725 with the Department of Energy.�
 *
 * 4. Licensee is authorized to commercialize its derivative works of the
 * Software.  All derivative works of the Software must include paragraphs 1,
 * 2, and 3 above, and the DISCLAIMER below.
 *
 *
 * DISCLAIMER
 *
 * UT-Battelle, LLC AND THE GOVERNMENT MAKE NO REPRESENTATIONS AND DISCLAIM
 * ALL WARRANTIES, BOTH EXPRESSED AND IMPLIED.  THERE ARE NO EXPRESS OR
 * IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE,
 * OR THAT THE USE OF THE SOFTWARE WILL NOT INFRINGE ANY PATENT, COPYRIGHT,
 * TRADEMARK, OR OTHER PROPRIETARY RIGHTS, OR THAT THE SOFTWARE WILL
 * ACCOMPLISH THE INTENDED RESULTS OR THAT THE SOFTWARE OR ITS USE WILL NOT
 * RESULT IN INJURY OR DAMAGE.  The user assumes responsibility for all
 * liabilities, penalties, fines, claims, causes of action, and costs and
 * expenses, caused by, resulting from or arising out of, in whole or in part
 * the use, storage or disposal of the SOFTWARE.
 *
 *
 ******************************************************************************/

/**
 * Experimental Solr Front for ESG
 *
 * fwang2@ornl.gov
 * harneyjf@ornl.gov
 */


(function ($) {

AjaxSolr.DataCartWidget = AjaxSolr.AbstractWidget.extend({
	
	searchConstraints: null,
	
	selected_arr: null,
	
	
	init: function() {
		
	},
	
	beforeRequest: function () {
		var self = this;

    	//grab the search constraints
    	self.searchConstraints = ESGF.localStorage.toKeyArr('esgf_fq');
    	
		//kill any live events that are associated with this widget
		$('#myTabs').die('tabsselect');
		$(".wgetAllChildren").die('click');
		$(".globusOnlineAllChildren").die('click');
		$('.remove_dataset_from_datacart').die('click');
		$("input#uber_script").die('click');
		$('.go_individual_gridftp').die('click');
		
        $(this.target).html($('<img/>').attr('src', 'images/ajax-loader.gif'));
	},
	
	afterRequest: function () {
		
		//empty the tab
        $(this.target).empty();

		var self = this;
    
		//getter for the data cart tab
		var selected = $( "#myTabs" ).tabs( "option", "selected" );
		
		
		//grab all the keys from the datacart map and place in an array
    	self.selected_arr = ESGF.localStorage.toKeyArr('dataCart');
    	
    	
    	//empty the carts tab and append/initialize the datacart table 
    	$('#carts').empty();
    	
    	//this string represents the options for the data cart
    	//as of now, the options are:
    	// - radio box that the user chooses to show files
    	// - the "uber" script option
    	var optionsStr = '<div id="radio" style="margin-bottom:30px;display:none">' + 
    				 	 '<table>' +
    				 	 '<tr>' +
    				 	 '<td>' +
    				 	 '<input type="radio" id="datacart_filter_all" name="datacart_filter" value="all" /> ' +
    				 	 'Show all files ' +
    				 	 '</td>' +
    				 	 '<td>' +
    				 	 '<input type="radio" id="datacart_filtered" name="datacart_filter" value="filtered" /> ' +
    				 	 'Filter over search constraints ' +
    				 	 '</td>' +
    				 	 '<td>' +
    				 	 '<input id="uber_script" type="submit" value="Download All Selected" /> ' +
    				 	 '</td>' +
    				 	 '</tr>' +
    				 	 '</table>' +
    				 	 '</div>';
    	
    	$('#carts').append(optionsStr);
    	
    	//toggle the "checked" attribute of the showAllContents radio button
    	if(ESGF.setting.showAllContents == 'true') {
    		$("input[id='datacart_filtered']").attr("checked","false");
    		$("input[id='datacart_filter_all']").attr("checked","true");
    	} else {
    		$("input[id='datacart_filter_all']").attr("checked","false");
    		$("input[id='datacart_filtered']").attr("checked","true");
    	}
    	
    	//if there are no items in the datacart don't show the radio buttons
    	if(self.selected_arr.length > 0) {
    		$('div#radio').show();
    	}
    	
		//create the listings in the data cart
    	$('#carts').append('<table style="width:100%;table-layout: fixed"><tbody id="datasetList"></tbody></table>');
        $("#datasetList").empty();
		
        
        
		//create the data cart template
        self.createTemplate(self.selected_arr);
		
        
        /* events */
        
		/**
	     * Event for tab selection (as of now, toggling between "Results" and "Datacart")
	     */
		$('#myTabs').live('tabsselect', function(event, ui) {
			if (ui.index == 1) {
				
				Manager.doRequest(0);
			}
			
		});
		
		//event in case the radio buttons change
		$("input[name='datacart_filter']").change(	function() { 
			
			
				if($("input[id='datacart_filtered']").attr("checked")) { 
					ESGF.setting.showAllContents = 'false';
				} else {
					ESGF.setting.showAllContents = 'true';
				}

				Manager.doRequest(0);
				
		});
		
		//event for the uber script
		$("input#uber_script").live('click', function() {

			LOG.debug("Uber script: " + JSON.stringify(self.searchConstraints));
			
			var sentConstraints = new Array();

			var queryString = '/esg-search/wget/?';
			
			
			//if the show all contents is the filter...then add the search constraints to the wget
            if(ESGF.setting.showAllContents == 'false') {
            
				// traverse through the constraints and add to the querystring
				//for(var i in self.searchConstraints) {
				for(var i=0;i<self.searchConstraints.length;i++) {
					if(self.searchConstraints[i].search('replica') == -1 && 
					   self.searchConstraints[i].search('type') == -1) {
					   
					   //replace the : with =
					   var constraint = self.searchConstraints[i].replace(':','=');
					   if(i < (self.searchConstraints.length - 1)) {
						   queryString += constraint + '&';
					   } else {
						   queryString += constraint + '&';
					   }
					}
				}
			
            }
            
            //gather the ids and the urls for download
        	var file_ids   = new Array();
            
            
            for(var i=0;i<self.selected_arr.length;i++) {
            	var selectedDocId = self.selected_arr[i];
            	var datasetId = self.replacePeriod(self.selected_arr[i]);
            	
            	$(this).parent().parent().parent().parent().parent().parent().find('tr.rows_'+ datasetId).find(':checkbox:checked').each( function(index) {
            		
            		/*
                    if(this.id != selectedDocId) {
                    	ids.push(this.id);
                    	//values.push(this.value);
                    }
                   */
            		var file_id = this.id;
                	
                	//strip "[" and "]"
                	//FIXME: Need a better way of stripping these two (not sure why they appear)
                	file_id = file_id.substr(2,file_id.length);
                	file_id = file_id.substr(0,file_id.length-2);
                	
                	//push 
                	file_ids.push(file_id);
                });
            	
            }
            for(var i=0;i<file_ids.length;i++) {
				var file_id = file_ids[i];
				if(i < (file_ids.length-1)) {
					queryString += 'file_id=' + file_id + '&'; 
				} else {
					queryString += 'file_id=' + file_id;
				}
			}
            
            
            //send request
            jQuery('<form action="'+ queryString +'" method="post" >'+ '' +'</form>')
            .appendTo('body').submit().remove();
			
			
	            
		});
		
	    
	    /**
	     * Click event for generating the wget script
	     * Submits a form with hidden values that calls the wget proxy class that returns the 
	     * wget script as content type text/x-sh.
	     * The form is deleted upon completion.
	     */
	    $(".wgetAllChildren").live ('click', function (e){
	    	
	    	//grab the dataset id from the template
        	var selectedItem = $.tmplItem(this);
        	var selectedDocId = selectedItem.data.datasetId;
        	
        	//gather the ids and the urls for download
        	var file_ids   = new Array();
            var values = new Array();
            
            var dataset = self.replacePeriod(selectedDocId);
            
            $(this).parent().parent().parent().find('tr.rows_'+ dataset).find(':checkbox:checked').each( function(index) {
                if(this.id != selectedDocId) {
                	var file_id = this.id;
                	
                	//strip "[" and "]"
                	//FIXME: Need a better way of stripping these two (not sure why they appear)
                	file_id = file_id.substr(2,file_id.length);
                	file_id = file_id.substr(0,file_id.length-2);
                	
                	//push 
                	file_ids.push(file_id);
                	
               }
            });
            
            
            var queryString = '/esg-search/wget/?';
			
            
            var constraintCount = 0;
            
            //if the show all contents is the filter...then add the search constraints to the wget
            if(ESGF.setting.showAllContents == 'false') {
            	// traverse through the constraints and add to the querystring
    			//for(var i in self.searchConstraints) {
    			for(var i=0;i<self.searchConstraints.length;i++) {
    				if(self.searchConstraints[i].search('replica') == -1 && 
    				   self.searchConstraints[i].search('type') == -1) {
    				   constraintCount = constraintCount + 1;
    				   //replace the : with =
    				   var constraint = self.searchConstraints[i].replace(':','=');
    				   if(i < (self.searchConstraints.length - 1)) {
    					   queryString += constraint + '&';
    				   } else {
    					   queryString += constraint + '&';
    				   }
    				}
    			}
            }
			
			
			
			
			for(var i=0;i<file_ids.length;i++) {
				var file_id = file_ids[i];
				if(i < (file_ids.length-1)) {
					queryString += 'file_id=' + file_id + '&'; 
				} else {
					queryString += 'file_id=' + file_id;
				}
			}
			
            
            LOG.debug(queryString);
            
            //send request
            jQuery('<form action="'+ queryString +'" method="post">'+ '' +'</form>')
            .appendTo('body').submit().remove();
        	
	    	
	    });
	    
	    
	    /**
	     * Click event for removing datasets from the data cart
	     */
	    $('.remove_dataset_from_datacart').live ('click', function(e) {
	    	
	    	var selectedItem = $.tmplItem(this);
	    	
	    	//get the selected id
        	var selectedDocId = selectedItem.data.datasetId;

        	//remove the dataset from the localStorage
        	ESGF.localStorage.remove('dataCart',selectedDocId);

        	//change from remove from cart to add to cart
        	$('a#ai_select_'+ selectedDocId.replace(/\./g, "_")).html('Add To Cart');
        	
        	//re-issue request to search api
        	Manager.doRequest(0);
        	
	    });
	    
	    
	    
	    
	    /**
	     * Event for checkbox file selection
	     * NOTE: THIS NEEDS TO BE FIXED
	     */
	    $(".topLevel").live('change', function() {
	    	
	        LOG.debug("top level changed");

	        var currentValue = $(this).attr('checked');

	    	//grab the dataset id from the template
	    	var selectedItem = $.tmplItem(this);
	    	var selectedDocId = selectedItem.data.dataset_id;

	        $(this).parent().parent().parent().find('tr.rows_'+ replacePeriod(selectedDocId)).find(':checkbox').each( function(index) {
	                    $(this).attr('checked', currentValue);
	        });
	        
	    });
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    /* globus online events */
	    
	    
	    /**
	     * Grabs individual files and sends that information to the Globus Online view
	     */
	    $('.go_individual_gridftp').live('click',function(e) {
	    	
	    	var selectedDocId = $(this).parent().parent().parent().parent().find('input').attr('id');//.parent().find('tr').attr('id');
	    	
	    	//gather the ids and the urls for download
	    	var ids   = new Array();
	        var values = new Array();
	        
	        var file_id = $(this).parent().find('a').attr('id');
	        var grid_url = $(this).parent().parent().find('div').attr('id');
	        
	        ids.push(file_id);
	        values.push(grid_url);
	        
	        var globus_url = '/esgf-web-fe/goformview1';
	        
	        //begin assembling queryString
	        var queryString = 'type=create&id=' + selectedDocId;


	        //assemble the input fields with the query string
	        for(var i=0;i<ids.length;i++) {
	        	queryString += '&child_url=' + values[i] + '&child_id=' + ids[i];
	        }
	        var input = '';
	        jQuery.each(queryString.split('&'), function(){
	          var pair = this.split('=');
	          input+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
	        });
	        
	        //send request
	        jQuery('<form action="'+ globus_url +'" method="post">'+input+'</form>')
	        .appendTo('body').submit().remove();
	        
	        
	    });
	    
	    
	    
	    /**
	     * Click event for launching globus online bulk data transfer
	     */
	    $(".globusOnlineAllChildren").live('click',function(e){
	    	
	    	//grab the dataset id from the template
	    	var selectedItem = $.tmplItem(this);
        	var selectedDocId = selectedItem.data.datasetId;

	    	//gather the ids and the urls for download
	    	var ids   = new Array();
	        var values = new Array();
	        
	        var rowsStr = 'tr.rows_'+ self.replacePeriod(selectedDocId);

	        
	        var $element = $(this).parent().parent().parent().find(rowsStr);
	        
	        $element.each(function(index) {
	        	var isChecked = $(this).find('input').attr('checked');
        	
	        	if(isChecked) {
	        		var gridElement = 'td#' + self.replacePeriod(selectedDocId) + '_gridftp';
		        	var grid_url = $(this).find(gridElement).find('div').attr('id');
		        	values.push(grid_url);
		        	var file_id = $(this).find(gridElement).find('a').attr('id');
		        	ids.push(file_id);
	        	}
	        	
	        });
	        
	        //get the globus online
	        var globus_url = '/esgf-web-fe/goformview1';
	        
	        //begin assembling queryString
	        var queryString = 'type=create&id=' + selectedDocId;

	        //assemble the input fields with the query string
	        for(var i=0;i<ids.length;i++) {
	        	queryString += '&child_url=' + values[i] + '&child_id=' + ids[i];
	        }
	        var input = '';
	        jQuery.each(queryString.split('&'), function(){
	            var pair = this.split('=');
	            input+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
	        });
	        
            //add the search constraints
	    	input+= '<input type="hidden" name="constraints" value="' + (JSON.stringify(self.searchConstraints)).replace(/\"/gi,'\'') + '" />';
            
	        //send request
	        jQuery('<form action="'+ globus_url +'" method="post">'+input+'</form>')
	        .appendTo('body').submit().remove();
	        
	    });
	    
	},
	
	
	
	/**
     * Create the template for the datacart
     * 
     * There is a new procedure for creating the datacart template because the search API is now called
     * 
     * 
     * 
     * 
     * Legacy:
     * For now there are two ways to create the template...
     * 1) from the shards given from the registry service
     * 2) from the shards given in the solr config file
     * 
     * 1) is preferred and 2) is legacy
     * Each have been modularized
     */
    createTemplate: function() {

    	var self = this;


    	//get the 'q' parameter here
    	var qParam = Manager.store.get('q')['value'];
    	
    	//get the 'fq' parameter here
    	var fqParamArr = self.createFqParamArray();
		
    	
		//setup the query string
    	//we only send three parameters:
    	//* id (self.selected_arr) - an arry of datasets that have been selected for the datacart to display
    	//* showAll (ESGF.setting.showAllContents) - a boolean filter for file display (if true, files are filtered over the search constraints)
    	//* fq (fqParamArr) - an array of search constraints
		//var queryStr = { "id" : arr , "shardType" : ESGF.setting.getShards, "shardsString" : shardsString, "fq" : fqParamArr, "q" : qParam, "showAll" : ESGF.setting.showAllContents};
		var queryStr = {"id" : self.selected_arr, "showAll" : ESGF.setting.showAllContents, "fq" : fqParamArr}
		
		//issue a query to the getDataCart
    	self.getDataCart(queryStr);
    	
	},
	
	
	getDataCartUsingSearchAPI: function(queryStr) {
		var self = this;
		
		//add a spinning wheel to show user that progress is being made in finding the files
		self.addDataCartSpinWheel();
		
		$.ajax({
			url: '/esgf-web-fe/solrfileproxy',
			global: false,
			type: "GET",
			data: queryStr,
			dataType: 'json',
			
			//Upon success remove the spinning wheel and show the contents given by solr
			success: function(data) {
    			self.removeDataCartSpinWheel();
    			self.showFileContents(data); 
			},
			
			//Upon an error remove the spinning wheel and give an alert 
    		error: function() {
    			self.removeDataCartSpinWheel();
    			alert('There is a problem with one of your dataset selections.  Please contact your administrator.');
    			
            	//change from remove from cart to add to cart for all selected datasets
    			for(var i=0;i<query_arr.length;i++) {
                	$('a#ai_select_'+ arr[i].replace(/\./g, "_")).html('Add To Cart');
    			}
			}
		});
	},
	
	
	/**
	 * This function creates the datacart template by loading shards from the service instead of the solrconfig
	 * It is passed in the array of keys of all the datasets that have been selected
	 */
	getDataCart: function(queryStr) {

		var self = this;
		
		
		//add a spinning wheel to show user that progress is being made in finding the files
		self.addDataCartSpinWheel();

		
		$.ajax({
			url: '/esgf-web-fe/solrfileproxy',
			global: false,
			type: "GET",
			data: queryStr,
			dataType: 'json',
			
			//Upon success remove the spinning wheel and show the contents given by solr
			 
			success: function(data) {
				
    			self.removeDataCartSpinWheel();
    			self.showFileContents(data); 
			},
			
			//Upon an error remove the spinning wheel and give an alert 
			 
    		error: function() {
    			self.removeDataCartSpinWheel();
    			alert('There is a problem with one of your dataset selections.  Please contact your administrator.');
    			
            	//change from remove from cart to add to cart for all selected datasets
    			for(var i=0;i<query_arr.length;i++) {
                	$('a#ai_select_'+ arr[i].replace(/\./g, "_")).html('Add To Cart');
    			}
			}
		});
		
	},
	
	
	/*
	 * Assembles the search constraint array
	 * 
	 * Extracts the current search constraints from the esgf_queryString map and places them in an array to send to the datacart backend 
	 * Example:
	 * fqParamArray = ('variable=hus','project=obs4MIPs')
	 * 
	 * This is useful when the user wants to filter the files using the search constraints
	 * 
	 */
	createFqParamArray: function () {
		var fqParamArr = new Array();
    	
		/*
    	var fqParams = Manager.store.get('fq');
    	for(var i=0;i<fqParams.length;i++){
    		var fqParam = fqParams[i];
    		if( fqParam['value'] != 'type:Dataset') {
    			fqParamArr.push(fqParam['value']);
    		}
    		
    	}
    	*/
		
    	fqParams = ESGF.localStorage.getAll('esgf_queryString');
    	for(var key in fqParams) {
    		if(key != 'type:Dataset' && (key.search('distrib') < 0))
    			fqParamArr.push(fqParams[key]);
    	}
    	
    	return fqParamArr;
	},
	
	
	
	//dynamically add spinning wheel to the datacart space
	addDataCartSpinWheel: function () {
    	//add a spin wheel to indicate that the system is processing
    	$('tbody#datasetList').after('<img id="spinner" src="images/ajax-loader.gif" />');
    	$('tbody#datasetList').after('<p id="waitWarn">Waiting for files...</p>');
    	
    },

    //dynamically remove spinning wheel to the datacart space
    removeDataCartSpinWheel: function() {
    	$('#waitWarn').remove();
		$('#spinner').remove();
    },
    
   
   
    
    showFileContents: function(data) {
    	
    	LOG.debug("Showing file contents" + data);
    	
    	
    	var self = this;
    	
    	if(data != null) {
    		
    		
    		var fileDownloadTemplate = data.doc;
    		
    		
    		$( "#cartTemplateStyledNew").tmpl(fileDownloadTemplate, {
    			
    			replacePeriods : function (word) {
                    return self.replacePeriod(word);
                },
                abbreviate : function (word) {
                    var abbreviation = word;
                    if(word.length > 50) {
                        abbreviation = word;//word.slice(0,20) + '...' + word.slice(word.length-21,word.length);
                    }
                    return abbreviation;
                },
                addOne: function(num) {
                    return (num+1);
                },
                sizeConversion : function(size) {
                	return self.sizeConvert(size);
                }
            })
            .appendTo("#datasetList")
            .find( "a.showAllChildren" ).click(function() {
            	
            	if(this.innerHTML === "Expand") {
                    this.innerHTML="Collapse";
                } else {
                    this.innerHTML="Expand";
                }
            	
            	
            	var selectedItem = $.tmplItem(this);
                var selectedDoc = selectedItem;

            	var selectedDocId = selectedItem.data.datasetId;
            	
            	var id = $(this).parent().parent().parent().html();
                
            	$('tr.rows_'+self.replacePeriod(selectedDocId)).toggle();
                
            	
            });
    		
    	}
		
	},
	
	
	/* Utility functions */
	
	
	 /*
     * This function is used primarily to avoid annoying errors that occur with strings that have periods in them
     */
    replacePeriod: function (word)
    {
        var newWord = word.replace(/\./g,"_");
        return newWord;
    },
	

    /*
     * This function prints contents of an object
     */
    printObject: function (object) {
        var output = '';
        for (var property in object) {
          output += property + ': ' + object[property]+'; ';
        }
        alert(output);
    },
    
    /*
     * This function abbreviates long strings
     */
    abbreviateWord: function(word) {
    	var abbreviation = word;
        if(word.length > 25) {
            abbreviation = word.slice(0,10) + '...' + word.slice(word.length-11,word.length);
        }
        return abbreviation;
    },
    
    /*
     * This function converts file sizes to a string representing its size in bytes
     */
    sizeConvert: function (size) {
    	var convSize;
        if(size == null) {
            convSize = 'N/A';
        } else {
            var sizeFlt = parseFloat(size,10);
            if(sizeFlt > 1000000000) {
                var num = 1000000000;
                convSize = (sizeFlt / num).toFixed(2) + ' GB';
            } else if (sizeFlt > 1000000) {
                var num = 1000000;
                convSize = (sizeFlt / num).toFixed(2) + ' MB';
            } else {
                var num = 1000;
                convSize = (sizeFlt / num).toFixed(2) + ' KB';
            }
        }
        return convSize;
    }
    

});

}(jQuery));


/*
	if(ESGF.setting.getShards == 'service') {
		self.loadCartShardsFromService(arr);
	} else {
  	self.loadCartShardsFromSolrConfig(arr);
	}
	*/



/* OLD WGET Gen
//begin assembling queryString
var queryString = 'type=create&id=' + selectedDocId;


//gather the ids and the urls for download
var ids   = new Array();
var values = new Array();

var dataset = self.replacePeriod(selectedDocId);

$(this).parent().parent().parent().find('tr.rows_'+ dataset).find(':checkbox:checked').each( function(index) {
    if(this.id != selectedDocId) {
    ids.push(this.id);
    values.push(this.value);
   }
});

//assemble parameters of the queryString
for(var i=0;i<ids.length;i++) {
	queryString += '&child_url=' + values[i] + '&child_id=' + ids[i];
}

var url = '/esgf-web-fe/wgetproxy';

//assemble the input fields with the query string
var input = '';
jQuery.each(queryString.split('&'), function(){
    var pair = this.split('=');
    input+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
});

//add the search constraints
input+= '<input type="hidden" name="constraints" value="' + (JSON.stringify(self.searchConstraints)).replace(/\"/gi,'\'') + '" />';

//send request
jQuery('<form action="'+ url +'" method="post">'+input+'</form>')
.appendTo('body').submit().remove();
*/


/* OLD UBER SCRIPT
//begin assembling queryString
var queryString = 'type=create&id=' + 'AllScripts';

//need to grab all of the datasets
//grab all the keys from the datacart and place in an array
//var selected_arr = ESGF.localStorage.toKeyArr('dataCart');


//gather the ids and the urls for download
var ids   = new Array();
var values = new Array();

for(var i=0;i<self.selected_arr.length;i++) {
	var selectedDocId = self.selected_arr[i];
	var datasetId = self.replacePeriod(self.selected_arr[i]);
	
	$(this).parent().parent().parent().parent().parent().parent().find('tr.rows_'+ datasetId).find(':checkbox:checked').each( function(index) {
		
        if(this.id != selectedDocId) {
        	ids.push(this.id);
        	values.push(this.value);
        }
       
    });
	
}

//assemble parameters of the queryString
for(var i=0;i<ids.length;i++) {
	queryString += '&child_url=' + values[i] + '&child_id=' + ids[i];
}

var url = '/esgf-web-fe/wgetproxy';
//assemble the input fields with the query string
var input = '';
jQuery.each(queryString.split('&'), function(){
    var pair = this.split('=');
    input+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
});

//add the search constraints
input+= '<input type="hidden" name="constraints" value="' + (JSON.stringify(self.searchConstraints)).replace(/\"/gi,'\'') + '" />';

//send request
jQuery('<form action="'+ url +'" method="post">'+input+'</form>')
.appendTo('body').submit().remove();

*/