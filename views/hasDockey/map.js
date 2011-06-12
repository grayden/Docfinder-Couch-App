function(doc)
{
	if (doc.collection == "dockey")
	{
		emit(doc._id,doc);
	}
}