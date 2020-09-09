import React, { Component } from 'react'
import { Menu, Grid, Segment } from 'semantic-ui-react'
import Records from './Records'
import RecordPlayers from './RecordPlayers'
import CD from './Cd'
import Vintage from './Vintage'
import ShoppingCart from './ShoppingCart'
import AdminPanel from './AdminPanel'

export default class MenuExampleInvertedPointing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Records',
      username: this.props.username
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log(this.state.activeItem);
  }

  render() {
    const { activeItem } = this.state
    let isUserAdmin = this.state.username == 'admin'
    let adminPanel = null;
    if (isUserAdmin) {
        adminPanel = <Menu.Item
                  name='Admin Panel'
                  active={activeItem === 'Admin Panel'}
                  onClick={this.handleItemClick}
                /> 
    }
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
              active={activeItem === 'CD'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Vintage'
              active={activeItem === 'Vintage'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Shopping Cart'
              active={activeItem === 'Shopping Cart'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='About Us'
              active={activeItem === 'About Us'}
              onClick={this.handleItemClick}
            />
            {adminPanel}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment style={{'background-color': 'rgba(255,255,255,.8', padding: '1em 11em', 'align-self': 'stretch'}}>
            {this.state.activeItem == 'Records' ? <Records username={this.props.username}/> :
            this.state.activeItem == 'Record Players' ? <RecordPlayers username={this.props.username}/> :
            this.state.activeItem == 'CD' ? <CD username={this.props.username}/> :
            this.state.activeItem == 'Vintage' ? <Vintage  username={this.props.username}/> :
            this.state.activeItem == 'Shopping Cart' ? <ShoppingCart username={this.props.username}/> :
            this.state.activeItem == 'Admin Panel' ? <AdminPanel username={this.props.username}/> : <p>hi</p>
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
