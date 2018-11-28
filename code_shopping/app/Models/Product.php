<?php

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static findOrFail($product_id)
 */
class Product extends Model
{
    use Sluggable;

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
