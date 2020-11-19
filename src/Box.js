import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Emoji } from 'emoji-mart-lite';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '0.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      symbol: props.symbol,
    };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.5 : 1; // this is the original box

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        {isDropped ? (
          <div className="droppedAndEmpty" />
        ) : (
          <Emoji emoji={name} size={32} />
        )}
      </div>
    );
  }
}

export default DragSource((props) => props.name, boxSource, collect)(Box);
