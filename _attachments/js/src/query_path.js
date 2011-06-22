function path_p()
{
    this.current_step = -1;
    this.start_type = "";
    this.end_type = "";
    this.start_value = "";
    this.start_property = "";
    this.steps = [];
    
    this.port = "5984";
    this.site = "127.0.0.1";
    this.db_uri = "docfinder/_design/docs/_view";

    this.bay1 = [];
    this.bay2 = [];
    this.launch = [];

}

path_p.prototype.set_directions = function(directions_object)
{
    this.start_type = directions_object.start_type;
    this.end_type = directions_object.end_type;
    this.start_property = directions_object.start_property;
    this.start_value = directions_object.start_value;
    this.steps = directions_object.steps;
}

path_p.prototype.next_step = function()
{
    this.current_step++;
    return this.steps[this.current_step];
}

path_p.prototype.console_next_step = function()
{
    console.log(this.next_step());
}

path_p.prototype.couch_query = function(view, specs)
{
    console.log("/" + this.db_uri + "/" + view + "?" + specs);
    return JSON.parse($.ajax({
        type: "GET",
        url: "/" + this.db_uri + "/" + view + "?" + specs,
        async: false
    }).responseText);
}

path_p.prototype.test_starting_point = function()
{
    var view = this.determine_needed_view(this.start_type, this.start_property);
    
    return this.test_query_got_rows(
    this.couch_query(view,'key=["' + this.start_value +'","' + this.start_type + '"]')
    );
}

path_p.prototype.save_object = function (view, specs)
{
    var count = this.launch.push(path.couch_query(view, specs));
    return this.launch[count -1];
}

// The idea of this method is that it will determine what view is needed for the immediate query
// I'm hoping this method can be a bit more "magical"
path_p.prototype.determine_needed_view = function (type, property)
{
    if (type == "country" && (property == "name" || property == "country.name"))
        return "use_country_name";
    
    if ((type == "country" || type == "city") && (property == "country.code" || property == "code"))
        return "use_country_code";
    
    return "no_view";
}

path_p.prototype.test_query_got_rows = function(to_test)
{
    if (to_test.rows && to_test.rows.length > 0) {return true;}
    return false;
}


var path = new path_p;

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
console.log(path.test_starting_point());

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

    $("body").append('<input type="button" class="show_next">');
    $('.show_next').click(function () {
       path.console_next_step(); 
    });

//    $("body").append("<a class='hello' href='#'>hello!</a>");
});