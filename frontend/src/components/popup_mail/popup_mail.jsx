import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './popup_mail.css';

class PopupMail extends Component {
    render() {
        const { mail } = this.props;
        return (
            <div className='popup-body'>
                <div className='popup-inner-body'>
                    <div onClick={this.props.closePopup} className='close-button'>X</div>
                    <h2 className='subject'>subject: {mail.subject}</h2>
                    <h3 className='mailinfo'>date: {new Date(mail.date)}</h3>
                    <h3 className='mailinfo'>from: {mail.from}, name: {mail.name}</h3>
                    {mail.to.map((to, index) => {
                        return <h3 className='mailinfo'>to: {to.address}, name: {to.name}</h3>
                    })}
                    {mail.cc.map((cc, index) => {
                        return <h3 className='mailinfo'>cc: {cc.address}, name: {cc.name}</h3>
                    })}
                    <hr/>
                    {mail.text ? <h3 className='text'>{mail.text}</h3> : null}
                    <hr/>
                    {mail.html ? 
                        <div className='html'>
                            {mail.html}
                        </div> 
                        : null
                    }
                </div>
            </div>
        )
    }
}

PopupMail.propTypes = {
    mail: PropTypes.object,
    closePopup: PropTypes.func,
    onEscClose: PropTypes.func,
}

export default PopupMail