import React, { Component } from 'react'
import { Menu, Grid, Segment } from 'semantic-ui-react'
import Records from './Records'
import RecordPlayers from './RecordPlayers'

export default class MenuExampleInvertedPointing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Records'
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log(this.state.activeItem);
  }

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid pointing vertical inverted>
            <Menu.Item
              name='Records'
              active={activeItem === 'Records'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Record Players'
              active={activeItem === 'Record Players'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='CD'
              active={activeItem === 'CDs'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Vintage Items'
              active={activeItem === 'Vintage Items'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='My Shopping Cart'
              active={activeItem === 'My Shopping Cart'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='About Us'
              active={activeItem === 'About Us'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment style={{'background-color': 'rgba(255,255,255,.8', padding: '1em 11em', 'align-self': 'stretch'}}>
            {this.state.activeItem == 'Records' ? <Records username={this.props.username}/> : this.state.activeItem == 'Record Players' ? <RecordPlayers/> : <p>hi</p>}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
