<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOutput extends Model
{
    protected $fillable = ['amount', 'product_id'];

    //many-to-one
    public function product(){
        return $this->belongsTo(Product::class)->withTrashed(); //->withTrashed():se o produto tiver excluido também pode consultar
    }
}
