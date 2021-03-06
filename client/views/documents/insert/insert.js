var pageSession = new ReactiveDict();

Template.DocumentsInsert.rendered = function() {
	
};

Template.DocumentsInsert.events({
	
});

Template.DocumentsInsert.helpers({
	
});

Template.DocumentsInsertInsertForm.rendered = function() {
	

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("documentsInsertInsertFormInfoMessage", "");
	pageSession.set("documentsInsertInsertFormErrorMessage", "");

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

Template.DocumentsInsertInsertForm.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_DocumentsInsertInsertForm").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("documentsInsertInsertFormInfoMessage", "");
		pageSession.set("documentsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var documentsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(documentsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("documentsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("documents", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("documentsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Documents.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("documents", {});
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

Template.DocumentsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("documentsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("documentsInsertInsertFormErrorMessage");
	}
	
});
