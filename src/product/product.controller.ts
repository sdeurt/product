import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.productService.findOneById(+id);
  }

  @Get('name/:name')
  async findOne(@Param('name') name: string) {
    //vérifie que le nom existe
    const isProductExist = await this.productService.findOneByName(name);
    if (!isProductExist) {
      throw new NotFoundException(`le produit n'existe pas`);
    }
    return await this.productService.findOneByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    /**vérifier que le produit à supprimer existe */
    const isProductExist = await this.productService.findOneById(+id);
    if (!isProductExist) {
      throw new NotFoundException(`le produit n'existe pas`);
    };
    /**supprime le produit sélectionné */
    await this.productService.remove(+id);
    
    return {
      statusCode: 200,
      message: 'affichage du produit supprimé',
      data: isProductExist
    }
  }
}
