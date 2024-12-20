export class CreateMenuDto {
  name: string;
  parentId?: string;
  depth: number;

  constructor(name: string, depth: number, parentId?: string) {
    this.name = name;
    this.depth = depth;
    this.parentId = parentId;
  }
}

export class UpdateMenuDto {
  name?: string;
}
