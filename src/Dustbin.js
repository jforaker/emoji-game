import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Emoji } from 'emoji-mart-lite';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export const Dustbin = (props) => {
  const { connectDropTarget, lastDroppedItem, isDragging } = props;

  return connectDropTarget(
    <span className={`drop-target ${isDragging ? 'isDragging' : ''}`}>
      {lastDroppedItem && <Emoji emoji={lastDroppedItem.name} size={48} />}
    </span>
  );
};

Dustbin.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  lastDroppedItem: PropTypes.object,
  onDrop: PropTypes.func.isRequired,
};

export default DropTarget(
  (props) => props.accepts,
  dustbinTarget,
  collect
)(Dustbin);
