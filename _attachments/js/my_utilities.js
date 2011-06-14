function isset(to_check)
{
    return (to_check || to_check === 0 || to_check === false)?true:false;
}

function force_array(to_array)
{
    return ($.isArray(to_array))?to_array:[to_array];
}

function force_array_of_strings(arr)
{
    for (i=0; i < arr.length; i++)
    {
        arr[i] = new String(arr[i]);
        arr[i] = String(arr[i]);
    }
    console.log(arr[0]);
    return arr;
}

function arrays_compare(arr1, arr2)
{

    $.each(arr1, function(index, elem){

        if($.inArray(elem,arr2))
        {
            return true;
        }
    });

    // The arrays have no elements in common
    return false;
}

function second_class(classes)
{
    split = classes.split(" ");
    return split[1];
}
