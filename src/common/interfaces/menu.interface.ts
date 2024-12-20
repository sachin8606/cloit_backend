export interface MenuInterface {
    id: string;
    name: string;
    depth: number;
    parentId?: string;
    children?: MenuInterface[];
  }
  