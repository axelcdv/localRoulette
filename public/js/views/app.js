// js/views/app.js

define([
	'jquery',
	'underscore',
	'backbone',
	'cordova',
	'router',
	'events',
	'text!templates/main.html',
	'text!templates/header.html'
	],
	function($, _, Backbone, cordova, Router, Events, MainTemplate, HeaderTemplate) {
			var AppView = Backbone.View.extend({
					el: $('#page'),
					mainTemplate: _.template( MainTemplate ),
					headerTemplate: _.template( HeaderTemplate ),
					render: function() {
							this.$el.empty();
							this.$el.append( this.headerTemplate( { header_title: 'Naow' } ) );
							this.$el.append( this.mainTemplate() );
					}
			});

			return AppView;
	}
);
