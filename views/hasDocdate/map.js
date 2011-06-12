function(doc)
{
	if (doc.collection == "docdate")
	{
		emit(doc._id,doc);
	}
}