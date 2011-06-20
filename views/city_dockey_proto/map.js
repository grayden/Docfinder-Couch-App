function(doc) {

        if (doc.collection == "dockey")
		emit([doc["city.name"], 0, {collection: doc.collection}], null);
	else if (doc.collection == "city")
		emit([doc.name, 1, {collection: doc.collection, country: doc["country.code"]}], null);

}