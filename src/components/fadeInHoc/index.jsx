import React from 'react';
import { checkSmoothScrollSupport } from 'utils';
import './style';

const isSmoothScrollSupported = checkSmoothScrollSupport();
const FADE_TIMEOUT = 400;

function fadeIn(WrappedComponent, shouldAnimateOnUpdate) {
    return class extends React.Component {
        componentRef = React.createRef()

        componentDidMount() {
            this.fadeIn();
            this.scrollIntoView();
        }

        componentDidUpdate(prevProps, prevState) {
            if (shouldAnimateOnUpdate
                && shouldAnimateOnUpdate(prevProps, prevState, this.props, this.state)
            ) {
                this.fadeIn();
                this.scrollIntoView();
            }
        }

        componentWillUnmount() {
            clearTimeout(this.timeoutId);
        }

        fadeIn() {
            this.componentRef.current.classList.add('fade-in-animation');
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.componentRef.current.classList.remove('fade-in-animation');
            }, FADE_TIMEOUT);
        }

        scrollIntoView() {
            if (!isSmoothScrollSupported) return;
            this.componentRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        render() {
            return (
                <div className='animation-container' ref={this.componentRef}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
}

export default fadeIn;
