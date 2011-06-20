function(doc) {

	if (doc.collection == "city")
		emit(doc.name, null);
}