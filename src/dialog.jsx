import React from 'react';
import ReactDOM from 'react-dom';
import WindowListenable from './mixins/window-listenable';
import KeyCode from './utils/key-code';
import Transitions from './styles/transitions';
import StylePropable from './mixins/style-propable';
import FlatButton from './flat-button';
import Overlay from './overlay';
import RenderToLayer from './render-to-layer';
import Paper from './paper';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import warning from 'warning';

import ReactTransitionGroup from 'react-addons-transition-group';

const TransitionItem = React.createClass({
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
      style: {},
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  },

  componentWillAppear(callback) {
    let spacing = this.state.muiTheme.rawTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)',
      },
    });

    setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    });

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450); // matches transition duration
  },

  render() {
    let {
      style,
      ...other,
    } = this.props;

    return <div {...other} style={this.prepareStyles(this.state.style, style)}>
        {this.props.children}
      </div>;
  },
});

const DialogInline = React.createClass({

  mixins: [WindowListenable, StylePropable],

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

  propTypes: {
    actionFocus: React.PropTypes.string,
    actions: React.PropTypes.array,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    bodyStyle: React.PropTypes.object,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    modal: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
    repositionOnUpdate: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.node,
    titleStyle: React.PropTypes.object,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_handleResize',
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      repositionOnUpdate: true,
      open: null,
    };
  },

  componentDidMount() {
    this._positionDialog();
  },

  componentDidUpdate() {
    this._positionDialog();
  },

  getStyles() {
    let spacing = this.state.muiTheme.rawTheme.spacing;

    let main = {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      zIndex: 10,
      top: 0,
      left: -10000,
      width: '100%',
      height: '100%',
      transition: Transitions.easeOut('0ms', 'left', '450ms'),
    };

    let content = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: Transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: 10,
    };

    let body = {
      padding: spacing.desktopGutter,
      overflowY: this.props.autoScrollBodyContent ? 'auto' : 'hidden',
      overflowX: 'hidden',
    };

    let gutter = spacing.desktopGutter + 'px ';
    let title = {
      margin: 0,
      padding: gutter + gutter + '0 ' + gutter,
      color: this.state.muiTheme.rawTheme.palette.textColor,
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: '400',
    };


    if (this.props.open) {
      main = this.mergeStyles(main, {
        left: 0,
        transition: Transitions.easeOut('0ms', 'left', '0ms'),
      });
    }

    return {
      main: this.mergeStyles(main, this.props.style),
      content: this.mergeStyles(content, this.props.contentStyle),
      paper: {
        background: this.state.muiTheme.rawTheme.palette.canvasColor,
      },
      body: this.mergeStyles(body, this.props.bodyStyle),
      title: this.mergeStyles(title, this.props.titleStyle),
    };
  },

  render() {
    let styles = this.getStyles();
    let actions = this._getActionsContainer(this.props.actions);
    let title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 style={this.prepareStyles(styles.title)}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <div ref="container" style={this.prepareStyles(styles.main)}>
        <ReactTransitionGroup component="div" ref="dialogWindow"
          transitionAppear={true} transitionAppearTimeout={450}
          transitionEnter={true} transitionEnterTimeout={450}>
          {this.props.open &&
            <TransitionItem
              className={this.props.contentClassName}
              style={styles.content}>
              <Paper
                style={styles.paper}
                zDepth={4}>
                {title}
                <div ref="dialogContent" style={this.prepareStyles(styles.body)}>
                  {this.props.children}
                </div>
                {actions}
            </Paper>
          </TransitionItem>}
        </ReactTransitionGroup>
        <Overlay
          show={this.props.open}
          onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  _getAction(actionJSON, key) {
    let props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick,
      onTouchTap: () => {
        if (actionJSON.onTouchTap) {
          actionJSON.onTouchTap.call(undefined);
        }
        if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
          this._requestClose(true);
        }
      },
      label: actionJSON.text,
      style: {
        marginRight: 8,
      },
    };

    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }
    if (actionJSON.id) {
      props.id = actionJSON.id;
    }

    return (
      <FlatButton {...props} />
    );
  },

  _getActionsContainer(actions) {
    let actionContainer;
    let actionObjects = [];
    const actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    };

    if (actions.length) {
      for (let i = 0; i < actions.length; i++) {
        let currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        actionObjects.push(currentAction);
      }

      actionContainer = (
        <div style={this.prepareStyles(actionStyle)}>
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  },

  _positionDialog() {
    if (!this.props.open) {
      return;
    }

    let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let container = ReactDOM.findDOMNode(this);
    let dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
    let dialogContent = ReactDOM.findDOMNode(this.refs.dialogContent);
    let minPaddingTop = 16;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    let dialogWindowHeight = dialogWindow.offsetHeight;
    let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

    // Force a height if the dialog is taller than clientHeight
    if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
      let styles = this.getStyles();
      let maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);

      if (this.props.title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
      if (this.props.actions.length) maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;

      dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
    }
  },

  _requestClose(buttonClicked) {

    if (!buttonClicked && this.props.modal) {
      return;
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked);
    }
  },

  _handleOverlayTouchTap() {
    this._requestClose(false);
  },

  _handleWindowKeyUp(event) {
    if (event.keyCode === KeyCode.ESC) {
      this._requestClose(false);
    }
  },

  _handleResize() {
    if (this.props.open) {
      this._positionDialog();
    }
  },

});


