// lookup_object definitions

var custom_var_dump = function()
{
    alert(this.host);
    alert(this.uri);
    alert(this.view_prefix);
    alert(this.selected_view);
}

var db_get = function()
{
    console.log(this.uri() + "/_view/" + this.view_prefix() + this.view());
    return couch.get(this.uri() + "/_view/" + this.view_prefix() + this.view());
}

function get_needed_property(property, view)
{
    if (!$.isArray(property))
        return property;
    
    return (view.toLowerCase() == property[0])?(property[1]):(property[0] + "." + property[1]);
}

// lookup object
function match_value(link_obj)
{
    return (link_obj.html());
}


function extract_property(link_obj)
{
    var html_class = ((link_obj.attr("class")));
    html_class = second_class(html_class);

    if (html_class.indexOf(".") == -1) return html_class;

    needed_property_components = html_class.split(".");
    return needed_property_components;
}

// lookup object
function filter(db_raw, view, property, match_value)
{
    var matches = [];

    property = lookup_inst.get_needed_property(property, view);

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
function lookup_go(first)
{
    var view = lookup_inst.view();
    var property;
    var value; 
    if (first !== true)
    {
        property = lookup_inst.extract_property($(this));
        value = lookup_inst.match_value($(this));
    }
    else
    {
        alert('First call');
        property = 'val';
        value = "1";    
    }

    $.when(lookup_inst.db_get()).then(function(retrieved_data){
    
console.log(retrieved_data);
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

var first_call = function()
{
    lookup_inst.lookup_go(true);
}

/***** LOOKUP OBJECT PROTOTYPE *****/
var lookup = function()
{
    this.host_ = "127.0.0.1:5984";
    this.uri_ = "/docfinder/_design/docfinder";
    this.view_prefix_ = "has";
    this.view_ = "";
}

lookup.prototype.host = function()
{
    return this.host_;
};

lookup.prototype.uri = function()
{
    return this.uri_;
};

lookup.prototype.view_prefix = function()
{
    return this.view_prefix_;
};

lookup.prototype.view = function view()
{
    this.view_ = $("#collection_choice").val();
    return this.view_;
}


lookup.prototype.db_get = db_get;
lookup.prototype.custom_var_dump = custom_var_dump;
lookup.prototype.get_needed_property = get_needed_property;
lookup.prototype.extract_property = extract_property;
lookup.prototype.filter = filter;
lookup.prototype.match_value = match_value;
lookup.prototype.lookup_go = lookup_go;

var lookup_inst = new lookup();

