// lookup_object definitions

// lookup object stuff
var host = "127.0.0.1:5984"
var uri = "/docfinder/_design/docfinder/";
var view_prefix = "has";
var selected_view = ""

var custom_var_dump = function()
{
    alert(this.host);
    alert(this.uri);
    alert(this.view_prefix);
    alert(this.selected_view);
}

// lookup object
var db_get = function()
{
    var get_uri = this.uri + "_view/" + view_prefix + selected_view;
    return couch.get(get_uri);
}

var first_call = function()
{
    lookup_go(true);
}

// lookup object
function property_(property, view)
{
    if (!$.isArray(property))
        return property;
    
    if (view.toLowerCase() == property[0])
        return property[1];
    else
        return property[0] + "." + property[1];
}

// lookup object
function filter(db_raw, view, property, match_value)
{
    var matches = [];

    property = property_(property, view);

    $.each(db_raw.rows, function(index, elem){

        console.log(match_value);
        console.log(elem.value[property]);

        if(($.inArray(match_value, force_array_of_strings(force_array(elem.value[property]))) != -1)  && isset(elem.value[property]))
        {
            console.log('Match detected');
            matches.push(elem);
        }
    });

    return matches;
}

// lookup object
function extract_property(link_obj)
{
    var html_class = ((link_obj.attr("class")));
    html_class = second_class(html_class);

    if (html_class.indexOf(".") == -1)
        return html_class;

    property_components = html_class.split(".");
    return property_components;
}

// lookup object
function match_value(link_obj)
{
    return (link_obj.html());
}

// lookup object
function get_view()
{
    selected_view = $("#collection_choice").val();
    return selected_view;
}

// lookup object
function lookup_go(first)
{
    var view = get_view();
    if (first !== true)
    {
        var property = extract_property($(this));
        var value = match_value($(this));
    }
    else
    {
        alert('First call');
        var property = 'val';
        var value = "1";    
    }

    $.when(db_get()).then(function(retrieved_data){

        retrieved_data = filter(retrieved_data, view, property, value);

        // If filtered is something empty, cease!
        if(!isset(retrieved_data[0]))
        {
            alert("There is nothing there.");
            return false;
        }

        new_display_column();
        $.each(retrieved_data, function(index, elem){

        // Show one array of values in the console
                
        add_values_to_column(elem.value);
    
        });
    });     
}


/***** LOOKUP OBJECT PROTOTYPE *****/
var lookup = function()
{
    this.host = "127.0.0.1:5984";
    this.uri = "/docfinder/_design/docfinder";
    this.view_prefix = "has";
    this.selected_view = "";
}

lookup.prototype.db_get = db_get;
lookup.prototype.custom_var_dump = custom_var_dump;
lookup.prototype.first_call = first_call;
lookup.prototype.property_ = property_;
lookup.prototype.extract_propert = extract_property;
lookup.prototype.filter = filter;
lookup.prototype.match_value = match_value;
lookup.prototype.get_view = get_view;
lookup.prototype.lookup_go = lookup_go;

var lookup_inst = new lookup();

