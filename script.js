// Global timer variables
let missionTimerInterval = null; // Track mission timer
let ghostSpawnInterval = null; // Track ghost spawning

// Equipment data
const equipmentData = {
  'Father Dave Langford': {
    weapons: [
      { name: 'Twin-Edged Crucifix', bonus: '+10% Demon Banish', malus: '-5% Speed', imageId: 'twin-edged-crucifix' },
      { name: 'Incense Cannon', bonus: '+15% Area Effect', malus: '-10% Mobility', imageId: 'incense-cannon' },
      { name: 'Echo Psalm', bonus: '+20% Spirit Damage', malus: 'Unlockable', imageId: 'echo-psalm' },
      { name: 'Unforgiven Hymn', bonus: '+25% Banish Power', malus: 'NFT Required', imageId: 'unforgiven-hymn' }
    ],
    shields: [
      { name: 'Sacred Bell', bonus: '+10% Protection', malus: '-5% Sanity', imageId: 'sacred-bell' },
      { name: 'Cursed Chalice', bonus: '+15% Curse Resistance', malus: '-10% Health', imageId: 'cursed-chalice' },
      { name: 'Oblivion\'s Oculus', bonus: '+20% Vision', malus: 'Unlockable', imageId: 'oblivions-oculus' },
      { name: 'Saintly Crown', bonus: '+25% Holy Defense', malus: 'NFT Required', imageId: 'saintly-crown' }
    ],
    role: 'Exorcist',
    skill: 'Performs holy rites to banish demons',
    imageId: 'exorcist',
    baseStats: {
      health: 100,
      damage: 2,
      defense: 15,
      speed: 5,
      agility: 1,
      critDamage: 2
    }
  },
  'The Blacklisted Inquisitor': {
    weapons: [
      { name: 'Undead Lantern', bonus: '+12% Light Damage', malus: '-8% Sanity', imageId: 'undead-lantern' },
      { name: 'Maw of the Abyss', bonus: '+18% Dark Damage', malus: '-10% Speed', imageId: 'maw-of-the-abyss' },
      { name: 'Librorum Fist', bonus: '+22% Melee Power', malus: 'Unlockable', imageId: 'librorum-fist' },
      { name: 'Pactbreaker', bonus: '+30% Curse Break', malus: 'NFT Required', imageId: 'pactbreaker' }
    ],
    shields: [
      { name: 'Mouthplate', bonus: '+10% Silence Resistance', malus: '-5% Spirit Energy', imageId: 'mouthplate' },
      { name: 'Lamentation', bonus: '+15% Fear Resistance', malus: '-10% Speed', imageId: 'lamentation' },
      { name: 'Black Dagger', bonus: '+20% Stealth', malus: 'Unlockable', imageId: 'black-dagger' },
      { name: 'Duskglass', bonus: '+25% Shadow Defense', malus: 'NFT Required', imageId: 'duskglass' }
    ],
    role: 'Occultist',
    skill: 'Spins Codex to form a burning sigil',
    imageId: 'occultist',
    baseStats: {
      health: 90,
      damage: 3,
      defense: 15,
      speed: 45,
      agility: 10,
      critDamage: 8
    }
  },
  'Vega Overclock Rook': {
    weapons: [
      { name: 'Wraith-Trap Drones', bonus: '+15% Trap Efficiency', malus: '-5% Battery Life', imageId: 'wraith-trap-drones' },
      { name: 'Protonic Blaster', bonus: '+20% Energy Damage', malus: '-10% Accuracy', imageId: 'protonic-blaster' },
      { name: 'Wailer Mine', bonus: '+25% Area Disruption', malus: 'Unlockable', imageId: 'wailer-mine' },
      { name: 'Necro Blaze', bonus: '+30% Fire Damage', malus: 'NFT Required', imageId: 'necro-blaze' }
    ],
    shields: [
      { name: 'Soul Backpack', bonus: '+10% Energy Storage', malus: '-5% Mobility', imageId: 'soul-backpack' },
      { name: 'Apostles USB Drive', bonus: '+15% Tech Resistance', malus: '-10% Sanity', imageId: 'apostles-usb-drive' },
      { name: 'Cloaking Belt', bonus: '+20% Invisibility', malus: 'Unlockable', imageId: 'cloaking-belt' },
      { name: 'Lazarus Pen', bonus: '+25% Revival Chance', malus: 'NFT Required', imageId: 'lazarus-pen' }
    ],
    role: 'Tech Specialist',
    skill: 'Fires proton blasters to create energy bridge',
    imageId: 'specialist',
    baseStats: {
      health: 110,
      damage: 5,
      defense: 15,
      speed: 5,
      agility: 10,
      critDamage: 8
    }
  }
};

// Level data
const levelData = [
  {
    name: 'Haunted Mansion',
    description: 'A decaying estate with lingering spirits.',
    imageId: 'level1',
    backgroundImage: 'haunted',
    enemies: [
      { id: 'portrait-lady', name: 'Portrait Lady', stats: { health: 30, defense: 2, damage: 5, speed: 3, agility: 1, critDamage: 5 } },
      { id: 'ghost-garden', name: 'Ghost Garden', stats: { health: 35, defense: 1, damage: 1, speed: 2, agility: 4, critDamage: 6 } },
      { id: 'hollow-host', name: 'Hollow Host', stats: { health: 45, defense: 3, damage: 7, speed: 1, agility: 0, critDamage: 8 } },
      { id: 'twin-shadows', name: 'Twin Shadows', stats: { health: 50, defense: 1, damage: 4, speed: 4, agility: 4, critDamage: 7 } },
      { id: 'red-gentleman', name: 'Red Gentleman', stats: { health: 40, defense: 2, damage: 6, speed: 3, agility: 3, critDamage: 9 } }
    ],
    rewards: ['0.10-0.50 ECTOS']
  },
  {
    name: 'Cursed Forest',
    description: 'A twisted woodland with ancient entities.',
    imageId: 'level2',
    backgroundImage: 'cursed-forest',
    enemies: [
      { id: 'portrait-lady', name: 'Portrait Lady', stats: { health: 30, defense: 2, damage: 5, speed: 3, agility: 7, critDamage: 5 } },
      { id: 'ghost-garden', name: 'Ghost Garden', stats: { health: 50, defense: 5, damage: 5, speed: 6, agility: 6, critDamage: 4 } },
      { id: 'hollow-host', name: 'Hollow Host', stats: { health: 60, defense: 5, damage: 7, speed: 4, agility: 5, critDamage: 6 } },
      { id: 'twin-shadows', name: 'Twin Shadows', stats: { health: 70, defense: 10, damage: 10, speed: 6, agility: 5, critDamage: 7 } },
      { id: 'red-gentleman', name: 'Red Gentleman', stats: { health: 120, defense: 20, damage: 20, speed: 50, agility: 30, critDamage: 3 } }
    ],
    rewards: ['Spectral Essence', 'Cursed Relic']
  },
  {
    name: 'Haunted Asylum',
    description: 'An abandoned hospital with restless souls.',
    imageId: 'level3',
    backgroundImage: 'haunted-asylum',
    enemies: [
      { id: 'portrait-lady', name: 'Portrait Lady', stats: { health: 30, defense: 2, damage: 5, speed: 3, agility: 7, critDamage: 5 } },
      { id: 'ghost-garden', name: 'Ghost Garden', stats: { health: 50, defense: 5, damage: 5, speed: 6, agility: 6, critDamage: 10 } },
      { id: 'hollow-host', name: 'Hollow Host', stats: { health: 60, defense: 5, damage: 7, speed: 4, agility: 5, critDamage: 6 } },
      { id: 'twin-shadows', name: 'Twin Shadows', stats: { health: 70, defense: 10, damage: 10, speed: 6, agility: 5, critDamage: 7 } },
      { id: 'red-gentleman', name: 'Red Gentleman', stats: { health: 120, defense: 20, damage: 20, speed: 50, agility: 30, critDamage: 3 } }
    ],
    rewards: ['Spectral Essence', 'Cursed Relic']
  }
];

