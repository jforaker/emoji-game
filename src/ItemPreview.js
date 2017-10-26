/**
 * Preview when item is dragging
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';
import { Emoji } from 'emoji-mart';

function collect(monitor) {
  let item = monitor.getItem();
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    id: item && item.id,
    name: item && item.name,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

class ItemPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props;
    return {
      transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
    };
  }

  render() {
    const { isDragging, name } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div className="source-preview" style={this.getLayerStyles()}>
        <Emoji emoji={name} size={48}/>
        {/*<span>{name}</span>*/}
      </div>
    );
  }
}

ItemPreview.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  isDragging: PropTypes.bool
};

export default DragLayer(collect)(ItemPreview);