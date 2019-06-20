/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MessageStore from '../../Stores/MessageStore';
import ChatStore from '../../Stores/ChatStore';
import { getOutgoingStatus } from '../../Utils/Message';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import './MessageStatus.css';

class MessageStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        MessageStore.on('updateMessageSendFailed', this.handleUpdateMessageSend);
        MessageStore.on('updateMessageSendSucceeded', this.handleUpdateMessageSend);
        ChatStore.on('updateChatReadOutbox', this.handleUpdateChatReadOutbox);
    }

    componentWillUnmount() {
        MessageStore.removeListener('updateMessageSendFailed', this.handleUpdateMessageSend);
        MessageStore.removeListener('updateMessageSendSucceeded', this.handleUpdateMessageSend);
        ChatStore.removeListener('updateChatReadOutbox', this.handleUpdateChatReadOutbox);
    }

    handleUpdateMessageSend = payload => {
        if (this.props.messageId === payload.old_message_id && payload.message) {
            this.newMessageId = payload.message.id;
            this.forceUpdate();
        }
    };

    handleUpdateChatReadOutbox = payload => {
        if (
            this.props.chatId === payload.chat_id &&
            ((this.props.newMessageId && this.props.newMessageId <= payload.last_read_outbox_message_id) ||
                this.props.messageId <= payload.last_read_outbox_message_id)
        ) {
            this.forceUpdate();
        }
    };

    render() {
        const { chatId, messageId } = this.props;
        const message = MessageStore.get(chatId, messageId);
        const status = getOutgoingStatus(message);

        if (!status) return null;

        let statusIcon = null;
        switch (status) {
            case 'failed':
                statusIcon = <ErrorOutlineIcon fontSize='inherit' color='error' />;
                break;
            case 'pending':
                statusIcon = <ScheduleIcon fontSize='inherit' color='disabled' />;
                break;
            case 'succeeded':
                statusIcon = <DoneIcon fontSize='inherit' color='primary' />;
                break;
            case 'read':
                statusIcon = <DoneAllIcon fontSize='inherit' color='primary' />;
                break;
        }

        return <div className='message-status'>{statusIcon}</div>;
    }
}

export default MessageStatus;