// Player data
const playerData = {
  level: parseInt(localStorage.getItem('playerLevel')) || 1,
  xp: parseInt(localStorage.getItem('playerXP')) || 0,
  ectos: parseInt(localStorage.getItem('ectos-account')) || 0.0,
  xpToNextLevel: level => 150 + (level - 1) * 75 
};

// Selected items for inventory
let selectedHunter = localStorage.getItem('selectedHunter') || null;
let selectedWeapon = localStorage.getItem('selectedWeapon') || null;
let selectedShield = localStorage.getItem('selectedShield') || null;

// DOM elements for mission
const gameElement = document.getElementById('game');

// Append message function (moved to global scope)
function appendMessage(message, type = 'info') {
  const missionLog = document.querySelector('#mission-log .mission-log-content');
  if (!missionLog) {
    console.error('Mission log element not found');
    return;
  }

  const logEntry = document.createElement('p');
  const wrapper = document.createElement('div');
  wrapper.className = 'parallelogram-wrapper';
  const innerText = document.createElement('span');
  innerText.className = 'inner-text';

  let formattedMessage = '';
  if (type === 'attack') formattedMessage += `<span class="attack">${message}</span>`;
  else if (type === 'dodge') formattedMessage += `<span class="dodge">${message}</span>`;
  else if (type === 'damage' || type === 'crit') formattedMessage += message;
  else formattedMessage += message;

  innerText.innerHTML = formattedMessage;
  wrapper.appendChild(innerText);
  logEntry.appendChild(wrapper);
  missionLog.appendChild(logEntry);

  // Force scroll to bottom
  missionLog.scrollTop = missionLog.scrollHeight;
}

// Load images
async function loadImages() {
  let imageData = {};
  try {
    const response = await fetch('images.json');
    if (response.ok) {
      imageData = await response.json();
      window.imageData = imageData; // Store globally
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }

  // Set images for banners and tickers
  document.querySelectorAll('img').forEach(img => {
    const alt = img.alt.toLowerCase();
    let imageId = img.getAttribute('data-image-id');
    if (!imageId) {
      if (alt.includes('banner')) imageId = 'banner';
      else if (alt.includes('ticker')) imageId = 'ticker';
      else if (alt.includes('ghost') && img.classList.contains('ghost-image')) imageId = 'ghost';
    }
    if (imageId && imageData[imageId]) {
      img.src = imageData[imageId];
    }
  });

  return imageData;
}

// Get image source with fallback
function getImageSrc(imageId) {
  const imageData = window.imageData || {};
  const src = imageData[imageId] || `https://cdn.glitch.global/dacc699f-e499-49cc-a99e-62079fdfadf6/${imageId || 'placeholder'}.png`;
  return src;
}

// Populate equipment for inventory
function populateEquipment(hunterName) {
  const weaponsRow = document.getElementById('weapons-row');
  const shieldsRow = document.getElementById('shields-row');
  if (!weaponsRow || !shieldsRow) {
    console.error('Equipment rows not found');
    return;
  }

  weaponsRow.innerHTML = '';
  shieldsRow.innerHTML = '';

  if (!hunterName || !equipmentData[hunterName]) {
    console.warn(`Invalid hunter or equipment data for ${hunterName}`);
    return;
  }

  const hunter = equipmentData[hunterName];

  // Populate weapons
  hunter.weapons.forEach(weapon => {
    const weaponElement = document.createElement('div');
    weaponElement.className = 'item-container';
    weaponElement.innerHTML = `
      <img src="${getImageSrc(weapon.imageId)}" alt="${weapon.name}" class="item-image">
      <p class="item-name">${weapon.name}</p>
      <button class="select-equipment-button" onclick="selectEquipment('weapon', '${weapon.name}')">
        ${selectedWeapon === weapon.name ? 'Selected' : 'Select'}
      </button>
    `;
    weaponsRow.appendChild(weaponElement);
  });

  // Populate shields
  hunter.shields.forEach(shield => {
    const shieldElement = document.createElement('div');
    shieldElement.className = 'item-container';
    shieldElement.innerHTML = `
      <img src="${getImageSrc(shield.imageId)}" alt="${shield.name}" class="item-image">
      <p class="item-name">${shield.name}</p>
      <button class="select-equipment-button" onclick="selectEquipment('shield', '${shield.name}')">
        ${selectedShield === shield.name ? 'Selected' : 'Select'}
      </button>
    `;
    shieldsRow.appendChild(shieldElement);
  });

  updateInventoryUI();
}

// Select character
function selectCharacter(hunterName) {
  console.log(`Selecting hunter: ${hunterName}`);
  if (!equipmentData[hunterName]) {
    console.error('Invalid hunter name:', hunterName);
    return;
  }

  selectedHunter = hunterName;
  selectedWeapon = null;
  selectedShield = null;
  localStorage.setItem('selectedHunter', hunterName);
  localStorage.removeItem('selectedWeapon');
  localStorage.removeItem('selectedShield');

  // Update UI
  document.querySelectorAll('.select-character-button').forEach(button => {
    button.textContent = button.getAttribute('onclick').includes(hunterName) ? 'Selected' : 'Select';
  });

  // Update stats and inventory
  updateHunterStatsDisplay(hunterName);
  populateEquipment(hunterName);
  updateInventoryUI();
  updateConfirmButton();
}

// Function to update hunter stats display
function updateHunterStatsDisplay(hunterName) {
  console.group(`Updating stats display for hunter: ${hunterName}`);

  // Validate hunter data
  const hunterData = equipmentData[hunterName];
  if (!hunterData) {
    console.error(`No hunter data found for ${hunterName}. Available hunters:`, Object.keys(equipmentData));
    console.groupEnd();
    return;
  }
  console.log('Hunter Data:', {
    name: hunterName,
    role: hunterData.role,
    baseStats: hunterData.baseStats,
    weapons: hunterData.weapons.map(w => w.name),
    shields: hunterData.shields.map(s => s.name)
  });

  // Get selected weapon and shield
  const weaponName = selectedWeapon || hunterData.weapons[0]?.name || 'None';
  const shieldName = selectedShield || hunterData.shields[0]?.name || 'None';
  const weaponData = hunterData.weapons.find(w => w.name === weaponName) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };
  const shieldData = hunterData.shields.find(s => s.name === shieldName) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };

  console.log('Selected Weapon:', { name: weaponName, bonus: weaponData.bonus, malus: weaponData.malus, imageId: weaponData.imageId });
  console.log('Selected Shield:', { name: shieldName, bonus: shieldData.bonus, malus: shieldData.malus, imageId: shieldData.imageId });

  // Calculate stats
  console.log('Calculating stats with getHunterStats...');
  const hunterStats = getHunterStats(hunterData, weaponData, shieldData);
  console.log('Calculated Stats:', hunterStats);

  // Update stats table
  try {
    document.getElementById('stat-health').textContent = hunterStats.health;
    document.getElementById('stat-defense').textContent = hunterStats.defense;
    document.getElementById('stat-speed').textContent = hunterStats.speed;
    document.getElementById('stat-dodge').textContent = `${Math.round(hunterStats.agility * 2)}%`;
    document.getElementById('stat-damage').textContent = hunterStats.damage;
    document.getElementById('stat-crit-damage').textContent = hunterStats.critDamage;
    document.getElementById('stat-crit-chance').textContent = `${Math.round(hunterStats.critDamage * 2)}%`;
    console.log('Stats table updated with values:', {
      health: hunterStats.health,
      defense: hunterStats.defense,
      speed: hunterStats.speed,
      dodge: `${Math.round(hunterStats.agility * 2)}%`,
      damage: hunterStats.damage,
      critDamage: hunterStats.critDamage,
      critChance: `${Math.round(hunterStats.critDamage * 2)}%`
    });
  } catch (error) {
    console.error('Error updating stats table:', error);
  }

  // Update hunter image
  const hunterImage = document.getElementById('hunter-image');
  if (hunterImage && hunterData.imageId) {
    hunterImage.src = getImageSrc(hunterData.imageId);
    console.log('Hunter image updated:', hunterImage.src);
  } else {
    console.warn('Hunter image element or imageId missing:', { hunterImage: !!hunterImage, imageId: hunterData.imageId });
  }

   // Update bonus/malus section
  const bonusMalusContainer = document.querySelector('#bonus-malus div');
  if (bonusMalusContainer) {
    // Add bonus-malus-content class if missing
    bonusMalusContainer.classList.add('bonus-malus-content');
    bonusMalusContainer.innerHTML = `
      <div class="equipment-effect weapon-effect">
      <p><strong>Weapon</strong></p>
        <img class="equipment-image" src="${getImageSrc(weaponData.imageId)}" alt="${weaponName}">
        <div class="effect-details">
          <p>${weaponName}</p>
          <p><span class="bonus">Bonus: ${weaponData.bonus}</span></p>
          <p><span class="malus">Malus: ${weaponData.malus}</span></p>
        </div>
      </div>
      <div class="equipment-effect shield-effect">
        <img class="equipment-image" src="${getImageSrc(shieldData.imageId)}" alt="${shieldName}">
        <div class="effect-details">
          <p><strong>Shield:</strong> ${shieldName}</p>
          <p><span class="bonus">Bonus: ${shieldData.bonus}</span></p>
          <p><span class="malus">Malus: ${shieldData.malus}</span></p>
        </div>
      </div>
    `;
    console.log('Bonus/Malus section updated:', {
      weapon: { name: weaponName, image: getImageSrc(weaponData.imageId), bonus: weaponData.bonus, malus: weaponData.malus },
      shield: { name: shieldName, image: getImageSrc(shieldData.imageId), bonus: shieldData.bonus, malus: shieldData.malus }
    });
  } else {
    console.warn('Bonus/Malus container not found.');
  }

  console.groupEnd();
}

