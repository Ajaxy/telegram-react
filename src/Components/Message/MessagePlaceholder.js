/*
 *  Copyright (c) 2018-present, Alexander Zinchuk
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import './MessagePlaceholder.css';

const MessagePlaceholder = ({ index }) => {
    const titleWidth = `${70 + Math.sin(index) * 10}%`;
    const textWidth = `${90 + Math.cos(index) * 10}%`;

    return (
        <div className='message-placeholder'>
            <div className='message-placeholder-wrapper'>
                <div className='message-placeholder-tile-photo' />
                <div className='message-placeholder-content'>
                    <div className='message-placeholder-title' style={{ width: titleWidth }} />
                    <div className='message-placeholder-text' style={{ width: textWidth }} />
                </div>
            </div>
        </div>
    );
};

MessagePlaceholder.propTypes = {
    index: PropTypes.number.isRequired
};

export default MessagePlaceholder;
