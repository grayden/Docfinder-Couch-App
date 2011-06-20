function (keys, values, rereduce)
{
    var matches = [1];
    for (i=0; i < keys.length; i++)
    {
        for (j=0; j < keys.length; j++)
        {
            if (keys[i][0][1] == "docdate" && keys[j][0][1] == "dockey")
            {
                if (values[i]["val"] == values[j]["docdate.val"])
                {
                      return values[i]["val"];
                }
            }
//            matches.push(values[i]);
        }
    }

}