// Calculate hunter stats
function getHunterStats(hunterData, weaponData, shieldData) {
  console.group('Calculating stats in getHunterStats');

  console.log('Player Level:', playerData.level);
  const baseStats = {
    health: 100 + (playerData.level - 1) * 10,
    damage: 5 + (playerData.level - 1) * 5,
    defense: 2 + Math.floor(playerData.level / 5),
    speed: 50 + (playerData.level - 1) * 2,
    agility: 5 + Math.floor(playerData.level / 3),
    critDamage: 5 + Math.floor(playerData.level / 4)
  };
  console.log('Initial Base Stats (from player level):', baseStats);

  console.log('Applying role modifiers for:', hunterData.role);
  if (hunterData.role === 'Exorcist') {
    baseStats.damage *= 1.2;
    baseStats.defense *= 1.1;
    console.log('Exorcist modifiers applied: +20% damage, +10% defense');
  } else if (hunterData.role === 'Occultist') {
    baseStats.agility *= 1.2;
    baseStats.critDamage *= 1.15;
    console.log('Occultist modifiers applied: +20% agility, +15% critDamage');
  } else if (hunterData.role === 'Tech Specialist') {
    baseStats.speed *= 1.2;
    baseStats.damage *= 1.1;
    console.log('Tech Specialist modifiers applied: +20% speed, +10% damage');
  }
  console.log('Stats after role modifiers:', baseStats);

  console.log('Applying weapon effects:', { bonus: weaponData.bonus, malus: weaponData.malus });
  baseStats.damage *= 1 + parseEquipmentEffect(weaponData.bonus, 'damage');
  console.log(`Weapon bonus (${weaponData.bonus}) applied to damage:`, baseStats.damage);
  baseStats.speed *= 1 + parseEquipmentEffect(weaponData.malus, 'speed');
  console.log(`Weapon malus (${weaponData.malus}) applied to speed:`, baseStats.speed);
  baseStats.agility *= 1 + parseEquipmentEffect(weaponData.bonus, 'agility');
  console.log(`Weapon bonus (${weaponData.bonus}) applied to agility:`, baseStats.agility);
  baseStats.health *= 1 + parseEquipmentEffect(weaponData.malus, 'health');
  console.log(`Weapon malus (${weaponData.malus}) applied to health:`, baseStats.health);
  baseStats.critDamage *= 1 + parseEquipmentEffect(weaponData.bonus, 'critDamage');
  console.log(`Weapon bonus (${weaponData.bonus}) applied to critDamage:`, baseStats.critDamage);

  console.log('Applying shield effects:', { bonus: shieldData.bonus, malus: shieldData.malus });
  baseStats.defense *= 1 + parseEquipmentEffect(shieldData.bonus, 'defense');
  console.log(`Shield bonus (${shieldData.bonus}) applied to defense:`, baseStats.defense);
  baseStats.health *= 1 + parseEquipmentEffect(shieldData.malus, 'health');
  console.log(`Shield malus (${shieldData.malus}) applied to health:`, baseStats.health);
  baseStats.speed *= 1 + parseEquipmentEffect(shieldData.malus, 'speed');
  console.log(`Shield malus (${shieldData.malus}) applied to speed:`, baseStats.speed);
  baseStats.agility *= 1 + parseEquipmentEffect(shieldData.bonus, 'agility');
  console.log(`Shield bonus (${shieldData.bonus}) applied to agility:`, baseStats.agility);

  console.log('Stats before rounding and clamping:', baseStats);
  Object.keys(baseStats).forEach(stat => baseStats[stat] = Math.max(0, Math.round(baseStats[stat])));
  console.log('Final Stats (rounded, non-negative):', baseStats);

  console.groupEnd();
  return baseStats;
}

// Select equipment
function selectEquipment(type, name) {
  console.log(`Selecting ${type}: ${name}`);
  if (type === 'weapon') {
    selectedWeapon = selectedWeapon === name ? null : name;
    localStorage.setItem('selectedWeapon', selectedWeapon || '');
  } else if (type === 'shield') {
    selectedShield = selectedShield === name ? null : name;
    localStorage.setItem('selectedShield', selectedShield || '');
  }

  document.querySelectorAll(`#${type}s-row .select-equipment-button`).forEach(button => {
    const buttonName = button.getAttribute('onclick').match(/'([^']+)'/)[1];
    button.textContent = (type === 'weapon' ? selectedWeapon : selectedShield) === buttonName ? 'Selected' : 'Select';
  });

  updateHunterStatsDisplay(selectedHunter);
  updateInventoryUI();
  updateConfirmButton();
}

