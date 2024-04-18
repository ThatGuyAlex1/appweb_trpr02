export default interface Character {
    readonly id: number;
    readonly name: string;
    readonly credit: number;
    readonly experience: number;
    readonly ship: Ship;
  }
  
  interface Ship {
    readonly id: number;
    readonly name: string;
    readonly vitality: number;
  }
  