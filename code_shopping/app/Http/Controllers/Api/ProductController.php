<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Commom\OnlyTrashed;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductFilter;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder; //pacote de "query"

class ProductController extends Controller
{
    use OnlyTrashed;
    public function index(Request $request)
    {

        /**@var ProductFilter $filter */
        $filter = app(ProductFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Product::filtered($filter);
        $products = $request->has('all')? $filterQuery->get() : $filterQuery->paginate(5);
        return ProductResource::collection($products); //personalização dos dados
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh(); //por causa do campo active
        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $product->fill($request->all()); //Método fill recebe um  array das informações que querem ser atualizadas
        $product->save();
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

    public function restore(Product $product)   //restauração do produto
    {
        $product->restore();
        return response()->json([],204);
    }


}