// Update inventory UI
function updateInventoryUI() {
  const hunterDetails = document.getElementById('hunter-details');
  const selectedHunterName = document.getElementById('selected-hunter-name');
  const selectedWeaponName = document.getElementById('selected-weapon-name');
  const selectedShieldName = document.getElementById('selected-shield-name');
  const weaponIcon = document.getElementById('weapon-icon');
  const shieldIcon = document.getElementById('shield-icon');
  const weaponBonus = document.getElementById('weapon-bonus');
  const weaponMalus = document.getElementById('weapon-malus');
  const shieldBonus = document.getElementById('shield-bonus');
  const shieldMalus = document.getElementById('shield-malus');

  if (!hunterDetails || !selectedHunterName || !selectedWeaponName || !selectedShieldName || !weaponIcon || !shieldIcon || !weaponBonus || !weaponMalus || !shieldBonus || !shieldMalus) {
    console.error('Equipment detail elements not found:', {
      hunterDetails: !!hunterDetails,
      selectedHunterName: !!selectedHunterName,
      selectedWeaponName: !!selectedWeaponName,
      selectedShieldName: !!selectedShieldName,
      weaponIcon: !!weaponIcon,
      shieldIcon: !!shieldIcon,
      weaponBonus: !!weaponBonus,
      weaponMalus: !!weaponMalus,
      shieldBonus: !!shieldBonus,
      shieldMalus: !!shieldMalus
    });
    return;
  }

  // Update selected names
  selectedHunterName.textContent = selectedHunter || 'None';
  selectedWeaponName.textContent = selectedWeapon || 'None';
  selectedShieldName.textContent = selectedShield || 'None';

  // Update equipment icons and effects
  if (selectedHunter) {
    const hunterData = equipmentData[selectedHunter];
    const weaponData = hunterData.weapons.find(w => w.name === selectedWeapon) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };
    const shieldData = hunterData.shields.find(s => s.name === selectedShield) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };

    weaponIcon.src = getImageSrc(weaponData.imageId);
    weaponIcon.alt = selectedWeapon || 'None';
    shieldIcon.src = getImageSrc(shieldData.imageId);
    shieldIcon.alt = selectedShield || 'None';
    weaponBonus.textContent = weaponData.bonus;
    weaponMalus.textContent = weaponData.malus;
    shieldBonus.textContent = shieldData.bonus;
    shieldMalus.textContent = shieldData.malus;

    updateHunterStatsDisplay(selectedHunter);
  } else {
    // Reset stats and images if no hunter is selected
    document.getElementById('stat-health').textContent = '100';
    document.getElementById('stat-defense').textContent = '0';
    document.getElementById('stat-speed').textContent = '0';
    document.getElementById('stat-dodge').textContent = '0%';
    document.getElementById('stat-damage').textContent = '0';
    document.getElementById('stat-crit-damage').textContent = '0';
    document.getElementById('stat-crit-chance').textContent = '0%';
    const hunterImage = document.getElementById('hunter-image');
    if (hunterImage) {
      hunterImage.src = getImageSrc('placeholder');
    }
    weaponIcon.src = getImageSrc('placeholder');
    shieldIcon.src = getImageSrc('placeholder');
    weaponBonus.textContent = 'N/A';
    weaponMalus.textContent = 'N/A';
    shieldBonus.textContent = 'N/A';
    shieldMalus.textContent = 'N/A';
    const bonusMalusContainer = document.querySelector('#bonus-malus div');
    if (bonusMalusContainer) {
      bonusMalusContainer.innerHTML = '<p>No equipment selected</p>';
    }
  }
}

// Update confirm button
function updateConfirmButton() {
  const confirmButton = document.getElementById('confirm-selection-button');
  if (confirmButton) {
    confirmButton.disabled = !(selectedHunter && selectedWeapon && selectedShield);
  }
}

// Confirm selection
function confirmSelection() {
  if (selectedHunter && selectedWeapon && selectedShield) {
    localStorage.setItem('selectedHunter', selectedHunter);
    localStorage.setItem('selectedWeapon', selectedWeapon);
    localStorage.setItem('selectedShield', selectedShield);
    window.location.href = 'map.html';
  } else {
    alert('Please select a hunter, weapon, and shield.');
  }
}

// Spawn ghosts (for pursuit.html)
function spawnGhost() {
  if (!gameElement) return;
  const ghost = document.createElement('div');
  ghost.className = 'ghost';
  ghost.style.top = '50%';
  ghost.style.left = '50%';
  ghost.style.transform = 'translate(-50%, -50%)';
  gameElement.appendChild(ghost);

  let posX = window.innerWidth / 2;
  const moveInterval = setInterval(() => {
    posX -= 3;
    ghost.style.left = `${posX}px`;
    if (posX < -60) {
      clearInterval(moveInterval);
      ghost.remove();
    }
  }, 20);

  ghost.addEventListener('click', () => {
    ghost.style.opacity = '0';
    setTimeout(() => ghost.remove(), 300);
    const missionLog = document.querySelector('#mission-log .mission-log-content');
    if (missionLog) {
      missionLog.innerHTML += `<p>You banished a ghost!</p>`;
      missionLog.scrollBottom = missionLog.scrollHeight;
    }
  });
}

// Control ghost spawning
function startGhostSpawning() {
  if (ghostSpawnInterval) clearInterval(ghostSpawnInterval);
  ghostSpawnInterval = setInterval(spawnGhost, 2000);
}

function stopGhostSpawning() {
  if (ghostSpawnInterval) clearInterval(ghostSpawnInterval);
  document.querySelectorAll('.ghost').forEach(ghost => ghost.remove());
}

// Save player data
function savePlayerData() {
  localStorage.setItem('playerLevel', playerData.level);
  localStorage.setItem('playerXP', playerData.xp);
  localStorage.setItem('ectos-account', playerData.ectos.toFixed(2)); // Save as string with 2 decimals
}

// Handle level-up
function checkLevelUp() {
  let xpNeeded = playerData.xpToNextLevel(playerData.level);
  while (playerData.xp >= xpNeeded && playerData.level < 50) {
    playerData.level++;
    playerData.xp -= xpNeeded;
    xpNeeded = playerData.xpToNextLevel(playerData.level);
    const missionLog = document.querySelector('#mission-log .mission-log-content');
    if (missionLog) {
      missionLog.innerHTML += `<p>Level Up! Reached Level ${playerData.level}!</p>`;
      missionLog.scrollBottom = missionLog.scrollHeight;
    }
    savePlayerData();
  }
  updatePlayerUI();
}

// Update player UI
function updatePlayerUI() {
  const levelDisplay = document.getElementById('player-level');
  const xpBarFill = document.getElementById('xp-bar-fill');
  const xpText = document.getElementById('xp-text');
  const ectosDisplay = document.getElementById('ectos-account'); // Add ectos display

  if (levelDisplay) levelDisplay.textContent = `Level: ${playerData.level}`;
  if (xpBarFill && xpText) {
    const xpNeeded = playerData.xpToNextLevel(playerData.level);
    const xpPercentage = Math.min(100, (playerData.xp / xpNeeded) * 100);
    xpBarFill.style.width = `${xpPercentage}%`;
    xpText.textContent = `${playerData.xp}/${xpNeeded} XP`;
  }
  if (ectosDisplay) ectosDisplay.textContent = `${playerData.ectos.toFixed(2)} `;
}

