// js/views/chatroom.js

define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatroom',
		'views/message',
		'models/message',
		'text!templates/chatroom.html',
		'events',
		'api',
		'utils/shake'
	],
	function($, _, Backbone, ChatroomCollection, MessageView, MessageModel, ChatroomTemplate, Events, Api, Shake) {

		var ChatroomView = Backbone.View.extend({
			template: _.template(ChatroomTemplate),
			events: {
					'submit': 'sendMessage',
					'click div.send-btn': 'sendMessage',
					'click button': 'sendMessage',
					'keypress textarea[type=text]': 'submitOnEnter',
			},
			initialize: function(options) {
					this.collection = new ChatroomCollection({ id: options.id });
					console.log(this.collection);
					this.el = options.el || '.ui-content';
					this.collection.fetch({ reset: true });
					this.collection.on('add', this.addOneScroll, this);
					this.collection.on('reset', this.resetEvent, this);
					
					Events.on('message', function (message) {
							console.log("Chatroom got message event, " + message.room_id);
							console.log( message );
							if ( message.room_id && message.room_id === this.collection.id ) {
									this.collection.add( message );
							}
					}, this);

					Shake.startWatch( function() { alert("shaked"); } ); // Test function
			},
			render: function() {
					console.log("Rendering chatroom");
					Events.trigger('changeheader', {
							header: {
									header_title: this.collection.room_name,
									right_button_class: 'back-btn',
									left_button_class: 'people-btn'
							}
					});
					this.$el.html( this.template( { id: this.collection.id } ) );
					this.delegateEvents( this.events );
					this.collection.forEach(this.addOne, this);
					$("html, body").animate({ scrollTop: $(document).height() }, "slow",
									function() { console.log("scrolled"); });
					return this;
			},
			addOne: function(message) {  // TODO: really use 'reset' event upon entering chatroom
					console.log("Add one");
					var attributes = message.attributes;
					if (!(attributes && ((attributes.from && attributes.from !== "")
												   	|| (attributes.body && attributes.body !== "")
												   	|| attributes.timestamp ))) {
								console.log("No attributes or empty field(s)");
								return;
					}
					var messageView = new MessageView({ model: message });
					this.$el.children().first().append(messageView.render().el);
			},
			addOneScroll: function( message ) {
					this.addOne( message );
					$("html, body").animate({ scrollTop: $(document).height() }, "slow",
									function() { console.log("scrolled"); });
			},

			submitOnEnter: function(e) {
					if (e.keyCode != 13) return;
					e.preventDefault();
					this.sendMessage(e);
			},
			sendMessage: function(e) {
					e.preventDefault();
					Events.trigger('sendMessage', {
							'from': Api.username,
							'body': $('textarea[name=body]').val(), 
							'room_id': this.collection.id,
					});
					$('textarea[name=body]').val("");
			},
			resetEvent: function(e) {
					console.log("Chatroom collection reset");
					this.render();
			},
		 	clean: function() {
					this.collection.off(null, null, this);
					this.undelegateEvents();
					Shake.stopWatch();
			}
		});

		return ChatroomView;
	}
      );
