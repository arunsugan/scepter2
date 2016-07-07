this.PaidoutsEditController = RouteController.extend({
	template: "PaidoutsEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("supplier_list", this.params.type),
			Meteor.subscribe("paidout_details", this.params.paidoutId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			supplier_list: Suppliers.find({type:this.params.type}, {transform:function(doc) { var sum = 0; Invoices.find({ supplierId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			paidout_details: Paidouts.findOne({_id:this.params.paidoutId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});