// js/utils/storage.js

define([
		'jquery',
		'cordova',
		'api'
		],
		function( $, Cordova, Api ) {
				var localStorage = window.localStorage;
				var sessionStorage = window.sessionStorage;

				if ( Api.debug ) {
						localStorage.setItem("username", Api.username);
				}

				return {
						local: localStorage,
						session: sessionStorage
				};
		}
	  );
