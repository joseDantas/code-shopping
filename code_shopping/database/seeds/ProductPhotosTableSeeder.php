<?php

use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use Illuminate\Database\Seeder;

class ProductPhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var \Illuminate\Database\Eloquent\Collection $products */
        $products = Product::all();
        $this->deleteAllPhotosInProductsPath(); //exclui todas as fotos
        $self = $this; // esse $this  tem que ser usado apenas pela FUNCTION,  para que possa funcionar e não a classe THIS
        $products->each(function ($product) use($self){
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function deleteAllPhotosInProductsPath(){
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function createphotoDir(Product $product){
        $path = ProductPhoto::photosPath($product->id);
        \File::makeDirectory($path,0777,true );
    }

    private function createPhotosModels(Product $product){
        foreach (range(1, 5) as $v){
            $this->createPhotoModel($product);
        }

    }

    private function createPhotoModel(Product $product){
        ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'imagem.jpg'
        ]);
    }
}
