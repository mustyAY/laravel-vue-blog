<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'body',
        'photo_path',
        'status',
    ];

    protected $appends = ['photo'];

    protected $with = ['author:id,name'];
    protected $withCount = ['likes'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likedUsers()
    {
        return $this->belongsToMany(User::class, Like::class);
    }

    public function photo(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->photo_path) return null;
                return asset($this->photo_path);
            },
        );
    }

}
