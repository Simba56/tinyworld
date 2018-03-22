sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'],
	function(MessageToast, Controller, JSONModel) {
		"use strict";

		var ControllerController = Controller.extend("sap.ui.demo.walkthrough.controller.App", {

			onInit: function() {
					this.oModel1 = new sap.ui.model.json.JSONModel();
					this.oModel2 = new sap.ui.model.json.JSONModel();

			},
			handleUploadComplete: function(oEvent) {
				var sResponse = oEvent.getParameter("response");
				if (sResponse) {
					var sMsg = "";
					var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
					if (m[1] === "200") {
						sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
						oEvent.getSource().setValue("");
					} else {
						sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
					}

					MessageToast.show(sMsg);
				}
			},
			handleUploadPress: function(oEvent) {
			//	var oFileUploader = this.getView().byId("fileUploader");
				//	oFileUploader.upload();

			//	var domRef = oFileUploader.getFocusDomRef();
			//	var imageFile = domRef.files[0];
			var imageFile = jQuery.sap.domById(this.getView().byId("fileUploader").getId() + "-fu").files[0];
			

			//	var oModel = new sap.ui.model.json.JSONModel();
				var sHeaders = {
				//	"Content-Type": "multipart/form-data",
					"Accept": "application/json",
					"APIKey": "daoK2MEzMKPtFFX9dsBXIl8ebsHNfBqK"
				};
			/*	var reader = new FileReader();
				var data;
				reader.onload = function(event){
					 data = event.target.result;
				};*/
					var fd = new FormData();
					fd.append("files", imageFile);
				jQuery.ajax({
						type: "POST",
						url: "https://sandbox.api.sap.com/ml/featureextraction/inference_sync",
						headers: sHeaders,
						data: fd,
						processData: false,
						contentType: false,
						success: $.proxy(function(data) {
						//	var oResult = JSON.parse(data);
						 var oResult = data.predictions[0].feature_vector;
						/*	var oModel = new sap.ui.model.json.JSONModel(oResult);
							sap.ui.getCore().setModel(oModel, "similarityResults");*/
							this.oModel1.setData(oResult);
							MessageToast.show(oResult);
						//	var databack = this.oModel1.getData();
						//	that.getRouter().navTo("object");
							//show results
						/*		var oImage = this.getView().byId("imgResult1");
								oImage.setSrc(oResult[0].picUrl);
								oImage = this.getView().byId("imgResult2");
								oImage.setSrc(oResult[1].picUrl);
								oImage = this.getView().byId("imgResult3");
								oImage.setSrc(oResult[2].picUrl);*/
							//this.getView().setModel(oModel, 'similarityResults');
							/*var oResultArea = this.getView().byId("resultLayout");
							oResultArea.setVisible(true);*/
						//	sap.ui.core.BusyIndicator.hide();
						}, this),
						error: function() {}
						//	sap.ui.core.BusyIndicator.hide();
			/*	oModel.loadData("https://sandbox.api.sap.com/ml/featureextraction/inference_sync", oData, true, "POST", null, false, sHeaders);
				oModel.attachRequestCompleted(function(oEvent1) {
					var oData1 = oEvent1.getSource().oData;
					console.log(oData1);*/
				});
				
			}
			
		});

		return ControllerController;

	});