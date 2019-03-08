<?php
/**
 * Created by PhpStorm.
 * User: José Maria
 * Date: 26/02/2019
 * Time: 10:35
 */

namespace CodeShopping\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];

    protected $simpleSorts = ['id', 'name','email','created_at'];

    protected  function applySearch($value){
        $this-> query->where('name', 'LIKE', "%$value%")
            ->orWhere('email', 'LIKE', "%$value%");
    }

}