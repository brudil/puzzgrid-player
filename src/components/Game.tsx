import React from "react";
import { cx, css } from 'emotion';
import { includes, without, isEqual, flatMap } from 'lodash-es';
import { Card } from './Card';

const rootStyle = css`
  display: flex;
  flex-wrap: wrap;
`;

interface Group {
  cardIds: number[],
  answerWords: string[],
  explaination: string,
}

interface IProps {
  data: {
    cards: string[],
    groups: Group[]
  };
}

interface IState {
  selectedCardIds: number[],
  incorrectCardIds: number[],
  discoveredGroups: number[],
}

class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedCardIds: [],
      incorrectCardIds: [],
      discoveredGroups: [],
    };
  }

  handleMatch() {
    const { groups } = this.props.data;
    const { selectedCardIds } = this.state;

    if (this.state.selectedCardIds.length >= 4) {
      let matchingGroupIndex: number;
      const hasMatch = groups.some((group: Group, index: number) => {
        if (isEqual([...group.cardIds].sort(), selectedCardIds)) {
          matchingGroupIndex = index;
          return true;
        }

        return false;
      });

      if (hasMatch) {
        this.setState(state => ({ selectedCardIds: [], discoveredGroups: [...state.discoveredGroups, matchingGroupIndex] }))
      } else {
        this.setState({ selectedCardIds: [], incorrectCardIds: selectedCardIds, }, () => {
          setTimeout(() => this.setState({ incorrectCardIds: [] }), 500);
        })
      }
    }
  }

  handleCardSelect(cardId: number) {
    this.setState(state => {
      if (includes(state.selectedCardIds, cardId)) {
        return {
          ...state,
          selectedCardIds: without(state.selectedCardIds, cardId).sort(), 
        }
      } else {
        return {
          ...state,
          selectedCardIds: [...state.selectedCardIds, cardId].sort(), 
        }
      }
    }, this.handleMatch)
  }

  render() {
    if (this.props.data === null) {
      return null;
    }

    const { cards, groups } = this.props.data;
    const { selectedCardIds, incorrectCardIds, discoveredGroups } = this.state;

    const allDiscoveredCardIds: number[] = flatMap(discoveredGroups, groupId => groups[groupId].cardIds);

    return (
      <div className={cx(rootStyle)}>
      {discoveredGroups.map((groupId) => {
        const group = groups[groupId];

        return group.cardIds
          .map((cardId) => (
            <Card
              phrase={cards[cardId]}
              isSelected={includes(selectedCardIds, cardId)}
              isIncorrect={includes(incorrectCardIds, cardId)}
              isDiscovered={true}
              onSelect={this.handleCardSelect.bind(this, cardId)}
            />
          ))
      })}
        {cards.map((card, index) => {
          if (includes(allDiscoveredCardIds, index)) {
            return null;
          }

          return (
            <Card
              phrase={card}
              isSelected={includes(selectedCardIds, index)}
              isIncorrect={includes(incorrectCardIds, index)}
              isDiscovered={false}
              onSelect={this.handleCardSelect.bind(this, index)}
            />
          )
        })}
      </div>
    );
  }
}

export { Game };
