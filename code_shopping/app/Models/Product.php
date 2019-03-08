<?php

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

/**
 * @method static findOrFail($product_id)
 */
class Product extends Model
{
    use Sluggable, softDeletes, Filterable;

    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'price', 'description', 'active'];

    public function sluggable(): array
    {
       return[
           'slug' => [
               'source' => 'name'
           ]
       ];
    }

    public function categories() {
        return $this->belongsToMany(Category::class);
    }
    // um para muitos
    public  function photos(){
        return $this->hasMany(ProductPhoto::class);
    }
}
