function MakeTableBuilder (sortIcon) {

    var tableBuilder = {};

    tableBuilder.build = function (params) {

        function prettyColumnHeading(propName) {

            if (propName.length === 0) {
                return "";
            }

            var newHdg = "<img src='" + sortIcon + "'>";
            newHdg += " ";
            newHdg += propName.charAt(0).toUpperCase();
            for (var i = 1; i < propName.length; i++) {
                if (propName.charAt(i) < "a") {
                    newHdg += " ";
                }
                newHdg += propName.charAt(i);
            }
            return newHdg;
        }

        // right justify HTML table data (DOM object, a table cell) if it contains a number
        // center the value if it contains an image.
        function align(tableData) {

            var cellContent = tableData.innerHTML;
            if (cellContent.includes(".jpg") || cellContent.includes(".png")) {

                // **** enhanced from HW4 -- dont turn icon cell contents into img tag...
                if (!cellContent.includes('icon')) {
                    tableData.innerHTML = "<img width='" + imgWidth + "' src='" + cellContent + "'>";
                    tableData.style.textAlign = "center";
                }
            }
            if (!isNaN(cellContent) || // if numeric 
                    ((cellContent.length > 0) && (cellContent.charAt(0) === "$"))) { // or dollar amt
                tableData.style.textAlign = "right";
                //console.log("right alligning " + cellContent);
            }
        } // align 

        function buildColHeadings(newTable, list) {

            var tableHead = document.createElement("thead");
            newTable.appendChild(tableHead);
            var tableHeadRow = document.createElement("tr");
            tableHead.appendChild(tableHeadRow);
            
            var data = list[0];
            for (var prop in data) {
                var tableHeadDetail = document.createElement("th");
                tableHeadRow.appendChild(tableHeadDetail);
                tableHeadDetail.innerHTML = prettyColumnHeading(prop);
                tableHeadDetail.sortOrder = prop;
                tableHeadDetail.sortReverse = false;

                tableHeadDetail.onclick = function () {
                    console.log("SORTING by " + this.sortOrder + " -  this.sortReverse is " + this.sortReverse);
                    tableBuilder.sort(list, this.sortOrder, this.sortReverse);
                    fillRows(newTable, list);
                    this.sortReverse = !this.sortReverse;
                    console.log("SORTed sortReverse is now " + this.sortReverse);
                };
            }
            /*
            var tableHeadDelete = document.createElement("th");
            tableHeadDelete.innerHTML = "Delete";
            tableHeadRow.appendChild(tableHeadDelete);
            */
        }


        function isToShow(obj, searchKey) {
            if (!searchKey || searchKey.length === 0) {
                return true;
            }
            var searchKeyUpper = searchKey.toUpperCase();
            for (var prop in obj) {
                var propVal = obj[prop];
                console.log("checking if " + searchKeyUpper + " is in " + propVal);
                var propValUpper = propVal.toUpperCase();
                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("yes it is inside");
                    return true;
                }
            }
            console.log("no it is not inside");
            return false;
        } 


        function fillRows(newTable, list, searchValue) {

            var oldBody = newTable.getElementsByTagName("tbody");
            if (oldBody[0]) {
                console.log("ready to remove oldBody");
                newTable.removeChild(oldBody[0]);
            }

            var tableBody = document.createElement("tbody");
            newTable.appendChild(tableBody);

            for (var i in list) {
                var data = list[i];
                if (isToShow(data, searchValue)) {

                    var tableRow = document.createElement("tr");
                    tableBody.appendChild(tableRow);

                    for (var prop in data) {
                        var tableData = document.createElement("td");
                        tableRow.appendChild(tableData);
                        tableData.innerHTML = data[prop];
                        align(tableData);
                    }
                    /*
                    var deleteData = document.createElement("td");
                    var deleteWrapper = document.createElement("a");
                    deleteWrapper.href = "https://www.google.com";
                    var deleteIcon = document.createElement("img");
                    deleteIcon.src = "icons/delete.png";
                    deleteWrapper.appendChild(deleteIcon);
                    deleteData.appendChild(deleteWrapper);
                    tableRow.appendChild(deleteData);
                    */
                }
            }
        }

        if (!params || !params.list || params.list.length < 1) {
            alert("Must supply input parameter object with 'list' property that holds an array with at least one element.");
            return;
        }
        var list = params.list;
        var target = params.target;
        if (!params.target) {
            alert("Must supply input parameter object with 'target' property " +
                    "that references a valid DOM object (where HTML table is to be placed).");
            return;
        }

        var orderPropName = params.orderPropName || ""; 

        var reverse = params.reverse || false;

        var style = params.style || "dataList";
        target.classList.add(style);

        var imgWidth = params.imgWidth || "100px";

        if (orderPropName && orderPropName.length > 0) {
            tableBuilder.sort(list, orderPropName, reverse);
            console.log("SORTED LIST NEXT LINE");
            console.log(list);
        }

        var newTable = document.createElement("table");
        newTable.setAttribute('width', '100%');

        if (params.searchKeyElem) {
            console.log("there is a search key textbox");
            params.searchKeyElem.onkeyup = function () {
                console.log("search key is " + params.searchKeyElem.value);
                fillRows(newTable, list, params.searchKeyElem.value);
            };
        }

        target.innerHTML = "";
        target.appendChild(newTable);

        buildColHeadings(newTable, list);
        fillRows(newTable, list, "");

    };

    tableBuilder.convert = function (s) {

        if (!s || s.length === 0) {
            return -1;
        }

        var parsedDate = Date.parse(s);
        if (isNaN(s) && !isNaN(parsedDate)) {
            return parsedDate;
        } else {
            var tmp = s;
            console.log("tmp is " + tmp);
            tmp = tmp.replace("$", "");
            tmp = tmp.replace(",", "");
            if (isNaN(tmp)) {
                return s.toUpperCase();
            } else {
                return Number(tmp);
            }
        }
    };


    tableBuilder.compare = function (a, b, reverse) {

        var aConverted = tableBuilder.convert(a);
        var bConverted = tableBuilder.convert(b);

        if (aConverted === -1 && isNaN(bConverted)) {
            aConverted = "";
        }
        if (bConverted === -1 && isNaN(aConverted)) {
            bConverted = "";
        }

        var comparison = 0;
        if (aConverted > bConverted) {
            comparison = 1;
        } else if (aConverted < bConverted) {
            comparison = -1;
        }
        console.log("comparing " + aConverted + " to " + bConverted + " is " + comparison);
        if (reverse) {
            comparison = -comparison;
        }
        return comparison;
    };


    tableBuilder.sort = function (list, byProperty, reverse) {
 
        list.sort(function (q, r) {

            return tableBuilder.compare(q[byProperty], r[byProperty], reverse);
        });
    };
    
    return tableBuilder;
}