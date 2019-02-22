import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Game } from './Game';

interface IProps extends RouteComponentProps<{gridId: number}> {

}

interface IState {
  data: any;
  isLoading: boolean;
}

class GridContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://micro-puzzgrid-data-cqj843wdw.now.sh/', {
      method: 'post',
      body: JSON.stringify({
        gridId: this.props.match.params.gridId,
      })
    });

    const data = await response.json();

    this.setState({ data: data, isLoading: false });
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div>
        <h2>Playing grid #{this.props.match.params.gridId}</h2>
        {isLoading ? <h2>Loading</h2> : <Game data={data} />}
      </div>
    );
  }
}

export { GridContainer };
