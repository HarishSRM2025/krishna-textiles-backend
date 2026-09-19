import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brand.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        _count: { select: { products: true } },
      },
    });
    if (!brand) throw new NotFoundException(`Brand '${id}' not found`);
    return brand;
  }

  async create(data: { name: string; image?: string; description?: string }) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await this.prisma.brand.findFirst({ where: { OR: [{ name: data.name }, { slug }] } });
    if (existing) throw new BadRequestException(`Brand '${data.name}' already exists`);

    return this.prisma.brand.create({
      data: {
        name: data.name,
        slug,
        image: data.image || null,
        description: data.description || null,
      },
    });
  }

  async update(id: string, data: any) {
    const existing = await this.prisma.brand.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Brand '${id}' not found`);

    return this.prisma.brand.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        image: data.image ?? existing.image,
        description: data.description ?? existing.description,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.brand.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Brand '${id}' not found`);
    await this.prisma.brand.delete({ where: { id } });
    return { success: true, message: `Brand '${existing.name}' deleted` };
  }
}