// Populate mission details
function populateMissionDetails(imageData) {
  const levelName = localStorage.getItem('selectedLevel') || 'Haunted Mansion';
  const hunterName = localStorage.getItem('selectedHunter') || 'Father Dave Langford';
  const weaponName = localStorage.getItem('selectedWeapon') || 'None';
  const shieldName = localStorage.getItem('selectedShield') || 'None';
  const level = levelData.find(l => l.name === levelName) || levelData[0];
  const hunterData = equipmentData[hunterName];
  const weaponData = hunterData.weapons.find(w => w.name === weaponName) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };
  const shieldData = hunterData.shields.find(s => s.name === shieldName) || { bonus: 'N/A', malus: 'N/A', imageId: 'placeholder' };

  // Update level details
  document.getElementById('level-name').textContent = level.name;
  document.getElementById('level-description').textContent = level.description;
  document.getElementById('enemies-container2').innerHTML = level.enemies.map(enemy => `
    <div class="enemy-item2">
      ${imageData[enemy.id] ? `<img src="${imageData[enemy.id]}" alt="${enemy.name}" class="enemy-image2">` : ''}
    </div>
  `).join('');

  // Update hunter image
  const hunterImage = document.getElementById('hunter-image');
  if (hunterData && imageData[hunterData.imageId]) hunterImage.src = imageData[hunterData.imageId];

 // Update weapon and shield details in bonus-malus section
  const weaponIcon = document.getElementById('weapon-icon');
  const weaponBonus = document.querySelector('.weapon-effect .bonus');
  const weaponMalus = document.querySelector('.weapon-effect .malus');
  const shieldIcon = document.getElementById('shield-icon');
  const shieldBonus = document.querySelector('.shield-effect .bonus');
  const shieldMalus = document.querySelector('.shield-effect .malus');
  const weaponNameElement = document.querySelector('.weapon-effect p strong');
  const shieldNameElement = document.querySelector('.shield-effect p strong');

  if (weaponIcon && weaponBonus && weaponMalus && weaponNameElement) {
    weaponIcon.src = getImageSrc(weaponData.imageId);
    weaponIcon.alt = weaponName;
    weaponBonus.textContent = `Bonus: ${weaponData.bonus}`;
    weaponMalus.textContent = `Malus: ${weaponData.malus}`;
    weaponNameElement.nextSibling.textContent = ` ${weaponName}`; // Append name after "Weapon:"
  }

  if (shieldIcon && shieldBonus && shieldMalus && shieldNameElement) {
    shieldIcon.src = getImageSrc(shieldData.imageId);
    shieldIcon.alt = shieldName;
    shieldBonus.textContent = `Bonus: ${shieldData.bonus}`;
    shieldMalus.textContent = `Malus: ${shieldData.malus}`;
    shieldNameElement.nextSibling.textContent = ` ${shieldName}`; // Append name after "Shield:"
  }

  // Set background image
  const background = document.getElementById('background');
  if (background) {
    const bgImageId = level.backgroundImage || 'haunted';
    background.style.backgroundImage = `url('${imageData[bgImageId] || 'https://cdn.glitch.global/dacc699f-e499-49cc-a99e-62079fdfadf6/background-test.png?v=1749125042493'}')`;
  }

  // Set mission hunter image
  const missionHunterImage = document.getElementById('mission-hunter-image');
  if (missionHunterImage) {
    const hunterImages = {
      'Father Dave Langford': imageData['exorcist'],
      'The Blacklisted Inquisitor': imageData['occultist'],
      'Vega Overclock Rook': imageData['specialist'],
      'default': imageData['exorcist']
    };
    missionHunterImage.src = hunterImages[hunterName] || imageData['exorcist'];
  }
}

// Parse equipment effects
function parseEquipmentEffect(effect, statType) {
  if (!effect || effect.includes('Unlockable') || effect.includes('NFT Required')) return 0;
  const match = effect.match(/([+-]?\d+)%\s*([\w\s]+)/);
  if (!match) return 0;
  const value = parseInt(match[1]) / 100;
  const type = match[2].toLowerCase();

  if (statType === 'damage' && type.match(/damage|banish|power|disruption/)) return value;
  if (statType === 'defense' && type.match(/defense|protection|resistance/)) return value;
  if (statType === 'speed' && type.match(/speed|mobility/)) return value;
  if (statType === 'agility' && type.match(/stealth|invisibility|vision/)) return value;
  if (statType === 'health' && type.match(/health|sanity|energy/)) return value;
  if (statType === 'critDamage' && type.match(/trap|break/)) return value;
  return 0;
}

// Calculate hunter stats
function getHunterStats(hunterData, weaponData, shieldData) {
  const baseStats = {
    health: 100 + (playerData.level - 1) * 10,
    damage: 5 + (playerData.level - 1) * 5,
    defense: 2 + Math.floor(playerData.level / 5),
    speed: 50 + (playerData.level - 1) * 2,
    agility: 5 + Math.floor(playerData.level / 3),
    critDamage: 5 + Math.floor(playerData.level / 4)
  };

  if (hunterData.role === 'Exorcist') {
    baseStats.damage *= 1.2;
    baseStats.defense *= 1.1;
  } else if (hunterData.role === 'Occultist') {
    baseStats.agility *= 1.2;
    baseStats.critDamage *= 1.15;
  } else if (hunterData.role === 'Tech Specialist') {
    baseStats.speed *= 1.2;
    baseStats.damage *= 1.1;
  }

  baseStats.damage *= 1 + parseEquipmentEffect(weaponData.bonus, 'damage');
  baseStats.speed *= 1 + parseEquipmentEffect(weaponData.malus, 'speed');
  baseStats.agility *= 1 + parseEquipmentEffect(weaponData.bonus, 'agility');
  baseStats.health *= 1 + parseEquipmentEffect(weaponData.malus, 'health');
  baseStats.critDamage *= 1 + parseEquipmentEffect(weaponData.bonus, 'critDamage');

  baseStats.defense *= 1 + parseEquipmentEffect(shieldData.bonus, 'defense');
  baseStats.health *= 1 + parseEquipmentEffect(shieldData.malus, 'health');
  baseStats.speed *= 1 + parseEquipmentEffect(shieldData.malus, 'speed');
  baseStats.agility *= 1 + parseEquipmentEffect(shieldData.bonus, 'agility');

  Object.keys(baseStats).forEach(stat => baseStats[stat] = Math.max(0, Math.round(baseStats[stat])));
  return baseStats;
}

// Determine turn order
function determineTurnOrder(hunterStats, enemyStats) {
  return hunterStats.speed >= enemyStats.speed ? ['hunter', 'enemy'] : ['enemy', 'hunter'];
}

// Calculate attack outcome
function calculateAttack(attackerStats, defenderStats, attackerName, defenderName) {
  const dodgeChance = defenderStats.agility * 0.02;
  if (Math.random() < dodgeChance) {
    return { type: 'dodge', message: `${defenderName} dodges!`, damage: 0, isCrit: false };
  }

  const critChance = attackerStats.critDamage * 0.02;
  const isCrit = Math.random() < critChance;
  let damage = attackerStats.damage - defenderStats.defense;
  if (isCrit) damage *= 2;

  damage = Math.max(1, Math.round(damage));
  defenderStats.health = Math.max(0, defenderStats.health - damage);

  return {
    type: 'attack',
    message: `${attackerName} deals <span class="damage">${damage} damage!</span>`,
    damage,
    isCrit
  };
}

// Enemy pool
const enemyPool = (() => {
  const uniqueEnemies = [];
  const seenIds = new Set();
  levelData.forEach(level => {
    level.enemies.forEach(enemy => {
      if (!seenIds.has(enemy.id)) {
        seenIds.add(enemy.id);
        uniqueEnemies.push(enemy);
      }
    });
  });
  return uniqueEnemies;
})();

// Get random enemies
function getRandomEnemies(num = 5) {
  return [...enemyPool].sort(() => Math.random() - 0.5).slice(0, Math.min(num, enemyPool.length));
}

// XP multiplier
function getLevelXPMultiplier(levelName) {
  const multipliers = {
    'Haunted Mansion': 0.5,
    'Cursed Forest': 0.75,
    'Haunted Asylum': 1
  };
  return multipliers[levelName] || 1.25;
}

