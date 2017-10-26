import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import Confetti from 'react-dom-confetti';

import ItemPreview from './ItemPreview';
import Dustbin from './Dustbin';
import Box from './Box';

export class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dustbins: [
        {
          accepts: 'battery',
          text: 'Elon Musk is building the largest ',
          textFollow: ' in Australia.',
          lastDroppedItem: null
        },
        {
          accepts: 'moon',
          text: 'SpaceX plans on colonozing the ',
          textFollow: ' by 2020.',
          lastDroppedItem: null
        },
        {
          accepts: 'car',
          text: 'The Tesla Model 3 ',
          textFollow: ' has over 400,000 preorders.',
          lastDroppedItem: null
        },
      ],
      boxes: [
        { name: 'battery' },
        { name: 'house' },
        { name: 'car' },
        { name: 'moon' },
        { name: 'chicken' },
      ],
      droppedBoxNames: [],
    };
  }

  isDropped(box) {
    return !!this.state.droppedBoxNames.find(n => n.name === box);
  }

  isFinished() {
    return this.state.droppedBoxNames.length === this.state.dustbins.length
  }

  render() {
    const { boxes, dustbins } = this.state;
    const config = {
      angle: 90,
      spread: 35,
      startVelocity: 25,
      elementCount: 200,
      decay: 0.95
    };

    return (
      <main>
        <h3>It's Elon's world, we're just living in it.</h3>
        <div className="dustbin-list">
          {dustbins.map(({ accepts, lastDroppedItem, text, textFollow }, index) =>
            <div key={index} className="question-container">
              <span>{text}</span>
              <Dustbin
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={item => this.handleDrop(index, item)}
              />
              <span>{textFollow}</span>
            </div>
          )}
          <ItemPreview />
        </div>

        <div className="emoji-container">
          {boxes.map(({ name }, index) =>
            <Box
              name={name}
              isDropped={this.isDropped(name)}
              key={index}
            />,
          )}
        </div>
        <div className="confetti">
          <Confetti style={{ width: '100%' }} active={this.isFinished()} config={config}/>
        </div>
      </main>
    );
  }

  handleDrop(index, item) {
    const { name } = item;

    // reject
    if (this.state.droppedBoxNames.find(n => n.name === name)) return;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedBoxNames: item ? {
        $push: [item],
      } : {},
    }));

    if (this.state.droppedBoxNames.length === this.state.dustbins.length) {
      setTimeout(() => window.alert('You win!!'), 1500)
    }
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Container);