function(doc)
{
	if (doc.collection == "month")
	{
		emit(doc._id,doc);
	}
}