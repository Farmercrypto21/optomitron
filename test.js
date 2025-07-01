// game.js
const game = document.getElementById('game');
const background = document.getElementById('background');

// Spawn ghosts moving left
function spawnGhost() {
    const ghost = document.createElement('div');
    ghost.className = 'ghost';
    
    // Random Y position (top/bottom variation)
    ghost.style.top = Math.random() * 70 + 15 + '%';
    
    game.appendChild(ghost);
    
    // Move ghost left (from right edge to left edge)
    let posX = window.innerWidth;
    const moveInterval = setInterval(() => {
        posX -= 3; // Speed of movement
        ghost.style.right = (window.innerWidth - posX) + 'px';
        
        // Remove if off-screen left
        if (posX < -60) {
            clearInterval(moveInterval);
            ghost.remove();
        }
    }, 20);
    
    // Click to "attack" (ghost disappears)
    ghost.addEventListener('click', () => {
        ghost.style.opacity = '0';
        setTimeout(() => ghost.remove(), 300);
    });
}

// Spawn a ghost every 2 seconds
setInterval(spawnGhost, 2000);