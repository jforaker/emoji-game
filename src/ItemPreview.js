/**
 * the little preview while the item is dragging
 */

import React, { useEffect } from 'react';
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

const PreviewWhileDragging = styled(DraggingItemBase)(
  ({ sourceOffset, theme }) => {
    return {
      height: '50px',
      width: '50px',
      transform: sourceOffset
        ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px) rotate(5deg)`
        : '',
    };
  }
);

const collect = (monitor) => {
  const item = monitor.getItem();
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    id: item && item.id,
    name: item && item.name,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
};

const ItemPreview = (props) => {
  const { isDragging, name } = props;

  useEffect(() => {
    props.onDrag(isDragging);
  });

  if (!isDragging) {
    return null;
  }

  return (
    <PreviewWhileDragging {...props}>
      <Emoji emoji={name} size={40} />
    </PreviewWhileDragging>
  );
};

const WrappedItemPreview = React.forwardRef((props, ref) => (
  <ItemPreview innerRef={ref} {...props} />
));

ItemPreview.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  isDragging: PropTypes.bool,
};

export default DragLayer(collect)(WrappedItemPreview);
