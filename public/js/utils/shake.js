// js/utils/shake.js

define([
		'jquery',
		'cordova'
		],
		function( $, Cordova ) {
				if ( !Cordova ) {
						return {
								startWatch: function() {
										console.log("Fake startWatch: no cordova");
								},
								stopWatch: function() {
										console.log("Fake stopWatch: no cordova");
								}
						}
				}


				var restartTimemout = 1000,
					shakeThreshold = 30;

				var shake = (function() {
						var shake = {},
							watchId = null,
							options = { frequency: 300 },
							previousAcceleration = { x: null, y: null, z: null },
							shakeCallBack = null;
						
						shake.startWatch = function( onShake ) {
								console.log("Starting shake watch, onShake: " + onShake);
								if (onShake !== null && onShake) {
										shakeCallBack = onShake;
								}
								watchId = navigator.accelerometer.watchAcceleration(
										getAccelerationSnapshot,
										handleError,
										options );

								console.log(shakeCallBack);
						};

						shake.stopWatch = function() {
								if ( watchId !== null ) {
										navigator.accelerometer.clearWatch(watchId);
										watchId = null;
								}
						};

						var getAccelerationSnapshot = function() {
								navigator.accelerometer.getCurrentAcceleration(
												assessCurrentAcceleration,
												handleError );
						};

						var assessCurrentAcceleration = function( acceleration ) {
								var accelerationChange = {};
								if (previousAcceleration.x !== null) {
										accelerationChange.x = Math.abs( acceleration.x - previousAcceleration.x );
										accelerationChange.y = Math.abs( acceleration.y - previousAcceleration.y );
										accelerationChange.z = Math.abs( acceleration.z - previousAcceleration.z );
								}
								if (accelerationChange.x + accelerationChange.y + accelerationChange.z > shakeThreshold) { // shake detected
										console.log("Shaked");
										if (typeof (shakeCallBack) === "function") {
												shakeCallBack();
										}
										shake.stopWatch();
										setTimeout( shake.startWatch, restartTimemout );
										previousAcceleration = {
												x: null,
												y: null,
												z: null
										};
								}
								else {
										previousAcceleration = {
												x: acceleration.x,
												y: acceleration.y,
												z: acceleration.z
										};
								}
						};

						var handleError = function() {
						};

						return shake;
				})();

				return shake;
		}
);
