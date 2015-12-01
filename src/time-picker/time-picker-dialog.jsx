import React from 'react';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';
import KeyCode from '../utils/key-code';
import Clock from './clock';
import Dialog from '../dialog';
import FlatButton from '../flat-button';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const TimePickerDialog = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    autoOk: React.PropTypes.bool,
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
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
      open: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },


  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    let {
      initialTime,
      onAccept,
      format,
      autoOk,
      onShow,
      onDismiss,
      ...other,
    } = this.props;

    let styles = {
      root: {
        fontSize: 14,
        color: this.getTheme().clockColor,
      },
      dialogContent: {
        width: 280,
      },
      body: {
        padding:0,
      },
    };

    let actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.dismiss} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap} />,
    ];

    const onClockChangeMinutes = (autoOk === true ? this._handleOKTouchTap : undefined);

    // Those two properties are deprecated, we will remove them at some point
    if (typeof onDismiss === 'function') {
      other.onDismiss = onDismiss;
    }
    if (typeof onShow === 'function') {
      other.onShow = onShow;
    }

    return (
      <Dialog {...other}
        ref="dialogWindow"
        style={this.mergeAndPrefix(styles.root)}
        bodyStyle={this.mergeAndPrefix(styles.body)}
        actions={actions}
        contentStyle={styles.dialogContent}
        repositionOnUpdate={false}
        open={this.state.open}
        onRequestClose={this.dismiss}>
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime}
          onChangeMinutes={onClockChangeMinutes} />
      </Dialog>
    );
  },

  show() {
    this.setState({
      open: true,
    });
  },

  dismiss() {
    this.setState({
      open: false,
    });
  },

  _handleOKTouchTap() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleWindowKeyUp(event) {
    if (this.state.open) {
      switch (event.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  },

});

export default TimePickerDialog;
