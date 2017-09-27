import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Posts = new Mongo.Collection('posts');

Template.body.helpers({
	posts: function() {
		return Posts.find();
	},
});

Template.body.events({
	'submit .new-post': function(event) {
		var title = event.target.title.value;
		var body = event.target.body.value;
		Posts.insert({
			title: title, 
			body: body,
			arrowUp: false,
			date: new Date()
		});
		console.log("added new post");
		event.target.title.value = "";
		event.target.body.value = "";

		return false;
	},
});

Template.post.events({
	'click .arrow-down': function() {
		Posts.update(this._id, {$set: {arrowUp:!this.arrowUp}});
		console.log("updated arrowUp");
	},
	'click .delete': function() {
		Posts.remove(this._id);
		console.log("deleted post ", this._id);
	},
});
