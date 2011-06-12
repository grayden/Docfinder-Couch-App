function(doc)
{
	if (doc.collection && doc.collection == "country")
	{
		emit(doc._id,doc);
	}
}