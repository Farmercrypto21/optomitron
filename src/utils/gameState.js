// Centralized game state management
class GameState {
  constructor() {
    this.state = {
      player: {
        level: 1,
        xp: 0,
        selectedHunter: null,
        selectedWeapon: null,
        selectedShield: null,
        stats: {
          health: 100,
          defense: 0,
          speed: 0,
          damage: 0,
          critChance: 0,
          critDamage: 0,
          dodge: 0
        }
      },
      mission: {
        isActive: false,
        timeRemaining: 0,
        currentLevel: null,
        enemies: [],
        rewards: {
          xp: 0,
          ectos: 0
        }
      },
      inventory: {
        weapons: [],
        shields: [],
        ectos: 0
      }
    };
    
    this.loadState();
  }

  saveState() {
    try {
      localStorage.setItem('ghg_gamestate', JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save game state:', error);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('ghg_gamestate');
      if (saved) {
        this.state = { ...this.state, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load game state:', error);
    }
  }

  updatePlayer(updates) {
    this.state.player = { ...this.state.player, ...updates };
    this.saveState();
  }

  updateMission(updates) {
    this.state.mission = { ...this.state.mission, ...updates };
    this.saveState();
  }

  selectHunter(hunterName) {
    this.updatePlayer({ selectedHunter: hunterName });
  }

  selectWeapon(weaponName) {
    this.updatePlayer({ selectedWeapon: weaponName });
  }

  selectShield(shieldName) {
    this.updatePlayer({ selectedShield: shieldName });
  }

  addXP(amount) {
    const newXP = this.state.player.xp + amount;
    const newLevel = Math.floor(newXP / 150) + 1;
    
    this.updatePlayer({ 
      xp: newXP, 
      level: Math.max(this.state.player.level, newLevel) 
    });
  }

  addEctos(amount) {
    this.state.inventory.ectos += amount;
    this.saveState();
  }

  getState() {
    return { ...this.state };
  }
}

export default new GameState();