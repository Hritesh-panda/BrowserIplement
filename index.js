document.addEventListener("DOMContentLoaded", function() {
    const tabContainer = document.querySelector('.tabs');
    const newTabButton = tabContainer.querySelector('.new-tab');
    const tabContent = tabContainer.querySelector('.tab-content');

    let tabCount = 1;

    newTabButton.addEventListener('click', createNewTab);

    function createNewTab() {
        const tabPanel = document.createElement('div');
        tabPanel.classList.add('tab-panel');
        tabPanel.innerHTML = `
            <input type="text" class="url-input" placeholder="Enter URL">
            <button class="go-button">search</button>
            <iframe class="content-frame" src=""></iframe>
        `;
        tabContent.appendChild(tabPanel);

        const newTab = document.createElement('div');
        newTab.classList.add('tab');
        newTab.textContent = `Tab ${tabCount}`;
        newTab.innerHTML += '<span class="close-btn">x</span>';
        tabCount++;

        newTab.addEventListener('click', switchTab);
        tabContainer.querySelector('.tab-bar').insertBefore(newTab, newTabButton);
        switchTab({ target: newTab });
    }

    function switchTab(event) {
        const tabs = tabContainer.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');

        const tabPanels = tabContainer.querySelectorAll('.tab-panel');
        tabPanels.forEach(panel => panel.classList.remove('active'));
        const tabPanel = tabContent.children[Array.from(tabs).indexOf(event.target)];
        tabPanel.classList.add('active');
    }

    tabContent.addEventListener('click', function(event) {
        if (event.target.classList.contains('go-button')) {
            const urlInput = event.target.previousElementSibling;
            const iframe = event.target.nextElementSibling;
            iframe.src = urlInput.value;
        }
    });

    tabContent.addEventListener('keydown', function(event) {
        if (event.target.classList.contains('url-input') && event.key === 'Enter') {
            const urlInput = event.target;
            const iframe = urlInput.nextElementSibling;
            iframe.src = urlInput.value;
        }
    });

    tabContainer.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('tab')) {
          setActiveTab(clickedElement);
        } else if (clickedElement.classList.contains('close-btn')) {
          clickedElement.parentElement.remove();
        }
      });
});
