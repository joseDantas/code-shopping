<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInput extends Model
{
    protected $fillable = ['amount', 'product_id'];

    //many-to-one
    public function product(){
        return $this->belongsTo(Product::class);
    }
}

//cada vez que acesso o relacionamento faz consulta com o banco de dados
