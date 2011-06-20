function(doc) {
    
    if (doc.collection == "dockey" || (doc.collection == "docdate" && doc.val == "2000/1/2"))
    {
        emit([doc._id, doc.collection], doc);
    }
}