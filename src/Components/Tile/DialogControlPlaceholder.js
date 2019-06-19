/*
 *  Copyright (c) 2018-present, Alexander Zinchuk
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import './DialogControlPlaceholder.css';

const DialogControlPlaceholder = ({ index }) => {
    const titleWidth = `${50 + Math.sin(index) * 10}%`;
    const contentWidth = `${70 + Math.cos(index) * 10}%`;

    return (
        <div className='dialog-placeholder'>
            <div className='dialog-placeholder-wrapper'>
                <div className='dialog-placeholder-chat-tile'>
                    <div className='dialog-placeholder-tile-photo dialog-placeholder-animated-bg' />
                </div>
                <div className='dialog-placeholder-inner-wrapper'>
                    <div className='dialog-placeholder-tile-first-row'>
                        <div
                            className='dialog-placeholder-title dialog-placeholder-animated-bg'
                            style={{ width: titleWidth }}
                        />
                    </div>
                    <div className='dialog-placeholder-tile-second-row'>
                        <div
                            className='dialog-placeholder-content dialog-placeholder-animated-bg'
                            style={{ width: contentWidth }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

DialogControlPlaceholder.propTypes = {
    index: PropTypes.number.isRequired
};

export default DialogControlPlaceholder;
