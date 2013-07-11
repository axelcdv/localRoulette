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
					'keypress textarea[type=text]': 'submitOnEnter'
			},
			initialize: function(options) {
					this.collection = new ChatroomCollection({ id: options.id });
					console.log(this.collection);
					this.el = options.el || '.content';
					//this.collection.fetch({ reset: true });
					this.collection.on('add', this.addOneScroll, this);
					this.collection.on('reset', this.resetEvent, this);

					// Trigger new random target when the user shakes
					Shake.startWatch( function() {
							console.log("chatroom: Shaked");
							Events.trigger("shake", this.collection.id, function ( response ) {
								if (response && response.id) {
									this.collection.changeTarget(response.id);
								}
							});
						});

					this.render();
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
					this.$el.css('margin-top', $('.header').height()) // Should use class instead of id
                            .css('margin-bottom', $('.header').height())   // Assuming footer size ~= header size for now
                            .css('padding-top', '0.5%')
                            .css('padding-bottom', '0.5%');
					this.delegateEvents( this.events );
					this.collection.forEach(this.addOne, this);
					$("html, body").animate({ scrollTop: $(document).height() }, "slow",
									function() { console.log("scrolled"); });
					return this;
			},
			addOne: function(message) {  // TODO: really use 'reset' event upon entering chatroom
					console.log("Add one");
					var attributes = message.attributes;
					if (!(attributes && ((attributes.from && attributes.from !== "") ||
												(attributes.body && attributes.body !== "") ||
												attributes.timestamp ))) {
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
					console.log("Will create with: ");
					console.log({
						'from': this.collection.id || 1,
						'to': this.collection.to || 2,
						'body': $('textarea[name=body]').val()
					});
					this.collection.create({
						'from': this.collection.id || 1,
						'to': this.collection.to || 2,
						'body': $('textarea[name=body]').val()
					}, { wait: true });
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
