<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class ProductOutput extends Model
{
    use Filterable;
    protected $fillable = ['amount', 'product_id'];

    //many-to-one
    public function product(){
        return $this->belongsTo(Product::class)->withTrashed(); //->withTrashed():se o produto tiver excluido também pode consultar
    }
}
