var React = require('react');

module.exports = Header = React.createClass({

	render: function()
	{
		return
		(
			  <nav className="navbar navbar-default">
				  <div className="container-fluid">
					  <div className="navbar-header">
						  <a className="navbar-brand" href="/">WebSiteName</a>
					  </div>
					  <ul className="nav navbar-nav">
						  <li>
							<a href="/node" className="btn btn-default navbar-btn login-btn">Node</a>
						  </li>
						  <li>
							<a href="/react" className="btn btn-default navbar-btn login-btn">React</a>
						  </li>
					  </ul>
				  </div>
			  </nav>
		)
	}
});