import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Emoji } from 'emoji-mart';

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
    // type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        {
          isDropped
            ? <div className="droppedAndEmpty"/>
            : <Emoji emoji={name} size={32}/> //<span>{name}</span>
        }
      </div>,
    );
  }
}

export default DragSource(props => props.name, boxSource, collect)(Box);