// Start mission
function startMission() {
  const missionHunterImage = document.getElementById('mission-hunter-image');
  if (missionHunterImage) {
    missionHunterImage.style.display = 'block';
    missionHunterImage.classList.add('hunter-slide-in');
  }

  const missionLog = document.querySelector('#mission-log .mission-log-content');
  const healthBar = document.querySelector('.health-bar-fill');
  const healthText = document.querySelector('.health-text');
  const timerDisplay = document.getElementById('mission-timer');
  const recoveryTimer = document.getElementById('recovery-timer');
  const statHealth = document.getElementById('stat-health');
  const startButton = document.getElementById('start-mission-button');
  const stopButton = document.getElementById('stop-mission-button');
  const rewardsContent = document.getElementById('rewards-content');

  if (!missionLog || !healthBar || !healthText || !timerDisplay || !recoveryTimer || !statHealth || !startButton || !stopButton || !rewardsContent) {
    console.error('Missing required elements:', {
      missionLog: !missionLog ? 'Missing' : 'Found',
      healthBar: !healthBar ? 'Missing' : 'Found',
      healthText: !healthText ? 'Missing' : 'Found',
      timerDisplay: !timerDisplay ? 'Missing' : 'Found',
      recoveryTimer: !recoveryTimer ? 'Missing' : 'Found',
      statHealth: !statHealth ? 'Missing' : 'Found',
      startButton: !startButton ? 'Missing' : 'Found',
      stopButton: !stopButton ? 'Missing' : 'Found',
      rewardsContent: !rewardsContent ? 'Missing' : 'Found'
    });
    return;
  }

  startButton.disabled = true;
  startButton.textContent = 'Mission Running';
  stopButton.disabled = false; // Enable stop button when mission starts

  let totalXP = 0;
  let totalEctos = 0;

  rewardsContent.innerHTML = `
    <div class="reward-item">
      <div class="parallelogram-wrapper">
        <span class="inner-text">
          <span class="xp" id="total-xp">0</span><span class="xp"> XP</span>
        </span>
      </div>
    </div>
    <div class="reward-item">
      <div class="parallelogram-wrapper">
        <span class="inner-text">
          <span class="ectos" id="total-ectos">0.00</span><span class="ectos"> ECTOS</span>
        </span>
      </div>
    </div>
  `;

  const totalXPElement = document.getElementById('total-xp');
  const totalEctosElement = document.getElementById('total-ectos');

  const updateRewardsDisplay = () => {
    if (totalXPElement && totalEctosElement) {
      totalXPElement.textContent = totalXP;
      totalEctosElement.textContent = totalEctos.toFixed(2);
    }
  };

  const levelName = localStorage.getItem('selectedLevel') || 'Haunted Mansion';
  const hunterName = localStorage.getItem('selectedHunter') || 'Father Dave Langford';
  const weaponName = localStorage.getItem('selectedWeapon') || 'None';
  const shieldName = localStorage.getItem('selectedShield') || 'None';

  const level = levelData.find(l => l.name === levelName) || levelData[0];
  const randomEnemies = getRandomEnemies();
  const hunterData = equipmentData[hunterName];
  const weaponData = hunterData.weapons.find(w => w.name === weaponName) || { bonus: 'N/A', malus: 'N/A' };
  const shieldData = hunterData.shields.find(s => s.name === shieldName) || { bonus: 'N/A', malus: 'N/A' };

  let hunterStats = getHunterStats(hunterData, weaponData, shieldData);
  const maxHealth = hunterStats.health;
  let battlesWon = 0;
  let currentEnemyIndex = 0;
  let missionTimeLeft = 300000;

  const xpMultiplier = getLevelXPMultiplier(levelName);

  const spawnEnemyInBackground = (enemy, imageData) => {
    const newContainer = document.querySelector('.new-container');
    if (!newContainer) return;

    // Clear only previous enemies with different IDs
    const currentEnemyId = `enemy-${enemy.id}-${currentEnemyIndex}`;
    document.querySelectorAll('.mission-enemy').forEach(el => {
      if (el.id !== currentEnemyId) {
        el.remove();
      }
    });

    const enemyContainer = document.createElement('div');
    enemyContainer.className = 'enemy-container mission-enemy';
    enemyContainer.id = currentEnemyId;
    enemyContainer.dataset.enemyId = enemy.id;

    const enemyImage = document.createElement('img');
    enemyImage.src = imageData[enemy.id] || 'https://cdn.glitch.global/dacc699f-e499-49cc-a99e-62079fdfadf6/placeholder.png';
    enemyImage.alt = enemy.name;
    enemyContainer.appendChild(enemyImage);

    newContainer.appendChild(enemyContainer);

    setTimeout(() => {
      enemyContainer.classList.add('enemy-slide-in');
    }, 100);
  };

  const updateHealthBar = health => {
    const percentage = Math.max(0, Math.min(100, (health / maxHealth) * 100));
    healthBar.style.width = `${percentage}%`;
    healthText.textContent = `${Math.round(percentage)}%`;
    statHealth.textContent = `${Math.round(percentage)}%`;
  };

  const updateXpBar = () => {
    const xpNeeded = playerData.xpToNextLevel(playerData.level);
    const xpPercentage = Math.min(100, (playerData.xp / xpNeeded) * 100);
    document.getElementById('xp-bar-fill').style.width = `${xpPercentage}%`;
    document.getElementById('xp-text').textContent = `${playerData.xp}/${xpNeeded} XP`;
  };

  const formatTime = ms => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const endMission = () => {
    clearInterval(missionTimerInterval);
    stopGhostSpawning();
    document.querySelectorAll('.mission-enemy').forEach(enemy => {
      enemy.remove();
      console.log(`Removed enemy with ID ${enemy.id} on mission end`);
    });
    const outcome = battlesWon === randomEnemies.length ? '-enemies defeated!' : `${battlesWon}/${randomEnemies.length} enemies defeated`;
    playerData.xp += totalXP;
    playerData.ectos += totalEctos;
    savePlayerData();
    updateRewardsDisplay();
    checkLevelUp();
    updateXpBar();
    timerDisplay.textContent = 'Time Left: 0:00';
    recoveryTimer.style.display = 'none';
    startButton.disabled = false;
    startButton.textContent = 'Start Mission';
    stopButton.disabled = true;
    appendMessage(`Mission ended! ${outcome} Earned <span class="xp">${totalXP} XP</span> and <span class="ectos">${totalEctos.toFixed(2)} ECTOS</span>`, 'info');
  };

  const startMissionTimer = () => {
    timerDisplay.textContent = `Time Left: ${formatTime(missionTimeLeft)}`;
    missionTimerInterval = setInterval(() => {
      missionTimeLeft -= 1000;
      if (missionTimeLeft <= 0) endMission();
      else timerDisplay.textContent = `Time Left: ${formatTime(missionTimeLeft)}`;
    }, 1000);
  };

  const startRecoveryTimer = callback => {
    clearInterval(missionTimerInterval);
    stopGhostSpawning();
    document.querySelectorAll('.mission-enemy').forEach(enemy => {
      enemy.remove();
    });
    let recoveryTimeLeft = 180000;
    recoveryTimer.textContent = `Recovery Time: ${formatTime(recoveryTimeLeft)}`;
    recoveryTimer.style.display = 'block';
    timerDisplay.style.display = 'none';
    appendMessage(`${hunterName} is recovering...`, 'recovery');

    const recoveryInterval = setInterval(() => {
      recoveryTimeLeft -= 1000;
      if (recoveryTimeLeft <= 0) {
        clearInterval(recoveryInterval);
        hunterStats.health = maxHealth;
        updateHealthBar(maxHealth);
        recoveryTimer.style.display = 'none';
        timerDisplay.style.display = 'block';
        appendMessage(`${hunterName} has recovered!`, 'recovery');
        callback();
      } else {
        recoveryTimer.textContent = `Recovery Time: ${formatTime(recoveryTimeLeft)}`;
      }
    }, 1000);
  };

  let ghostInterval;
  const startGhostSpawning = () => {
    ghostInterval = setInterval(() => {
      if (!document.querySelector('.mission-enemy')) {
        spawnGhostInBackground(window.imageData || {});
      }
    }, 30000);
  };

  const stopGhostSpawning = () => {
    clearInterval(ghostInterval);
    document.querySelectorAll('.mission-ghost').forEach(ghost => {
      ghost.remove();
    });
  };

  setTimeout(() => {
    updateHealthBar(maxHealth);
    appendMessage(`Mission started in ${level.name}!`);
    startMissionTimer();

    const processBattle = index => {
      if (index >= randomEnemies.length || missionTimeLeft <= 0) {
        endMission();
        return;
      }

      setTimeout(() => {
        stopGhostSpawning();
        const ectoReward = parseFloat((Math.random() * 0.4 + 0.1).toFixed(2));
        totalEctos += ectoReward;
        const enemy = randomEnemies[index];
        const enemyStats = JSON.parse(JSON.stringify(enemy.stats));
        hunterStats = getHunterStats(hunterData, weaponData, shieldData);
        updateHealthBar(hunterStats.health);
        appendMessage(`Engaging ${enemy.name}...`);
        spawnEnemyInBackground(enemy, window.imageData || {});

        let turnCount = 0;
        while (hunterStats.health > 0 && enemyStats.health > 0 && turnCount < 10) {
          const turnOrder = determineTurnOrder(hunterStats, enemyStats);
          for (const turn of turnOrder) {
            if (hunterStats.health <= 0 || enemyStats.health <= 0) break;
            const result = turn === 'hunter'
              ? calculateAttack(hunterStats, enemyStats, hunterName, enemy.name)
              : calculateAttack(enemyStats, hunterStats, enemy.name, hunterName);

            appendMessage(result.message, result.type === 'dodge' ? 'dodge' : result.isCrit ? 'crit' : 'damage');
            if (turn === 'enemy') updateHealthBar(hunterStats.health);
          }
          turnCount++;
        }

        if (hunterStats.health <= 0) {
          appendMessage(`${hunterName} defeated by ${enemy.name}!`, 'defeat');
          updateHealthBar(0);
          startRecoveryTimer(() => {
            currentEnemyIndex++;
            if (currentEnemyIndex < randomEnemies.length && missionTimeLeft > 0) {
              startMissionTimer();
              startGhostSpawning();
              processBattle(currentEnemyIndex);
            } else {
              endMission();
            }
          });
        } else if (enemyStats.health <= 0) {
          battlesWon++;
          const enemyXP = Math.round(Math.min(5, enemy.stats.health * 0.5) * xpMultiplier);
          totalXP += enemyXP;
          updateRewardsDisplay();
          appendMessage(`${hunterName} defeats ${enemy.name}! Earned <span class="xp">${enemyXP} XP</span> <span class="ectos">${ectoReward} ECTOS</span>`, 'victory');
          const enemyElement = document.querySelector(`#enemy-${enemy.id}-${index}`);
          if (enemyElement) {
            enemyElement.classList.add('enemy-fade-out');
            setTimeout(() => {
              if (enemyElement.parentNode) {
                enemyElement.remove();
              }
            }, 3000);
          }
          checkLevelUp();
          updateXpBar();
          currentEnemyIndex++;
          setTimeout(() => {
            startGhostSpawning();
            processBattle(currentEnemyIndex);
          }, 4000);
        } else {
          updateRewardsDisplay();
          appendMessage(`Stalemate with ${enemy.name}! Earned <span class="ectos">${ectoReward} ECTOS</span>`, 'stalemate');
          const enemyElement = document.querySelector(`#enemy-${enemy.id}-${index}`);
          if (enemyElement) {
            enemyElement.classList.add('enemy-fade-out');
            setTimeout(() => {
              if (enemyElement.parentNode) {
                enemyElement.remove();
              }
            }, 3000);
          }
          currentEnemyIndex++;
          setTimeout(() => {
            startGhostSpawning();
            processBattle(currentEnemyIndex);
          }, 4000);
        }
      }, index * 15000);
    };

    processBattle(0);
  }, 3000);
}

