var pageSession = new ReactiveDict();

Template.EmployeesInsert.rendered = function() {
	
};

Template.EmployeesInsert.events({
	
});

Template.EmployeesInsert.helpers({
	
});

Template.EmployeesInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("employeesInsertInsertFormInfoMessage", "");
	pageSession.set("employeesInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

//	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.EmployeesInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_EmployeesInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("employeesInsertInsertFormInfoMessage", "");
		pageSession.set("employeesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var employeesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(employeesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("employeesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("employees", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("employeesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Employees.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("employees", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EmployeesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("employeesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("employeesInsertInsertFormErrorMessage");
	}
	
});
