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
							'chat': 'chat',
						'*other': 'chat'		
					}
			});

			var initialize = function( options ) {
				var appView = options.appView;
				var router = new AppRouter( options );

				router.on('route:index', function() {
						//appView.render();
				});

				router.on('route:chat', function() {
						require(['views/chatroom'], function( ChatroomView ) {
								var chatroomView = Vm.create(appView,
										'ChatroomView',
										ChatroomView,
										{ el: '.content' }
										);
						});
				});

				Backbone.history.start({ pushState: false });
			}

			return {
					initialize: initialize
			};
	}
);