// Stop mission
function stopMission() {
  const missionLog = document.querySelector('#mission-log .mission-log-content');
  const timerDisplay = document.getElementById('mission-timer');
  const recoveryTimer = document.getElementById('recovery-timer');
  const startButton = document.getElementById('start-mission-button');
  const stopButton = document.getElementById('stop-mission-button');
  const missionHunterImage = document.getElementById('mission-hunter-image');
  const rewardsContent = document.getElementById('rewards-content');

  if (!missionLog || !timerDisplay || !recoveryTimer || !startButton || !stopButton || !missionHunterImage || !rewardsContent) {
    console.error('Missing required elements for stopping mission');
    return;
  }

  // Clear timers
  clearInterval(missionTimerInterval);
  stopGhostSpawning();

  // Remove all enemies
  document.querySelectorAll('.mission-enemy').forEach(enemy => {
    enemy.classList.add('enemy-fade-out');
    setTimeout(() => {
      if (enemy.parentNode) enemy.remove();
    }, 3000);
  });

  // Hide hunter image
  missionHunterImage.classList.remove('hunter-slide-in');
  missionHunterImage.style.display = 'none';

  // Update UI
  timerDisplay.textContent = 'Time Left: 5:00';
  recoveryTimer.style.display = 'none';
  startButton.disabled = false;
  startButton.textContent = 'Start Mission';
  stopButton.disabled = true;

  // Save and display halved rewards
  const totalXPElement = document.getElementById('total-xp');
  const totalEctosElement = document.getElementById('total-ectos');
  if (totalXPElement && totalEctosElement) {
    const totalXP = parseInt(totalXPElement.textContent) || 0;
    const totalEctos = parseFloat(totalEctosElement.textContent) || 0;
    const halvedXP = Math.floor(totalXP / 2);
    const halvedEctos = parseFloat((totalEctos / 2).toFixed(2));

    // Update rewards container with halved values
    totalXPElement.textContent = halvedXP;
    totalEctosElement.textContent = halvedEctos.toFixed(2);

    // Add "rewards halved" text to the right of the Ectos container
    let statusElement = document.getElementById('rewards-status');
    if (statusElement) {
      statusElement.remove(); // Remove existing status to avoid duplicates
    }
    statusElement = document.createElement('span');
    statusElement.id = 'rewards-status';
    statusElement.className = 'rewards-status';
    statusElement.textContent = 'rewards halved';
    rewardsContent.appendChild(statusElement);

    // Add halved rewards to player data
    playerData.xp += halvedXP;
    playerData.ectos += halvedEctos;
    savePlayerData();
    checkLevelUp();
    updatePlayerUI();
  } else {
    console.warn('Rewards elements missing; no rewards updated.');
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const imageData = await loadImages();

  // Function to inject bottom-nav and update hunter profile
  function injectBottomNav() {
    const existingNav = document.querySelector('.bottom-nav');
    if (existingNav) {
      existingNav.remove();
      console.log('Removed existing bottom-nav');
    }

    const bottomNav = document.createElement('div');
    bottomNav.className = 'bottom-nav';
    bottomNav.innerHTML = `
      <img src="" data-image-id="ticker" class="ticker-icon">
      <p id="ectos-account">${playerData.ectos.toFixed(2)} </p>
      <p id="player-level">Level ${playerData.level}</p>
      <div id="hunter-profile">
        <img id="hunter-profile-image" src="https://cdn.glitch.global/dacc699f-e499-49cc-a99e-62079fdfadf6/placeholder.png" alt="Selected Hunter">
      </div>
      <button class="nav-button" onclick="window.location.href='index.html'">🏠 Home</button>
      <button class="nav-button" onclick="window.location.href='inventory.html'">🔮 Inventory</button>
      <button class="nav-button" onclick="window.location.href='skillweb.html'">📖 Grim Veins</button>
      <button class="nav-button" onclick="window.location.href='map.html'">🗺️ Map</button>
      <button class="nav-button" onclick="window.location.href='mission.html'">📜 Missions</button>
      <button class="nav-button" onclick="window.location.href='monster.html'">📖 Monsters</button>
    `;

    document.body.appendChild(bottomNav);

    const hunterName = localStorage.getItem('selectedHunter') || 'Father Dave Langford';
    const hunterData = equipmentData[hunterName];
    const profileImage = document.getElementById('hunter-profile-image');
    if (profileImage && hunterData) {
      profileImage.src = getImageSrc(hunterData.imageId);
      profileImage.alt = hunterName;
    } else if (profileImage) {
      profileImage.src = getImageSrc('placeholder');
    }

    // Update ticker icon
    const tickerIcon = bottomNav.querySelector('.ticker-icon');
    if (tickerIcon && window.imageData && window.imageData['ticker']) {
      tickerIcon.src = window.imageData['ticker'];
    }
  }

  // Inject bottom-nav on all pages
  injectBottomNav();

  if (page === 'index.html') {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        window.location.href = 'inventory.html';
      });
    }
  } else if (page === 'inventory.html') {
    if (selectedHunter) {
      populateEquipment(selectedHunter);
      document.querySelectorAll('.select-character-button').forEach(button => {
        if (button.getAttribute('onclick').includes(selectedHunter)) {
          button.textContent = 'Selected';
        }
      });
    }
    updateInventoryUI();
    updateConfirmButton();
  } else if (page === 'map.html') {
    initializeCarousel();
  } else if (page === 'mission.html') {
    populateMissionDetails(imageData);
    updatePlayerUI();

    const hunterName = localStorage.getItem('selectedHunter') || 'Father Dave Langford';
    const hunterData = equipmentData[hunterName];
    const weaponName = localStorage.getItem('selectedWeapon') || 'None';
    const shieldName = localStorage.getItem('selectedShield') || 'None';
    const weaponData = hunterData.weapons.find(w => w.name === weaponName) || { bonus: 'N/A', malus: 'N/A' };
    const shieldData = hunterData.shields.find(s => s.name === shieldName) || { bonus: 'N/A', malus: 'N/A' };
    const hunterStats = getHunterStats(hunterData, weaponData, shieldData);

    document.getElementById('stat-health').textContent = '100%';
    document.getElementById('stat-defense').textContent = hunterStats.defense.toString();
    document.getElementById('stat-speed').textContent = hunterStats.speed.toString();
    document.getElementById('stat-dodge').textContent = `${Math.round(hunterStats.agility * 2)}%`;
    document.getElementById('stat-damage').textContent = hunterStats.damage.toString();
    document.getElementById('stat-crit-damage').textContent = hunterStats.critDamage.toString();
    document.getElementById('stat-crit-chance').textContent = `${Math.round(hunterStats.critDamage * 2)}%`;

    // Attach event listeners to buttons
    const startButton = document.getElementById('start-mission-button');
    const stopButton = document.getElementById('stop-mission-button');
    if (startButton) startButton.addEventListener('click', startMission);
    if (stopButton) {
      stopButton.addEventListener('click', stopMission);
      stopButton.disabled = true; // Initially disable stop button
    }

    // Start mission automatically
    startMission();
  } else if (page === 'monster.html') {
    populateBestiary(imageData);
  }
});

