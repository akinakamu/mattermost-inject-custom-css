// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {Store, Action} from 'redux';

import type {GlobalState} from '@mattermost/types/store';

import RootStyles from '@/components/root_styles';
import {setupAboutModalNoticeLink} from '@/injectors/about_modal_notice_link';
import manifest from '@/manifest';
import type {PluginRegistry} from '@/types/mattermost-webapp';

export default class Plugin {
    private cleanup?: () => void;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerRootComponent(RootStyles);
        this.cleanup = setupAboutModalNoticeLink();
    }

    public async uninitialize() {
        this.cleanup?.();
    }
}

declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void;
    }
}

window.registerPlugin(manifest.id, new Plugin());
