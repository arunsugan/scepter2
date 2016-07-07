this.EmployeesEditController = RouteController.extend({
	template: "EmployeesEdit",
	

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
			Meteor.subscribe("employee_details", this.params.employeeId)
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
			employee_details: Employees.findOne({_id:this.params.employeeId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});