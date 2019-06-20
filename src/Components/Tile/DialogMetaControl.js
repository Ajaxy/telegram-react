/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { getLastMessageDate, showChatDraft } from '../../Utils/Chat';
import ApplicationStore from '../../Stores/ApplicationStore';
import ChatStore from '../../Stores/ChatStore';
import './DialogMetaControl.css';
import { getOutgoingStatus } from '../../Utils/Message';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

class DialogMetaControl extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.chatId !== this.props.chatId) {
            return true;
        }

        return false;
    }

    componentDidMount() {
        ChatStore.on('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
        ChatStore.on('clientUpdateClearHistory', this.onClientUpdateClearHistory);
        ChatStore.on('updateChatIsMarkedAsUnread', this.onUpdate);
        ChatStore.on('updateChatDraftMessage', this.onUpdate);
        ChatStore.on('updateChatLastMessage', this.onUpdate);
        ChatStore.on('updateChatReadInbox', this.onUpdate);
        ChatStore.on('updateChatReadOutbox', this.onUpdate);
        ChatStore.on('updateChatUnreadMentionCount', this.onUpdate);
        ChatStore.on('updateMessageMentionRead', this.onUpdate);
        ApplicationStore.on('clientUpdateChatId', this.onClientUpdateChatId);
    }

    componentWillUnmount() {
        ChatStore.removeListener('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
        ChatStore.removeListener('clientUpdateClearHistory', this.onClientUpdateClearHistory);
        ChatStore.removeListener('updateChatIsMarkedAsUnread', this.onUpdate);
        ChatStore.removeListener('updateChatDraftMessage', this.onUpdate);
        ChatStore.removeListener('updateChatLastMessage', this.onUpdate);
        ChatStore.removeListener('updateChatReadInbox', this.onUpdate);
        ChatStore.removeListener('updateChatReadOutbox', this.onUpdate);
        ChatStore.removeListener('updateChatUnreadMentionCount', this.onUpdate);
        ChatStore.removeListener('updateMessageMentionRead', this.onUpdate);
        ApplicationStore.removeListener('clientUpdateChatId', this.onClientUpdateChatId);
    }

    onClientUpdateClearHistory = update => {
        const { chatId } = this.props;

        if (chatId === update.chatId) {
            this.clearHistory = update.inProgress;
            this.forceUpdate();
        }
    };

    onFastUpdatingComplete = update => {
        this.forceUpdate();
    };

    onUpdate = update => {
        const { chatId } = this.props;

        if (chatId !== update.chat_id) return;

        this.forceUpdate();
    };

    onClientUpdateChatId = update => {
        const { chatId } = this.props;

        if (chatId === update.previousChatId || chatId === update.nextChatId) {
            this.forceUpdate();
        }
    };

    render() {
        if (this.clearHistory) return null;

        const { chatId } = this.props;

        const chat = ChatStore.get(chatId);
        const date = getLastMessageDate(chat);
        const showDraftChat = showChatDraft(chat.id);
        const status = !showDraftChat && getOutgoingStatus(chat.last_message);
        const currentChatId = ApplicationStore.getChatId();
        const isDialogSelected = currentChatId === chatId;

        let statusIcon = null;
        if (status) {
            switch (status) {
                case 'failed':
                    statusIcon = <ErrorOutlineIcon fontSize='inherit' color={isDialogSelected ? 'inherit' : 'error'} />;
                    break;
                case 'pending':
                    statusIcon = <ScheduleIcon fontSize='inherit' color={isDialogSelected ? 'inherit' : 'disabled'} />;
                    break;
                case 'succeeded':
                    statusIcon = <DoneIcon fontSize='inherit' color={isDialogSelected ? 'inherit' : 'primary'} />;
                    break;
                case 'read':
                    statusIcon = <DoneAllIcon fontSize='inherit' color={isDialogSelected ? 'inherit' : 'primary'} />;
                    break;
            }
        }

        return (
            <>
                {status && <div className='dialog-meta-status'>{statusIcon}</div>}
                {date && <div className='dialog-meta-date'>{date}</div>}
            </>
        );
    }
}

export default DialogMetaControl;
