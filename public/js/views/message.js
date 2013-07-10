// js/views/message.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/message',
	'text!templates/message.html',
	'api'
	],
	function($, _, Backbone, MessageModel, MessageTemplate, Api)
	{
			var MessageView = Backbone.View.extend({
					model: MessageModel,
//					className: "span10 msg-row msg-left",
					className: "message-left",
//					tagName: 'li',
//					template: _.template('<span class="from"><%= from %></span></br>'
//							+ '<span class="messageBody"><%= body %></span>'),
					template: _.template(MessageTemplate),
					render: function (){
							if ( this.model.attributes.from === Api.username ) { 
									this.className = "message-right";
									this.$el.removeClass('message-left')
										.addClass('message-right');
							}

							this.$el.html( this.template( this.model.attributes ) );
//							this.$el.attr('data-role', 'list-divider')
//								.attr('role', 'heading');
							return this;
					},

					clean: function(){
					}
			});

			return MessageView;
	}
);
