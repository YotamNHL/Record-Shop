import React, { Component } from 'react'
import { Menu, Grid, Segment } from 'semantic-ui-react'
import Records from './Records'

export default class MenuExampleInvertedPointing extends Component {
  state = { activeItem: 'Records' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
              name='CDs and DVDs'
              active={activeItem === 'CDs and DVDs'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Retro Items'
              active={activeItem === 'Retro Items'}
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
          <Segment style={{'background-color': 'rgba(255,255,255,.8'}}>
            {this.state.activeItem == 'Records' ? <Records/> : <p>hi</p>}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
