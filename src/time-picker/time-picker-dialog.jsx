import React from 'react';
import EventListener from 'react-event-listener';
import KeyCode from '../utils/key-code';
import Clock from './clock';
import Dialog from '../dialog';
import FlatButton from '../flat-button';
import getMuiTheme from '../styles/getMuiTheme';

const TimePickerDialog = React.createClass({

  propTypes: {
    autoOk: React.PropTypes.bool,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      open: false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  show() {
    if (this.props.onShow && !this.state.open) this.props.onShow();
    this.setState({
      open: true,
    });
  },

  dismiss() {
    if (this.props.onDismiss && this.state.open) this.props.onDismiss();
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

  render() {
    const {
      initialTime,
      onAccept,
      format,
      autoOk,
      ...other,
    } = this.props;

    const styles = {
      root: {
        fontSize: 14,
        color: this.getTheme().clockColor,
      },
      dialogContent: {
        width: 280,
      },
      body: {
        padding: 0,
      },
    };

    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this.dismiss}
      />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap}
      />,
    ];

    const onClockChangeMinutes = (autoOk === true ? this._handleOKTouchTap : undefined);

    return (
      <Dialog
        {...other}
        ref="dialogWindow"
        style={styles.root}
        bodyStyle={styles.body}
        actions={actions}
        contentStyle={styles.dialogContent}
        repositionOnUpdate={false}
        open={this.state.open}
        onRequestClose={this.dismiss}
      >
        <EventListener elementName="window" onKeyUp={this._handleWindowKeyUp} />
        <Clock
          ref="clock"
          format={format}
          initialTime={initialTime}
          onChangeMinutes={onClockChangeMinutes}
        />
      </Dialog>
    );
  },

});

export default TimePickerDialog;
