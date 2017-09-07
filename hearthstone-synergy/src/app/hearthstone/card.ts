import { PlayRequirements } from './play-requirements';

export interface Card {
    cardClass?: string;
    dbfId: number;
    id: string;
    name: string;
    playerClass?: string;
    set: string;
    text?: string;
    type: string;
    cost?: number;
    mechanics?: string[];
    artist?: string;
    attack?: number;
    collectible?: boolean;
    faction?: string;
    flavor?: string;
    health?: number;
    howToEarnGolden?: string;
    playRequirements?: PlayRequirements;
    rarity?: string;
    targetingArrowText?: string;
    race?: string;
    elite?: boolean;
    entourage?: string[];
    referencedTags?: string[];
    hideStats?: boolean;
    howToEarn?: string;
    overload?: number;
    collectionText?: string;
    durability?: number;
    classes?: string[];
    multiClassGroup?: string;
    spellDamage?: number;
}