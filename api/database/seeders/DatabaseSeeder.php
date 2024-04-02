<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)
            ->sequence(
                ['role' => 'subscriber'],
                ['role' => 'author']
            )
            ->create();

        User::factory(2)
            ->sequence(
                [
                    'name' => 'Admin User',
                    'email' => 'admin@example.com',
                    'role' => 'admin'
                ],
                [
                    'name' => 'Subscriber User',
                    'email' => 'subscriber@example.com',
                    'role' => 'subscriber'
                ]
            )
            ->create();

        User::factory()
            ->has(Post::factory()
                ->sequence(
                    ['status' => 'published'],
                    ['status' => 'draft']
                )
                ->count(6))
            ->create([
                'name' => 'Author1 User',
                'email' => 'author1@example.com',
                'role' => 'author'
            ]);

        User::factory()
            ->has(Post::factory()->count(2))
            ->create([
                'name' => 'Author2 User',
                'email' => 'author2@example.com',
                'role' => 'author'
            ]);

        User::factory(5)
            ->author()
            ->has(Post::factory()
                ->sequence(
                    ['status' => 'published']
                )
                ->count(5))
            ->create();
    }
}
