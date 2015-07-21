// canvas stuff here: http://jsfiddle.net/JMZc5/1/

var React = require('react');
var GubbinsCanvas = require('./gubbins.react.js');
var CanvasStore = require('../stores/CanvasStore.js');
var PhyloReact = require('./phylo.react.js');
var ButtonPanel = require('./ui.react.js');
var Extras = require('./extras.react.js');
var Actions = require('../actions/actions.js')


var Main_React_Element = React.createClass({displayName: "Main_React_Element",
	getInitialState: function() {
		return {canvas_on_off: CanvasStore.getAll()}
	},

	// Invoked once, immediately after the initial rendering
	componentDidMount: function() {
		CanvasStore.addChangeListener(this.blah);
		console.log(this.getDOMNode())

		this.getDOMNode().addEventListener("dragover", function(event) {
		    event.preventDefault();
		}, false);
		this.getDOMNode().addEventListener("drop", function(event) {
		    event.preventDefault();
			var files = event.dataTransfer.files;
			// if files.length>1 then do some carny
			// apply trick to call multiple actions
			Actions.files_dropped(files)
		}, false);
	},

	blah: function() {
		this.setState({canvas_on_off: CanvasStore.getAll()})
	},

	render: function() {
		// which components are live?
		var react_elements = ["div", {className: "main_react_element"}, React.createElement(ButtonPanel, null)];
		if (this.state.canvas_on_off.annotation) {
			react_elements.push( React.createElement(Extras.BlankDivAboveTree, null) );
			react_elements.push( React.createElement(Extras.GenomeAnnotation, null) );
		}
		if (this.state.canvas_on_off.phylo)   { react_elements.push( React.createElement(PhyloReact,null) ) }
 		if (this.state.canvas_on_off.gubbins) { react_elements.push( React.createElement(GubbinsCanvas,null) ) }
		// console.log(react_elements)
		return ( React.createElement.apply(this, react_elements) )
	}
});



module.exports = Main_React_Element;
