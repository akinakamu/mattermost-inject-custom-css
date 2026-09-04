// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type React from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import type {GlobalState} from '@mattermost/types/store';

import './styles.css';

const RootStyles: React.FC = () => {
    const currentLocale = useSelector((state: GlobalState) => {
        const currentUserId = state.entities?.users?.currentUserId;
        return (currentUserId && state.entities?.users?.profiles?.[currentUserId]?.locale) || 'ja';
    });

    useEffect(() => {
        if (currentLocale) {
            document.documentElement.setAttribute('data-inject-css-locale', currentLocale);
        }
    }, [currentLocale]);

    return null;
};

export default RootStyles;

