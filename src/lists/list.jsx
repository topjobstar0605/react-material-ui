var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var List = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    secondaryText: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var {
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      padding: '8px 0'
    }, style);

    return (
      <div
        {...other}
        style={mergedStyles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = List;