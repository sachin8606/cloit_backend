import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from '../common/dtos/menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus() {
    return this.prisma.menu.findMany({ include: { children: true } });
  }

  async getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { children: true },
    });
  }

  async createMenu(dto: CreateMenuDto) {
      const { parentId, name, depth } = dto;
  
      if (parentId) {
        const parentExists = await this.prisma.menu.findUnique({
          where: { id: parentId },
        });
    
        if (!parentExists) {
          throw new Error(`Parent ID ${parentId} does not exist.`);
        }
      }
    
      // Automatically set depth to 1 for top-level menus
      const computedDepth = parentId ? depth : 1;
    
      return this.prisma.menu.create({
        data: {
          name,
          depth: computedDepth,
          parentId: parentId || null,
        },
      });
  }

  async updateMenu(id: string, dto: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data: dto });
  }

  async deleteMenu(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
