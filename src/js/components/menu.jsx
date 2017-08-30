'use strict';

import React, { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = { visible: false };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        if (!this.state.visible) return null;

        return <div className='menu'>
            <ul className='menu__list'>
                {React.Children.map(this.props.children, Child => {
                    return Child;
                })}
            </ul>
        </div>
    }
}

function MenuItem(props) {
    return <li>
        <button className='menu__item' onClick={props.handler}>{props.title}</button>
    </li>;
}

export { Menu, MenuItem };

export default Menu;
