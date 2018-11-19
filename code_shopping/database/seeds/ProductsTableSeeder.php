<?php

use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquente\Collection;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $categories */
        $categories = Category::all();
        factory(Product::class, 30)
            ->create()
            ->each(function (Product $product) use ($categories) {
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            });
    }
}
