function path_proto()
{
    this.current_step = -1;
    this.start_type = "";
    this.end_type = "";
    this.start_value = "";
    this.start_property = "";
    this.steps = [];
    
    this.bay = [];
    this.launch = [];

    this.query_tool;
}

path_proto.prototype.set_directions = function(directions_object)
{
    this.start_type = directions_object.start_type;
    this.end_type = directions_object.end_type;
    this.start_property = directions_object.start_property;
    this.start_value = directions_object.start_value;
    this.steps = directions_object.steps;
}

path_proto.prototype.go_to_next_step = function()
{
    this.current_step++;
    return this.steps[this.current_step];
}

path_proto.prototype.query_path = function()
{
    var doc_type = this.doc_type();
    var doc_property = this.doc_property();
    var doc_value = this.doc_value();
    
    console.log(doc_type);
    console.log(doc_property);
    console.log(doc_value);
    
    var view = this.query_tool.determine_needed_view(doc_type, doc_property);
    var specs = 'key=["' + doc_value + '","' + doc_type + '"]';
    this.query_tool.couch_query(view, specs);
    this.go_to_next_step();
}

path_proto.prototype.doc_type = function()
{
    return (this.steps[this.current_step])?(this.steps[this.current_step][2]):this.start_type;
}

path_proto.prototype.doc_property = function()
{
    return (this.steps[this.current_step])?(this.steps[this.current_step][1]):this.start_property;
}

path_proto.prototype.doc_value = function()
{
    // Only allows a path down the first matched value
    return (this.bay[0])?(this.bay[0].value[this.doc_property()]):this.start_value;
}

path_proto.prototype.add_query_tool = function(tool)
{
    this.query_tool = tool;
}

path_proto.prototype.save_db_retrieved = function (obj)
{
    if (this.bay[0])
        this.launch.push(this.bay);
    
        this.bay = obj.rows;
}

function query_proto()
{
    this.port = "5984";
    this.site = "127.0.0.1";
    this.db_uri = "/docfinder/_design/docs/_view";
    
    this.path_tool;
}

query_proto.prototype.couch_query = function(view, specs)
{
    var query = this.db_uri + "/" + view + "?" + specs;
    console.log(query);
    $.get(query,
        function(data)
        {
            var obj = JSON.parse(data);
            console.log(data);
            // Make reference better
            path.save_db_retrieved(obj);
            
            if (object_has_rows(obj))
                path.query_path();
            else
            {
                console.log(path.launch);
            }
        }
    );
}

// The idea of this method is that it will determine what view is needed for the immediate query
// I'm hoping this method can be a bit more "magical"

query_proto.prototype.determine_needed_view = function (type, property)
{
    if (type == "country" && (property == "name" || property == "country.name"))
        return "use_country_name";
    
    if ((type == "country" || type == "city") && (property == "country.code" || property == "code"))
        return "use_country_code";

    if ((type == "city" || type == "dockey") && (property == "city.name" || property == "name"))
        return "use_city_name";
    
    return "no_view";
}

function object_has_rows(to_test)
{
    if (to_test.rows && to_test.rows.length > 0) {return true;}
    return false;
}

query_proto.prototype.add_path_tool = function(path_tool)
{
    this.path_tool = path_tool;
}

var path = new path_proto();
var query = new query_proto();

// V2 of guiding path object
var test_path = {
    start_type: "country",
    end_type: "dockey",
    start_property: "name",
    start_value: "Canada",
    steps: [
        ["country", "code", "city", "country.code"],
        ["city", "name", "dockey", "city.name"]
        ]
    };

path.set_directions(test_path);
path.add_query_tool(query);
query.add_path_tool(path);
path.query_path();

/*
 V1 of guiding path object
var test_schema_array = [ 
    // Read like this: Country can link to city because city has a country.code 
    // which matches the code of country
    {country: [["city", "country.code", "code"]]},
    {city: [["country", "code", "country.code"], ["dockey", "city.name", "name"]]},
    {dockey: [["city", "name", "city.name"]]}
];
*/




/***** DEMO STUFF *****/

var foo = function(listen)
{
    setTimeout(function()
    {
        $.get("/" +"docfinder/_design/docs/_view" + "/use_country_code",
            function(resp)
            {
                listen.hasComeBack(resp); // dispatcher
                foo(listen);
            }
        );

    },3000);
    
};
myListener = function(){
    this.responses = [];
};

myListener.prototype.hasComeBack = function(resp)
{
    this.responses.push (resp);
    console.log("im back: " + resp.length);
}
var m;
$(function()
{
   //m = new myListener();
   //foo(m);
   $('.hello').live('click',function()
    {
        $("body").append("<a class='hello' href='#'>hello!</a>");
    });


//    $("body").append("<a class='hello' href='#'>hello!</a>");
});