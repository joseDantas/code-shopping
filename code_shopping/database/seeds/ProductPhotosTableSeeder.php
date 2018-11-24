<?php

use CodeShopping\Models\Product;
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
        $products->each(function ($product){

        });
    }

    private function deleteAllPhotosInProductsPath(){
        $path = \CodeShopping\Models\ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }
}
