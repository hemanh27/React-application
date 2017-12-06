var React = require('react');

module.exports = Search = React.createClass({

	getInitialState: function(props){

		// Set initial application state using props
		return {
			keyword: ''
		};

	},

	render: function() {
		return (
				<form action='http://localhost:8080/'  method='post'>
					<div className="col-md-2 col-md-offset-1">
						<div className="form-group com-md-3">
							<label className="keyword_label">Pls input keyword: </label>
							<input name="keyword" id="keyword" className="form-control" />
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
					</div>
				</form>
		)
	}
});