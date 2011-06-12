function(doc)
{
	if (doc.collection && doc.collection == "city")
	{
		emit(doc._id,doc);
	}
}