/**
 * Presentation theme for Solr search results
 *
 * fwang2@ornl.gov
 *
 */

(function ($) {


AjaxSolr.theme.prototype.result = function (doc, snippet, actions) {
    var output = '';

    if (doc.title.length > 78) {
        doc.title = doc.title.substring(0,70) + "...";
    }


    var idStr = 'id="' + doc.id + '" ';
    var titleStr = 'title="' + doc.title + '" ';
    var urlStr = 'url="' + doc.url + '" ';
    var formatStr = 'format="' + doc.metadata_format + '" ';
    var metadataURLStr = 'metadata_url="' + doc.metadata_url + '" ';

    var allStr = idStr + titleStr + urlStr + formatStr +  metadataURLStr; //+ descriptionStr + westDegreesStr + eastDegreesStr + northDegreesStr + southDegreesStr + datetime_startStr + datetime_stopStr;

    output += '<div class="search-entry">';
      output += '<h4 class="desc">';
      output += '<a href="#" style="text-decoration:none">';
      output += doc.title + '</a>';
      output += '</h4>' ;
      output += '<p id="links_' + doc.id + '" class="links"></p>';
      output += "<p/>" + snippet + actions + '</div>';

      return output;
};


AjaxSolr.theme.prototype.actions = function (doc) {
    var output = '<div class="actions">',
        selectID = '',
        selected = ESGF.search.selected,
        carts = [];


    var idStr = 'id="' + doc.id + '" ';
    var titleStr = 'title="' + doc.title + '" ';
    var urlStr = 'url="' + doc.url + '" ';
    var formatStr = 'format="' + doc.metadata_format + '" ';
    var metadataURLStr = 'metadata_url="' + doc.metadata_url + '" ';
    var allStr = idStr + titleStr + urlStr + formatStr +  metadataURLStr;

    output += "Further options: ";
    output += '<span class="actionitem ai_meta"><a href="/esgf-web-fe/scripts/esgf/metadata_overlay.html" class="met" rel="#metadata_overlay"' + allStr + '> Metadata Summary</a></span>';

    selectID = 'ai_select_'+ doc.id.replace(/\./g, "_");
    output += '<span class="actionitem"> <a href="#" id="' + selectID + '">Select</a></span>';
    output += '<span class="actionitem ai_las"><a href="#">LAS</a></span>';
    output += '<span class="actionitem"><a class="annotate" href="/esgf-web-fe/scripts/esgf/annotation_overlay.html" rel="#annotator_overlay"> Annotate</a></span>';
    output += "</div>";

    $("a[id=" + selectID + "]").live('click', {doc:doc}, function (evt) {

        selected[evt.data.doc.id] = doc;
        if ( jQuery.trim(this.innerHTML) == "Select") {
            var $dialog = $('<div></div>')
                .html('Dataset <b>' + evt.data.doc.id + "</b> has been added to the selection")
                .dialog({
                    autoOpen: true,
                    show: 'blind',
                    hide: 'explode'
                });
            this.innerHTML="Remove";

        } else {
            var $dialog = $('<div></div>')
            .html('Dataset <b>' + evt.data.doc.id + "</b> has been removed to the selection")
            .dialog({
                autoOpen: true,
                show: 'blind',
                hide: 'explode'
            });
            this.innerHTML ="Select";
            delete selected[evt.data.doc.id];

        }



        return false;
    });


    return output;

};

AjaxSolr.theme.prototype.snippet = function (doc) {

    var output = '';

    if (doc.description != undefined)
        doc.text = doc.description[0];
    if (doc.text != undefined) {
        if (doc.text.length > 500) {
            output += doc.text.substring(0, 500);
            output += '<span style="display:none;">' + doc.text.substring(500);
            output += '</span> <a href="#" class="more"> ... more</a>';
        } else {
            output += doc.text;
        }
    } else {
        output = "No description available.";
    }

    return output;
};

AjaxSolr.theme.prototype.facet_browser_title = function(value) {
    return $('<h1>' + 'Facet Browser' + '<\h1>');
};

AjaxSolr.theme.prototype.facet_title = function(value) {
    var title = $('<span class="facet_title"><h3>' + value + '</h3></span>');
    return title;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  return $('<a href="#" class="tagcloud_item"/>').text(value).addClass('tagcloud_size_' + weight).click(handler);
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};


AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};


AjaxSolr.theme.prototype.prevLink = function (stopValue,objectedItems,divFieldId,thisObject) {
    var $facet_link = $('<a href="#" id="prev_' + divFieldId + '"> prev ' + thisObject.incrementValue + '...</a>').click(thisObject.prevClickHandler(divFieldId));
    return $facet_link;
};

AjaxSolr.theme.prototype.nextLink = function (divFieldId,thisObject) {
    var $facet_link = $('<a href="#" id="next_' + divFieldId + '"> next ' + thisObject.incrementValue + '...</a>').click(thisObject.nextClickHandler(divFieldId));
    return $facet_link;
};


AjaxSolr.theme.prototype.facet_content = function(stopValue,objectedItems,thisObject) {
    var $facet_content = $('<div></div>');
    if(thisObject.startingValue < objectedItems.length) {
        $facet_content.append('<p>');
        for(var i = thisObject.startingValue, l = stopValue; i < l; i++) {
            var facetTextValue = objectedItems[i].facet + ' (' + objectedItems[i].count + ')';
            var facet = objectedItems[i].facet;
            $facet_content.append($('<a href="#" class="tag_item" />').text(facetTextValue).click(thisObject.clickHandler(facet)));
            if(i != (stopValue - 1)) {
                $facet_content.append(' | ');
            }
        };
        $facet_content.append('</p>');

    }
    return $facet_content;
};


})(jQuery);


