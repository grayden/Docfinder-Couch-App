function(doc)
{
	if (doc.collection == "year")
	{
		emit(doc._id,doc);
	}
}