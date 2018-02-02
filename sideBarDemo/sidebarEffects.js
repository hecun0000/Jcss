var sidebarEl = document.querySelector(".sidebar");

function fadeIn (e) {
	sidebarEl.className = 'sidebar fullHeight';
	sidebarEl.style.top = '0px';
	sidebarEl.style.left = '0px';
	sidebarEl.classList.add('move_right');
}

function fadeOut (e) {
	sidebarEl.className = 'sidebar fullHeight';
	sidebarEl.style.left = '120px';
	sidebarEl.classList.add('move_left');
}

function fadeInUp(e) {
	sidebarEl.className = 'sidebar fullHeight';
	sidebarEl.style.top = '250px';
	sidebarEl.style.left = '120px';
	sidebarEl.classList.add('move_up');

}

function fadeOutLeft(e) {
	sidebarEl.className = 'sidebar fullHeight';
	sidebarEl.style.top = '0px';
	sidebarEl.style.left = '120px';
	sidebarEl.classList.add('move_left');

}