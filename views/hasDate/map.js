function(doc)
{
	if (doc.collection == "date")
	{
		emit(doc._id,doc);
	}
}