import React from 'react';

const MenuGroup = ({ children }) => (
    <ul className='menu__group'>
        {React.Children.map(children, (child) => {
            if (child == null) return null;
            if (child.type === 'li' || child.type === 'ul' || child.type.role === 'menuItem') return child;
            return <li>{child}</li>;
        })}
    </ul>
);

export default MenuGroup;
