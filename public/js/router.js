// js/router.js

define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events'
	],
	function($, _, Backbone, Vm, Events) {

			var AppRouter = Backbone.Router.extend({
					routes: {
						'*other': 'index'		
					}
			});

			var initialize = function( options ) {
				var appView = options.appView;
				var router = new AppRouter( options );

				router.on('route:index', function() {
						//appView.render();
				});

				Backbone.history.start({ pushState: false });
			}

			return {
					initialize: initialize
			};
	}
);
