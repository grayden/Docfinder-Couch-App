// column object stuff
var column_counter = 0;
var link_counter = 0;

// make a new display column and append it to the overall container
var new_display_column = function()
{
    var column = '<div></div>';
    column_counter++;
    $("#data_columns_container").append(column).find(":last-child").addClass("data_column").attr("id", "column" + column_counter);
}

// Take some information and put it into a link, the key thing about this link is that it has the
// "lookup_link" class
var make_db_lookup_link = function(content)
{
    link_counter++;
    return '<a href="#" class="lookup_link" id="lookup_link'+link_counter+'">' + content + '</a>';
}

// Add one link to the data column and set up as a lookup link
var append_item_to_column = function(to_show, class_to_add)
{
    $("div#column" + column_counter).append(" " + make_db_lookup_link(to_show) + "<br>");
    $("div#column" + column_counter + " > a:last").addClass(class_to_add);
    bind_lookup_to_link();
}

// Bind lookup function to links that hold data
var bind_lookup_to_link = function()
{
    $("div#column" + column_counter + " > a:last").click(lookup_go);
}


// Add a set of links to a data column
var append_items_array_to_column = function(tag, arr, class_to_add)
{
    $("div#column" + column_counter).append(tag + " ")
    
    $.each(arr, function(index, elem){

        append_item_to_column(elem, class_to_add);
    });
}

// add everything found in the database as a set on the column
function append_data_to_column(index, elem)
{
    // this entry from the database is an array
    if ($.isArray(elem))
    {
        append_items_array_to_column(index, elem, index);
    }
    // this entry from the database is not an array
    else
    {
        $("div#column" + column_counter).append(index);
        append_item_to_column(elem, index);
    }
}


// loop through each of the values in a row and add it to a data column
function add_values_to_column(values)
{
    // Fill column
    $.each(values, function(index, elem){

        if (index != "_id" && index != "_rev" && index != "collection")
        {
            append_data_to_column(index, elem);
        }       
    });
    $("div#column" + column_counter).append("<br>");
}

var custom_var_dump = function()
{
    alert(this.db_lookup);
    alert(this.column_counter);
    alert(this.link_counter);
}

var column = function()
{
    this.db_lookup = false;
    this.column_counter = 0;
    this.link_counter = 0;
}

var column_inst = new column;
column.prototype.custom_var_dump = custom_var_dump;

