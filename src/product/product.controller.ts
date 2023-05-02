import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /** Création d'un produit */

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const response = await this.productService.create(createProductDto);

    return {
      status: 201,
      message: "produit ajouté",
      data: response
    }
  }

  /** Affichage de tous les produits */
  @Get()
  async findAll() {
    const allProducts = await this.productService.findAll();
    if (!allProducts) {
      throw new HttpException("aucun produit trouvé", HttpStatus.NOT_FOUND);
    }
    return {
      status: 200,
      message: " liste des produits",
      data: allProducts
    }
  }

  /** recherche le produit par l'id */
  @Get(':id')
 async findOneById(@Param('id') id: string) {
    const product = await this.productService.findOneById(+id);
    if (!product) {
      throw new HttpException("ce produit n'est pas en stock", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: "produit demandé",
      data: product

    }; 
  }

  /** Recherche le produit par le nom  */
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
    const product = await this.productService.update(+id, updateProductDto);


    if (!product) {
      throw new NotFoundException(`Le produit n'existe pas!`);

    }
    return {
      statusCode: 200,
      message: "Le produit a bien été modifié",
      data: product
    }
  }

  /** Suppression du produit par id */
  
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