const wrapperStyle = {position:'fixed', top:0, left:0, zIndex:20};
const Dialog = React.createClass({

  propTypes: {
    actionFocus: React.PropTypes.string,
    actions: React.PropTypes.array,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    bodyStyle: React.PropTypes.object,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    defaultOpen: React.PropTypes.bool,
    modal: React.PropTypes.bool,
    onDismiss: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    onShow: React.PropTypes.func,
    open: React.PropTypes.bool,
    openImmediately: React.PropTypes.bool,
    repositionOnUpdate: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.node,
    titleStyle: React.PropTypes.object,
  },

  getInitialState() {
    if (process.env.NODE_ENV !== 'production') {
      this._testDeprecations();
    }

    let open = this.props.open;

    if (open === null) {
      open = (this.props.openImmediately || this.props.defaultOpen);
    }

    return {
      open: open,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      open:null,
      defaultOpen:false,
      modal:false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (process.env.NODE_ENV !== 'production') {
      this._testDeprecations();
    }
    if (nextProps.open !== this.props.open) {
      if (nextProps.open && !this.state.open) {
        this._show();
      } else if (!nextProps.open && this.state.open) {
        this._dismiss();
      }
    }
  },

  render() {
    return (
      <RenderToLayer render={this.renderLayer} open={this.state.open} />
    );
  },

  renderLayer() {
    return (
      <div style={wrapperStyle}>
        <DialogInline {...this.props} onRequestClose={this.props.onRequestClose} open={this.state.open} />
      </div>
    );
  },

  _testDeprecations() {
    warning(!this.props.hasOwnProperty('openImmediately'),
      'openImmediately has been deprecated in favor of defaultOpen');

    warning(!(typeof this.props.onShow === 'function'),
      'onShow will be removed in favor of explicitly setting open');

    warning(!(typeof this.props.onDismiss === 'function'),
      'onDismiss will be removed in favor of explicitly setting open and can be replaced by onRequestClose');

  },


  show() {
    warning(false, 'show has been deprecated in favor of explicitly setting the open property.');

    this._show();
  },

  _onShow() {
    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _show() {
    this.setState({
      open: true,
    }, this._onShow);
  },

  dismiss() {
    warning(false, 'dismiss has been deprecated in favor of explicitly setting the open property.');

    this._dismiss();
  },

  _onDismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _dismiss() {
    this.setState({
      open: false,
    }, this._onDismiss);
  },

  layerWillUnmount() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  isOpen() {
    return this.state.openImmediately;
  },

});

export default Dialog;
