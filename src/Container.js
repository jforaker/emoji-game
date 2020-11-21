import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import Confetti from 'react-dom-confetti';
import styled, { css } from 'styled-components';
import { typography } from 'styled-system';

import ItemPreview from './ItemPreview';
import Dustbin from './Dustbin';
import Box from './Box';
import QuestionBox from './QuestionBox';
import { one, two } from './questions';

const Text = styled.span`
  ${typography}
  ${(props) =>
    props.mono &&
    css`
      font-family: var(--font-mono);
    `}
`;

const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

const DustbinList = styled(CenterFlex)``;

const EmojiContainer = styled.div`
  overflow: visible;
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const ConfettiContainer = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
`;

const fettiConfig = {
  angle: 90,
  spread: 65,
  startVelocity: 25,
  elementCount: 200,
  decay: 0.95,
};

const initialState = {
  dustbins: one,
  boxes: [
    { name: 'battery', symbol: '🔋' },
    { name: 'house', symbol: '🏠' },
    { name: 'car', symbol: '🚗' },
    { name: 'moon', symbol: '🌖' },
    { name: 'chicken', symbol: '🐔' },
  ],
  droppedBoxNames: [],
};

export const Container = (props) => {
  const [state, setState] = useState(initialState);
  const [isFinished, setIsFinished] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [didDrop, setDidDrop] = useState();
  const { dustbins, boxes, droppedBoxNames } = state;
  const handleDrop = (index, item) => {
    const { name } = item;

    // reject
    if (droppedBoxNames.find((n) => n.name === name)) return;

    setState(
      update(state, {
        dustbins: {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        },
        droppedBoxNames: item
          ? {
              $push: [item],
            }
          : {},
      })
    );

    // exp border animation on drop
    setDidDrop(index);
    let timeout = setTimeout(() => setDidDrop(false), 1500);

    return () => clearTimeout(timeout);
  };

  const isDropped = (box) => !!droppedBoxNames.find((n) => n.name === box);

  useEffect(() => {
    const checkIsFinished = () => droppedBoxNames.length === dustbins.length;
    let timeout;

    if (checkIsFinished()) {
      setIsFinished(true);
      timeout = setTimeout(() => window.alert('You win!!'), 1500);
    }

    return () => clearTimeout(timeout);
  }, [droppedBoxNames.length, dustbins.length]);

  const onDrag = (data) => setIsDragging(data);

  return (
    <main>
      <h3>It's Elon's world, we're just living in it.</h3>
      <DustbinList>
        {dustbins.map(
          ({ accepts, lastDroppedItem, text, textFollow }, index) => (
            <QuestionBox
              as="div"
              key={index}
              didDropMyIndex={didDrop === index}
            >
              <Text mono fontSize={[3, 2, 1]}>
                {text}
              </Text>
              <Dustbin
                isDragging={isDragging}
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
              />
              <Text mono fontSize={[3, 2, 1]}>
                {textFollow}
              </Text>
            </QuestionBox>
          )
        )}
        <ItemPreview onDrag={onDrag} />
      </DustbinList>

      <EmojiContainer>
        {boxes.map((data, index) => (
          <Box isDropped={isDropped(data.name)} key={index} {...data} />
        ))}
      </EmojiContainer>
      <ConfettiContainer>
        <Confetti
          style={{ width: '100%' }}
          active={isFinished}
          config={fettiConfig}
        />
      </ConfettiContainer>
    </main>
  );
};

const WrappedContainer = React.forwardRef((props, ref) => {
  return <Container innerRef={ref} {...props} />;
});

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(
  WrappedContainer
);