// Initialize carousel for map.html
function initializeCarousel() {
  const maxRetries = 5;
  let retryCount = 0;

  function tryInitialize() {
    const carouselTrack = document.getElementById('carousel-track');
    const leftArrow = document.getElementById('carousel-left-arrow');
    const rightArrow = document.getElementById('carousel-right-arrow');
    const errorMessage = document.getElementById('carousel-error');

    if (!carouselTrack || !leftArrow || !rightArrow) {
      if (retryCount < maxRetries - 1) {
        retryCount++;
        setTimeout(tryInitialize, 200);
        return;
      }
      if (carouselTrack && errorMessage) {
        errorMessage.textContent = 'Error: Unable to load levels. Please refresh the page.';
        errorMessage.style.display = 'block';
      }
      return;
    }

    // Hide error message
    if (errorMessage) errorMessage.style.display = 'none';

    // Populate carousel with levels
    levelData.forEach((level, index) => {
      const imageSrc = getImageSrc(level.imageId);
      const enemyListHTML = level.enemies.map(enemy => `
        <div class="enemies-container2" id="enemies-container2">
          ${window.imageData && window.imageData[enemy.id] ? `<img src="${window.imageData[enemy.id]}" alt="${enemy.name}" class="enemy-image">` : ''}
          <p class="enemy-name">${enemy.name}</p>
        </div>
      `).join('');

      const levelElement = document.createElement('div');
      levelElement.className = 'level-item';
      levelElement.innerHTML = `
        <div class="level-content">
          <div class="level-image-container">
            <img src="${imageSrc}" alt="${level.name}" class="level-image" onerror="console.error('Failed to load image for ${level.name}: ${imageSrc}')">
          </div>
          <h3>${level.name}</h3>
          <p>${level.description}</p>
          <p class="rewards-text">Rewards: ${level.rewards.join(', ')}</p>
          <div class="enemy-column">
            ${enemyListHTML}
          </div>
          <button class="select-level-button" onclick="selectLevel('${level.name}')">Select</button>
        </div>
      `;
      carouselTrack.appendChild(levelElement);
    });

    let currentIndex = 0;
    const totalItems = levelData.length;

    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });

    updateCarousel();
  }

  tryInitialize();
}

// Select level and redirect to mission.html
function selectLevel(levelName) {
  try {
    localStorage.setItem('selectedLevel', levelName);
    window.location.href = 'mission.html';
  } catch (error) {
    console.error('Error selecting level:', error);
  }
}

// Populate bestiary for monster.html
function populateBestiary(imageData) {
  console.log('Populating bestiary with image data:', imageData);
  const enemiesContainer = document.getElementById('enemies-container2');
  if (!enemiesContainer) {
    console.error('Enemies container (#enemies-container2) not found!');
    return;
  }

  // Clear existing content
  enemiesContainer.innerHTML = '';

  // Get unique enemies from levelData
  const uniqueEnemies = [];
  const seenIds = new Set();
  levelData.forEach(level => {
    level.enemies.forEach(enemy => {
      if (!seenIds.has(enemy.id)) {
        seenIds.add(enemy.id);
        uniqueEnemies.push(enemy);
      }
    });
  });

  // Populate each enemy
  uniqueEnemies.forEach(enemy => {
    const enemyElement = document.createElement('div');
    enemyElement.className = 'enemy-item';

    // Create enemy content
    enemyElement.innerHTML = `
      <div class="enemy-content">
        <img src="${imageData[enemy.id] || 'https://cdn.glitch.global/dacc699f-e499-49cc-a99e-62079fdfadf6/placeholder.png'}" alt="${enemy.name}" class="enemy-image"><h3>${enemy.name}</h3>
        <div class="enemy-description">
          <ul class="enemy-stats">
            <li>
              <span class="stat-name">Health:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.health / 120) * 100)}%">${enemy.stats.health}</div>
              </div>
            </li>
            <li>
              <span class="stat-name">Defense:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.defense / 20) * 100)}%">${enemy.stats.defense}</div>
              </div>
            </li>
            <li>
              <span class="stat-name">Damage:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.damage / 20) * 100)}%">${enemy.stats.damage}</div>
              </div>
            </li>
            <li>
              <span class="stat-name">Speed:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.speed / 50) * 100)}%">${enemy.stats.speed}</div>
              </div>
            </li>
            <li>
              <span class="stat-name">Agility:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.agility / 30) * 100)}%">${enemy.stats.agility}</div>
              </div>
            </li>
            <li>
              <span class="stat-name">Crit Damage:</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${Math.min(100, (enemy.stats.critDamage / 10) * 100)}%">${enemy.stats.critDamage}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `;

    enemiesContainer.appendChild(enemyElement);
  });
}