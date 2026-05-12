const mobilePanelToggle = document.querySelector('.mobile-panel-toggle');
const toolButtons = document.querySelectorAll('.tool-btn');
const contentBlocks = document.querySelectorAll('.content-block');
const sidebarFilterItems = document.querySelectorAll('.subsection-item[data-filter]');

const filterBlocks = (filter) => {
    let firstVisibleBlock = null;

    contentBlocks.forEach((block) => {
        const shouldShow = filter === 'all' || block.dataset.blockType === filter;
        block.classList.toggle('is-hidden', !shouldShow);

        if (shouldShow && !firstVisibleBlock) {
            firstVisibleBlock = block;
        }
    });

    toolButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === filter);
    });

    if (firstVisibleBlock) {
        firstVisibleBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

toolButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterBlocks(button.dataset.filter || 'all');
    });
});

sidebarFilterItems.forEach((item) => {
    const applySidebarFilter = () => {
        filterBlocks(item.dataset.filter || 'all');
    };

    item.addEventListener('click', applySidebarFilter);
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            applySidebarFilter();
        }
    });
});

if (mobilePanelToggle) {
    mobilePanelToggle.addEventListener('click', () => {
        const panelIsOpen = document.body.classList.toggle('panel-open');
        mobilePanelToggle.setAttribute('aria-expanded', String(panelIsOpen));
        mobilePanelToggle.setAttribute('aria-label', panelIsOpen ? 'Ocultar panel' : 'Mostrar panel');
        mobilePanelToggle.textContent = panelIsOpen ? '✕' : '☰';
    });
}

filterBlocks('all');
