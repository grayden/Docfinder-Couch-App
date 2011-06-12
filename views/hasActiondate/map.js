function(doc)
{
	if (doc.collection == "actiondate")
	{
		emit(doc._id,doc);
	}
}