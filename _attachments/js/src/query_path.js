function path_p()
{
    this.port = "5984";
    this.site = "127.0.0.1";
    this.db_uri = "docfinder/_design/docs/_view";
    
    this.bay1 = [];
    this.bay2 = [];
    this.launch = [];

    this.path_step = 0;
    this.path; // The schema array
    this.starting_point;
    this.ending_point;
    this.starting_key;
    this.starting_property;
}

path_p.prototype.couch_query = function(view, specs)
{
    return JSON.parse($.ajax({
        type: "GET",
        url: "/" + this.db_uri + "/" + view + "?" + specs,
        async: false
    }).responseText);
}

path_p.prototype.save_object = function (view, specs)
{
    var count = this.launch.push(path.couch_query(view, specs));
    return this.launch[count -1];
}

path_p.prototype.set_directions = function(path, starting_type, ending_type, starting_property, starting_key)
{
    this.path = path;
    this.starting_type = starting_type;
    this.ending_type = ending_type;
    this.starting_property = starting_property;
    this.starting_key = starting_key;
}

path_p.prototype.test_query_got_rows = function(to_test)
{
    if (to_test.rows) {return true;}
    return false;
}

path_p.prototype.test_starting_point = function()
{
    return this.test_query_got_rows(this.couch_query("use_country_name",'key=["' + this.starting_key +'","' + this.starting_property + '"]'));
}

path_p.prototype.console_show_couch_query = function (view, specs)
{
    console.log(this.couch_query(view, specs));
}

var path = new path_p;

var test_schema_array = [
    {country: [["city", "country.code", "code"]]},
    {city: [["country", "code", "country.code"], ["dockey", "city.name", "name"]]},
    {dockey: [["city", "name", "city.name"]]}
];
path.set_directions(test_schema_array, "country", "dockey", "name", "Canada");
console.log(path.test_starting_point());
path.console_show_couch_query("use_country_name",'key=["Canada","country"]');
