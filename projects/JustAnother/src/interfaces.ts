export interface ICharacter {
  id: number;
  name: string;
  description: string;
  img?: string; 
  children: number[];
  new?: boolean;
  parent: number;
}

export type Characters = Map<number, ICharacter>;
