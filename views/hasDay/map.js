function(doc)
{
	if (doc.collection == "day")
	{
		emit(doc._id,doc);
	}
}