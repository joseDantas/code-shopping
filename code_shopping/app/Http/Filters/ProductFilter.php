<?php
/**
 * Created by PhpStorm.
 * User: José Maria
 * Date: 20/02/2019
 * Time: 10:42
 */

namespace CodeShopping\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'name','price','created_at'];

    protected  function applySearch($value){
        $this-> query->where('name', 'LIKE', "%$value%")
        ->orWhere('description', 'LIKE', "%$value%")
        ->orWhere('price', 'LIKE', "%$value%");
    }

}