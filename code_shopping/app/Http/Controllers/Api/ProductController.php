<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder; //pacote de "query"

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequest($request, $query);
        $products = $query->paginate(10);
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

    private function onlyTrashedIfRequest(Request $request, Builder $query){
        if($request->get('trashed') == 1){
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}
