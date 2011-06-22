function (doc)
{
    if (doc.colleciton == "country")
    {
        emit([doc.code, doc.collection], doc);
    }
    if (doc.collection == "city")
    {
        emit([doc["country.code"], doc.collection], doc);
    }
}
