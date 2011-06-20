function(doc) {

        if (doc.collection == "dockey")
		emit(doc.val, 1);
}