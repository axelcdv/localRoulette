// js/models/message.js

define([
	'jquery',
	'underscore',
	'backbone',
	'events'
	],
	function($, _, Backbone, Events)
	{
			var MessageModel = Backbone.Model.extend({
					defaults: {
							from: "",
							body: "",
							to: "",
							profile_pic: "img/sloth2.jpg"
					},
					initialize: function(options) {
							this.url = options.url || "";
							this.from = options.from || this.from;
							this.to = options.to || this.to;
							this.body = options.body || this.body;
					},

					save: function(attributes, options){
						console.log("Saving message");
						options = options ? _.clone(options) : {};
						console.log(attributes);
						if (attributes) {
							this.from = attributes.from || this.from;
							this.to = attributes.to || this.to;
							this.body = attributes.body || this.body;
						}
						Events.trigger("sendMessage", {
							from: this.from,
							to: this.to,
							body: this.body
						},
						function (data) {
							console.log("Triggering callback...");
							if (data && data.timestamp) {
								this.timestamp = data.timestamp;
								if (options.success) {
									options.success( data );
								}
							} else{
								console.log("Server did not reply with message containing timestamp");
							}
							console.log("Callback done");
						});
					}
			});

			return MessageModel;
	}
);
