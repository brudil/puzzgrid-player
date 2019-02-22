import React from 'react';
import { cx, css } from 'emotion';

interface IProps {
  phrase: string;
  isSelected: boolean;
  isIncorrect: boolean;
  isDiscovered: boolean;
  onSelect(): void;
}

const rootStyle = css`
  width: 25%;
  font-size: 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const selectedStyle = css`
  background: #f6ef2c;
  box-shadow: 0 6px 12px 0 rgba(40, 40, 40, 0.15);
`;

const incorrectStyle = css`
  background: #f54e2c;
  box-shadow: 0 6px 12px 0 rgba(40, 40, 40, 0.15);
  transition: 600ms background ease;
`;

const discoveredStyle = css`
  background: #56f32c;
  box-shadow: 0 6px 12px 0 rgba(40, 40, 40, 0.15);
  transition: 600ms background ease;
`;

const innerStyle = css`
  padding: 2rem 0;
  text-align: center;
  box-shadow: 0 4px 4px 0 rgba(40, 40, 40, 0.1);
  background: inherit;
  font-size: inherit;
  display: block;
  width: 100%;
  border: 0;

`;


function Card(props: IProps) {
  return (
    <div className={cx(rootStyle)}>
      <button
        className={cx(innerStyle, {
          [selectedStyle]: props.isSelected,
          [incorrectStyle]: props.isIncorrect,
          [discoveredStyle]: props.isDiscovered,
        })}
        onClick={props.onSelect}
        dangerouslySetInnerHTML={{ __html: props.phrase}}
      />
    </div>
  );
}

export { Card };
