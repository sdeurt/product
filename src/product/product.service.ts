import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  /**crée un nouveau produit */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new Product();

    newProduct.id = createProductDto.id;
    newProduct.name = createProductDto.name;
    newProduct.price = createProductDto.price;
    newProduct.quantity = createProductDto.quantity;

    await newProduct.save()

    return newProduct;
  }
  /** récupère tous les produits */
  async findAll(): Promise<Product[]> {
    const products = await Product.find();
    if (products.length > 0) {
      return products;
    }
  }
  /** Récupère un User par son id*/
  async findOneById(id: number): Promise<Product> {
    const product = await Product.findOneBy({ id });

    if (product) {
      return product;
    };

    return undefined;
  };


  /** récupérère le produit par son nom */
  async findOneByName(name: string): Promise<Product> {
    const product = await Product.findOneBy({ name });
    if (product) {
      return product;
    }
    return undefined;
  }

  /**modification d'un produit */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdate = await Product.findOneBy({ id })
    productUpdate.id = updateProductDto.id;
    productUpdate.name = updateProductDto.name;
    productUpdate.price = updateProductDto.price;
    productUpdate.quantity = updateProductDto.quantity;

    const product = await productUpdate.save();

    if (product) {
      return product;
    }
  }


  /** suppression d'un produit */
  async remove(id: number): Promise<Product> {
    const deleteProduct = await Product.findOneBy({ id });
    await deleteProduct.remove();

    if (deleteProduct) {
      return deleteProduct;
    }
  }
}
