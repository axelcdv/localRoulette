// js/views/app.js

define([
	'jquery',
	'underscore',
	'backbone',
	'cordova',
	'router',
	'events',
	'text!templates/main.html',
	'text!templates/header.html',
	'utils/shake'
	],
	function($, _, Backbone, cordova, Router, Events, MainTemplate, HeaderTemplate, Shake) {
			var AppView = Backbone.View.extend({
					el: $('#page'),
					mainTemplate: _.template( MainTemplate ),
					headerTemplate: _.template( HeaderTemplate ),
					initialize: function() {
						
					},
					render: function() {
							this.$el.empty();
							this.$el.append( this.headerTemplate( { header_title: 'Naow' } ) );
							this.$el.append( this.mainTemplate() );
					}
			});

			return AppView;
	}
);
