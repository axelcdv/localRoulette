'use strict';

require.config({
		paths:{
				jquery: 'libs/jquery/jquery-min',
				underscore: 'libs/underscore/underscore-min',
				backbone: 'libs/backbone/backbone-min',
				text: 'libs/require/text',
//				cordova: 'libs/cordova/cordova-ios',
//				cordova: 'libs/cordova/cordova-android',
				cordova: 'libs/cordova/cordova-empty',
				socketio: 'libs/socket.io/socket-client.io'
		},
		shim: {
				underscore: {
						exports: '_'
				},
				backbone: {
						deps: ['underscore', 'jquery'],
						exports: 'Backbone',
				},
				cordova: {
						exports: 'cordova'
				},
				app: {
						deps: ['jquery', 'underscore', 'backbone', 'cordova']
				},
				socketio: {
						exports: 'io'
				}
		}
});

// TODO should probably wait on 'deviceready' event if cordova is to be loaded
require(['views/app', 'router', 'vm', 'socket'], function(AppView, Router, Vm, AppSocket) {
		var appView = Vm.create({}, 'AppView', AppView);
		appView.render();
		Router.initialize({ appView: appView });
});
