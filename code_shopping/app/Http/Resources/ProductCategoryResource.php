<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
           'product' => new ProductResource($this->resource), // estou passando o meu Model de produtos para resource de produtos
           'categories' => CategoryResource::collection($this->resource->categories)
        ];
    }
}
