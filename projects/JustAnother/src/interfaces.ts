interface ICharacter {
  id: number;
  name: string;
  description: string;
  img?: string; 
  children: number[];
  new?: boolean;
}

type Characters = Map<number, ICharacter>;

export { ICharacter, Characters };
