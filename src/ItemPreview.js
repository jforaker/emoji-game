/**
 * Preview when item is dragging
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';
import { Emoji } from 'emoji-mart-lite';
import styled from 'styled-components';

const DraggingItemBase = styled.div`
  background: #888888;
  opacity: 0.5;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  transition: none;
  pointer-events: none;
  -webkit-touch-callout: none;
`;

// const PreviewWhileDragging = styled(DraggingItemBase)`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
// `;

const PreviewWhileDragging = styled(DraggingItemBase)(
  ({ sourceOffset, theme }) => {
    // console.log('theme: ', theme);
    // console.log('props: SC ', sourceOffset);
    return {
      // background: props.background,
      height: '50px',
      width: '50px',
      transform: sourceOffset
        ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px) rotate(5deg)`
        : '',
    };
  }
);

function collect(monitor) {
  let item = monitor.getItem();
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    id: item && item.id,
    name: item && item.name,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class ItemPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props;
    return {
      transform: sourceOffset
        ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)`
        : '',
    };
  }

  render() {
    const { isDragging, name } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <PreviewWhileDragging {...this.props}>
        <Emoji emoji={name} size={40} />
      </PreviewWhileDragging>
    );
  }
}

ItemPreview.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  isDragging: PropTypes.bool,
};

export default DragLayer(collect)(ItemPreview);
