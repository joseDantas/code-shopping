<?php
/**
 * Created by PhpStorm.
 * User: José Maria
 * Date: 15/02/2019
 * Time: 09:43
 */

namespace CodeShopping\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'name','created_at'];

    protected  function applySearch($value){
        $this-> query->where('name', 'LIKE', "%$value%");
            //->orWhere('description', 'LIKE', "%$value%")
            //->orWhere('column', '=', "%$value%");
    }

}