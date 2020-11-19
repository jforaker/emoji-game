import React, { Component } from 'react';
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

export class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    // accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
  };

  render() {
    const {
      // accepts,
      // isOver,
      // canDrop,
      connectDropTarget,
      lastDroppedItem,
    } = this.props;
    // const isActive = isOver && canDrop;

    return connectDropTarget(
      <span className="dustbin">
        {lastDroppedItem && <Emoji emoji={lastDroppedItem.name} size={48} />}
      </span>
    );
  }
}

export default DropTarget(
  (props) => props.accepts,
  dustbinTarget,
  collect
)(Dustbin);
