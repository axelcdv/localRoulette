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
					className: "message-left",
					template: _.template(MessageTemplate),
					render: function (){
							if ( "" + this.model.attributes.from === "" + Api.id ) {
									this.className = "message-right";
									this.$el.removeClass('message-left')
										.addClass('message-right');
							}

							this.$el.html( this.template( this.model.attributes ) );
							return this;
					},

					clean: function(){
					}
			});

			return MessageView;
	}
);
