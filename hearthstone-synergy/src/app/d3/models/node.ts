import APP_CONFIG from '../../app.config';
import { Card } from '../../hearthstone';

export class Node implements d3.SimulationNodeDatum {
    
    // optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;

    id: string;
    linkCount: number = 0;
  
    constructor(id, public card: Card) {
      this.id = id;
    }
  
    normal = () => {
      return Math.sqrt(this.linkCount / 100);
    }
  
    get r() {
      return 50 * this.normal() + 10;
    }
  
    get fontSize() {
      return (30 * this.normal() + 10) + 'px';
    }
  
    get text() {
      return this.card.name;
    }

    get color() {
      // let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
      // return APP_CONFIG.SPECTRUM[index];

      switch (this.card.cardClass) {
        case "DEATHKNIGHT": return "black"; 
        case "DREAM": return "black";
        case "DRUID": return "green"; 
        case "HUNTER": return "brown";
        case "INVALID": return "black"; 
        case "MAGE": return "blue";
        case "NEUTRAL": return "gray"; 
        case "PALADIN": return "orange"; 
        case "PRIEST": return "yellow";
        case "ROGUE": return "red";
        case "SHAMAN": return "pink"; 
        case "WARLOCK": return "violet"; 
        case "WARRIOR": return "silver";
      }
    }
}