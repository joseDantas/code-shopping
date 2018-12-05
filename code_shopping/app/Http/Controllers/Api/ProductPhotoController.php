<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductPhotoRequest;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{

    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos,$product);
    }

    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFile($product->id, $request->photos);
        return response()->json(new ProductPhotoCollection($photos,$product), 201);
    }

    public function show(Product $product,ProductPhoto $photo)
    {
        $this->hasProductPhoto($product, $photo);
        return new ProductPhotoResource($photo);
    }

    public function update(Request $request, Product $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($product, $photo);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
    }


    public function destroy(Product $product,ProductPhoto $photo)
    {
        $this->hasProductPhoto($product, $photo); //pra vê se o  produto está relacionado com a foto
        $photo->deleteWithPhoto();
        return response()->json([],204);
    }

    private function hasProductPhoto(Product $product, ProductPhoto $photo){
        if($photo->product_id != $product->id){
            abort(404);
        }
    }

}
