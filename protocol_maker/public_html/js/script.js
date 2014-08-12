/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define init and show methods
var redipsInit,
	showContent,
	getContent;

// redips initialization
redipsInit = function () {
	var num = 0,			// number of successfully placed elements
		rd = REDIPS.drag;	// reference to the REDIPS.drag lib
	// initialization
	rd.init();
	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// call initially showContent
	rd.dropMode = 'switch';
	rd.only.div.a = 'cellbioglyph';
	rd.only.div.b = 'cellbioglyph';
	// A and B elements can't be placed to other table cells (this is default value)
	rd.only.other = 'deny';
	// after element is cloned define dropping rule for last row (only for clones of A or B element)
	rd.event.cloned = function () {
		// define variables
		var clonedId = rd.obj.id; // cloned id
		// if cloned begins with 'a' or 'b' define dropping rule 'only' for last row
		if (clonedId.substr(0, 1) === 'a' || clonedId.substr(0, 1) === 'b') {   
			rd.only.div[clonedId] = 'cellbioglyph';
		}
	};
	showContent();
	// on each drop refresh content
	rd.event.dropped = function () {
		showContent();
	};
	// call showContent() after DIV element is deleted
	rd.event.deleted = function () {
		showContent();  
	};
    
    rd.event.clonedDropped = function(targetCell){
        //console.log(targetCell.id);
        //console.log(document.getElementById("step_header").cells.length);
        //console.log("drop occurred");
        var current_drop = "td" + document.getElementById("step_header").cells.length;
        
        //only add a new cell if we are dropping on the last cell
        if(current_drop === targetCell.id) {
            var table_header = document.getElementById("step_header");
            var header_row = document.createElement("th");
            header_row.className = "emerald1";
            table_header.appendChild(header_row);
        
            var step_bg = document.getElementById("step_background");
            var step = document.createElement("td");
            step.className = "only cellbioglyph";
            var number = step_bg.cells.length + 1;
            var id_name = "td" + number;
            step.id = id_name;
            step_bg.appendChild(step);
        
            var step_fields = document.getElementById("step_fields");
            var bottom_td = document.createElement("td");
            var bottom_table = document.createElement("table");
            var bottom_row = document.createElement("tr");
            var bottom_cell1 = document.createElement("td");
            var bottom_cell2 = document.createElement("td");
        
            var bottom_div1 = document.createElement("div");
            var bottom_div2 = document.createElement("div");
        
            var bottom_input_from = document.createElement("input");
            var bottom_input_to = document.createElement("input");
        
            bottom_td.id = "td" + number + "_mat";
            bottom_cell1.className = "inner_cellicon";
            bottom_cell2.className = "inner_cellicon";
        
            bottom_div1.className = "111";
            bottom_div2.className = "111";
        
            bottom_input_from.id = "td" + number + "_from";
            bottom_input_from.className = "circle1";
            bottom_input_from.placeholder = "_";
            bottom_input_from.type = "text";

            bottom_input_to.id = "td" + number + "_to";        
            bottom_input_to.className = "circle1";
            bottom_input_to.placeholder = "_";
        
            bottom_input_to.type = "text";
        
            bottom_div1.appendChild(bottom_input_from);
            bottom_div2.appendChild(bottom_input_to);
        
            bottom_cell1.appendChild(bottom_div1);
            bottom_cell2.appendChild(bottom_div2);
        
            bottom_row.appendChild(bottom_cell1);
            bottom_row.appendChild(bottom_cell2);
            bottom_table.appendChild(bottom_row);
            bottom_td.appendChild(bottom_table);
            step_fields.appendChild(bottom_td);
        
            var units_container = document.getElementById("units_container");
            var units_element = document.createElement("td");
            var units_name = "td" + number + "_quant";
            units_element.innerHTML = '<input class="_input_condition" placeholder="25" type="text"><form action=""><select name="units"><option value="µL">µL</option><option value="mL">mL</option><option value="sec">sec</option><option value="min">min</option><option value="hours">hours</option></select></form></div>';
            units_container.appendChild(units_element);
        
        }
    }
};




// show TD content
showContent = function () {
	// get content of TD cells in right table
    /*
	var td1 = getContent('td1'),
		td2 = getContent('td2'),
		td3 = getContent('td3'),
		td4 = getContent('td4'),
		// set reference to the message DIV (below tables)
		message = document.getElementById('message');
	// show block content
	message.innerHTML = 'td1 = ' + td1 + '<br>' +
						'td2 = ' + td2 + '<br>' +
						'td3 = ' + td3 + '<br>' +
						'td4 = ' + td4;*/
};


// get content (DIV elements in TD)
getContent = function (id) {
	var td = document.getElementById(id),
		content = '',
		cn, i;
	// TD can contain many DIV elements
	for (i = 0; i < td.childNodes.length; i++) {
		// set reference to the child node
		cn = td.childNodes[i];
		// childNode should be DIV with containing "drag" class name
		if (cn.nodeName === 'DIV' && cn.className.indexOf('drag') > -1) { // and yes, it should be uppercase
			// append DIV id to the result string
			content += cn.id + '_';
		}
	}
	// cut last '_' from string
	content = content.substring(0, content.length - 1);
	// return result
	return content;
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}


