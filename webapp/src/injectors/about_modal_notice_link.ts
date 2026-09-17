// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const CUSTOM_LINK_CLASS = 'custom-about-notice-linkSample';

/**
 * About モーダルのオープンソース通知文末尾にカスタムリンクを挿入する
 */
function injectNoticeLink(): boolean {
    const noticeParagraph = document.querySelector('.about-modal__notice p');
    if (!noticeParagraph) {
        return false;
    }

    if (!noticeParagraph.querySelector(`.${CUSTOM_LINK_CLASS}`)) {
        const container = document.createElement('span');
        container.className = CUSTOM_LINK_CLASS;
        container.style.display = 'block';
        container.style.marginTop = '8px';

        const linkSample = document.createElement('a');
        linkSample.href = 'https://example.com';
        linkSample.target = '_blank';
        linkSample.rel = 'noopener noreferrer';
        linkSample.textContent = 'このリンク';

        const suffixText = document.createTextNode('を確認ください。');

        container.appendChild(linkSample);
        container.appendChild(suffixText);
        noticeParagraph.appendChild(container);
    }

    return true;
}

/**
 * メニューの「#about」クリックを検知し、モーダル描画後にリンクを注入する
 */
export function setupAboutModalNoticeLink(): () => void {
    let timer: ReturnType<typeof setInterval> | null = null;

    const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target?.closest('#about')) {
            return;
        }

        if (timer) {
            clearInterval(timer);
        }

        let attempts = 0;
        timer = setInterval(() => {
            attempts++;
            if (injectNoticeLink() || attempts > 20) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            }
        }, 50);
    };

    document.addEventListener('click', handleClick, true);

    return () => {
        if (timer) {
            clearInterval(timer);
        }
        document.removeEventListener('click', handleClick, true);
    };
}
