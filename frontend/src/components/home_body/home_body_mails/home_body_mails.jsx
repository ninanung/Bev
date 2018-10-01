import React, { Component } from 'react';
import request from 'request';

import MailItem from './mail_item/mail_item';
import constant from '../../../constant/server_constant';

import './home_body_mails.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        signup_basic: state.signup_basic,
        signup_imap: state.signup_imap,
    }
}

class HomeBodyMails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
        }
    }

    componentWillMount() {
        let mails = [];
        let uri = '';
        const { address } = this.props;
        
        if(address === 'unread') uri = constant.GET_EMAIL_UNSEEN;
        else if(address === 'all') uri = constant.GET_ALL_EMAIL_BY_ID;
        else if(address === 'sent') uri = constant.GET_EMAIL_SENT;
        else uri = constant.GET_ALL_EMAIL_BY_ADDRESS + address;

        const idInfo = {
            id: this.props.signup_basic.id,
        }
        const option = {
            method: 'POST',
            uri: uri,
            json: idInfo,
        }
        request(option, function(err, res, body) {
            if(err) {
                return  alert(err);
            }
            if(body.error) {
                return alert(body.error);
            } else {
                mails = body.mails.slice();
                mails.sort((a, b) => {
                    return a.date - b.date;
                })
            }
        })
        this.setState({
            mails: mails,
        })
    }

    render() {
        return (
            <div className='mails-body'>
                {this.state.mails.map((mail, index) => { //this.state.mails.map((mail, index) => {
                    if(mail.sent) {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={true} mail={mail} index={index} /></div>
                        )
                    } else {
                        return (
                            <div className='mails-div-item' key={index}><MailItem sent={false} mail={mail} index={index} /></div>
                        )
                    }
                })}  
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeBodyMails);