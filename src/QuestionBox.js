import styled, { css, keyframes } from 'styled-components';

const flash = keyframes`
50% { 
  background: var(--green-transparent);
} 
`;

const QuestionBox = styled.div`
  background-color: transparent;
  border: 1px solid var(--green-transparent);
  margin: 10px 0;
  padding: 0px 12px 30px 18px;
  transition: var(--transition);
  ${(props) => {
    return (
      props.didDropMyIndex &&
      css`
        animation: ${flash} 1s var(--easing) 0.025s alternate 1 none running;
      `
    );
  }}
`;
// animation: name duration timing-function delay iteration-count direction fill-mode play-state;

export default QuestionBox;
