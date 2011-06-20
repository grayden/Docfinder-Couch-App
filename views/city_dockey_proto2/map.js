function(doc) {
    if (doc.collection == "dockey")
        emit(null, doc);
    else if (doc.collection == "city")
    {
        emit(null, doc);
    }
}