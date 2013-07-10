// js/models/message.js

define([
	'jquery',
	'backbone'
	],
	function($, Backbone)
	{
			var MessageModel = Backbone.Model.extend({
					defaults: {
							from: "",
							body: "",
							profile_pic: "img/sloth2.jpg",
					},
					initialize: function(options) {
							this.url = options.url || "";
					}
			});

			return MessageModel;
	}
);
