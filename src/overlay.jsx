import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import Colors from './styles/colors';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';


const Overlay = React.createClass({

  _originalBodyOverflow: '',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
    if (this.props.show !== nextProps.show) {
      this._applyAutoLockScrolling(nextProps);
    }
  },

  propTypes: {
    autoLockScrolling: React.PropTypes.bool,
    show: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    transitionEnabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
      style:{},
    };
  },

  componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
    if (this.props.show) {
      this._applyAutoLockScrolling(this.props);
    }
  },

  componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity(opacity) {
    let overlay = ReactDOM.findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles() {
    let styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
        top: 0,
        left: '-100%',
        opacity: 0,
        backgroundColor: Colors.lightBlack,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // Two ways to promote overlay to its own render layer
        willChange: 'opacity',
        transform: 'translateZ(0)',

        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity'),
      },
      rootWhenShown: {
        left: '0',
        opacity: 1,
        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left') + ',' +
          Transitions.easeOut('400ms', 'opacity'),
      },
    };
    return styles;
  },

  render() {
    let {
      show,
      style,
      ...other,
    } = this.props;

    let styles = this.prepareStyles(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

    return (
      <div {...other} style={styles} />
    );
  },

  _applyAutoLockScrolling(props) {
    if (props.autoLockScrolling) {
      if (props.show) {
        this._preventScrolling();
      } else {
        this._allowScrolling();
      }
    }
  },

  _preventScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },

  _allowScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
  },

});

export default Overlay;
