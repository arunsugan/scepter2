this.InvoicesInsertController = RouteController.extend({
	template: "InvoicesInsert",
	

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
			Meteor.subscribe("member_list", this.params.type),
			Meteor.subscribe("invoice_empty"),
			Meteor.subscribe("invoice_list", this.params.account)
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
			member_list: Members.find({type:this.params.type}, {transform:function(doc) { var sum = 0; Invoices.find({ memberId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			invoice_empty: Invoices.findOne({_id:null}, {}),
			invoice_list: Invoices.find({account:this.params.account}, {sort:[["invoiceNumber","desc"]]})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});