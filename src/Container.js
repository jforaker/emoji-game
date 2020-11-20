import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import Confetti from 'react-dom-confetti';
import styled from 'styled-components';

import ItemPreview from './ItemPreview';
import Dustbin from './Dustbin';
import Box from './Box';

const Text = styled.span``;

const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

const DustbinList = styled(CenterFlex)``;

const QuestionLine = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--green-transparent);
  margin: 10px 0;
  padding: 8px;
`;

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
  dustbins: [
    {
      accepts: 'battery',
      text: 'Elon Musk is building the largest ',
      textFollow: ' in Australia.',
      lastDroppedItem: null,
    },
    {
      accepts: 'moon',
      text: 'SpaceX plans on colonozing the ',
      textFollow: ' by 2020.',
      lastDroppedItem: null,
    },
    {
      accepts: 'car',
      text: 'The Tesla Model 3 ',
      textFollow: ' has over 400,000 preorders.',
      lastDroppedItem: null,
    },
  ],
  boxes: [
    { name: 'battery', symbol: '🔋' },
    { name: 'house', symbol: '🏠' },
    { name: 'car', symbol: '🚗' },
    { name: 'moon', symbol: '🌖' },
    { name: 'chicken', symbol: '🐔' },
  ],
  droppedBoxNames: [],
};

function Container() {
  const [state, setState] = useState(initialState);
  const [isFinished, setIsFinished] = useState(false);
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
  };

  const isDropped = (box) => !!droppedBoxNames.find((n) => n.name === box);

  useEffect(() => {
    const checkIsFinished = () => droppedBoxNames.length === dustbins.length;

    if (checkIsFinished()) {
      setIsFinished(true);
    }
  }, [droppedBoxNames.length, dustbins.length]);

  useEffect(() => {
    let timeout;
    if (droppedBoxNames.length === dustbins.length) {
      timeout = setTimeout(() => window.alert('You win!!'), 1500);
    }

    return () => clearTimeout(timeout);
  });

  return (
    <main>
      <h3>It's Elon's world, we're just living in it.</h3>
      <DustbinList>
        {dustbins.map(
          ({ accepts, lastDroppedItem, text, textFollow }, index) => (
            <QuestionLine as="div" key={index}>
              <Text>{text}</Text>
              <Dustbin
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
              />
              <Text>{textFollow}</Text>
            </QuestionLine>
          )
        )}
        <ItemPreview />
      </DustbinList>

      <EmojiContainer>
        {boxes.map(({ name, symbol }, index) => (
          <Box
            name={name}
            symbol={symbol}
            isDropped={isDropped(name)}
            key={index}
          />
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
}

const Wrapped = React.forwardRef((props, ref) => (
  <Container innerRef={ref} {...props} />
));

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(
  Wrapped
);
