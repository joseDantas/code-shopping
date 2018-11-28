<?php
declare (strict_types=1);
namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products'; //diretorios de produtos na pasta storage/app/public

    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillabel = ['file_name', 'product_id'];

    public static function photosPath($productId){
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}"); //Caminho absoluto até a pasta que vai conter as imagens, que é do ID do produto
    }

    public static function uploadFiles($productId, array $files){
        $dir = self::photosDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file){      //
            $file->store($dir,['disk'=>'public']);
        }
    }

    public function getPhotoUrlAttribute(){
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir($productId){
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    public static function createWithPhotosFile(int $productId, array $files): Collection{
        self::uploadFiles($productId,$files);
        $photos = self::createPhotosModels($productId, $files);
        return new Collection($photos);
    }

    private static function createPhotosModels(int $productId, array $files): array{
        $photos = [];
        /** @var UploadedFile $file */
        foreach ($files as $file){
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
        }
        return $photos;
    }
    //muitos pra um
    public function  product(){
        return $this->belongsTo(Product::class);
    }
}
