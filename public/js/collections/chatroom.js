// js/collections/chatroom.js

define([
	'jquery',
	'backbone',
	'models/message',
	'api',
	'utils/storage',
	'events'
	],
	function($, Backbone, MessageModel, Api, Storage, Events)
	{
			var ChatroomCollection = Backbone.Collection.extend({
					model: MessageModel,

					defaults: {
						to: 2
					},
					// URL here
					url: function() {
							console.log("Calculating url...");
							if (this.timestamp) {
									return this.mainUrl + "/t" + this.timestamp;
							} else {
									return this.mainUrl;
							}
					},

					initialize: function(options) {
							this.id = options.id || 0;
							this.to = (options.to === 0) ? 0 : (options.to || this.to);
							// this.mainUrl = Api.baseUrl + "/api/chatroom/" + this.id;
							Events.on('message', function( message ) {
								if (message && (message.to || message.to === 0) && (message.from || message.from === 0) && message.body) {
									this.add(message);
								}
							}, this);
					},

					changeTarget: function(newId) {
						this.to = newId;
					},
					/*
					parse: function(response){
							console.log("Parsing response");
							console.log(response);
							this.room_name = response.room_name;
							this.timestamp = response.timestamp;
							console.log("Timestamp: " + this.timestamp);
							if (this.timestamp) {
									this.url();
									//console.log(this.url);
							}
							this.num_msgs = response.num_msgs || 0;
							if(response.id && response.id !== this.id)
								console.log("Error: received different room id");
							return response.messages;
					},
					*/
					clean: function() {
						Events.off(null, null, this);
					}
					// TODO local storage for later
					/*
					sync: function(method, collection, options) {
							if ( method === "read" && this.id) {
								var chatroomEntry = Storage.session.getItem("ch" + this.id);
								if ( chatroomEntry ) {
									var i;
									for ( i = 0; i < chatroomEntry.num_msgs; i++ ) {
										if ( !this.get(i) ) {
											this.add( chatroomEntry.messages[i] );
										}
									}
								}
								Backbone.sync(method, collection, options);
							}
//							else if ( method === "
					}
					*/
			});

			return ChatroomCollection;
	}
);
