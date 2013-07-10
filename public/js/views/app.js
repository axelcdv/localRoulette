// js/views/app.js

define([
	'jquery',
	'underscore',
	'backbone',
	'cordova',
	'router',
	'events',
	'text!templates/main.html'
	],
	function($, _, Backbone, cordova, Router, Events, MainTemplate) {
			var AppView = Backbone.View.extend({
					el: $('#page'),
					mainTemplate: _.template( MainTemplate ),
					render: function() {
							this.$el.append( this.mainTemplate() );
					}
			});

			return AppView;
	}
);
