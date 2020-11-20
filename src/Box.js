import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Emoji } from 'emoji-mart-lite';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  0%, 100% {
    transform: translate(0, 0) ;
  }

  25% {
    transform: translate(0px, -2px);
  }

  75% {
    transform: translate(0px, 2px) ;
  }


`;

// this is the original box
const BoxSource = styled.div`
  border: 1px dashed var(--green-analagous-purp);
  background-color: var(--green-tint);
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: move;
  opacity: 1;
  min-height: 64px;
  ${(props) =>
    props.isDragging &&
    css`
      opacity: 0.5;
      animation: ${rotate};
      animation-duration: 1.5s;
      animation-timing-function: var(--easing);
      animation-delay: 0s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-fill-mode: none;
      animation-play-state: running;
      z-index: 12;
    `}
`;

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

    return connectDragSource(
      <div>
        <BoxSource isDragging={isDragging}>
          {isDropped ? (
            <div className="droppedAndEmpty" />
          ) : (
            <Emoji emoji={name} size={32} />
          )}
        </BoxSource>
      </div>
    );
  }
}

export default DragSource(
  (props) => props.name,
  {
    beginDrag(props) {
      return {
        name: props.name,
        symbol: props.symbol,
      };
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(Box);
