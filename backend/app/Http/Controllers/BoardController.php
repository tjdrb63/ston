<?php

namespace App\Http\Controllers;

use App\Models\FreeBoard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BoardController extends Controller
{
    public function Test(){

        return "wda";

    }
    public function BoardShow(){
        $boards = FreeBoard::all();
        $len = count($boards);
        for($i=0;$i<$len;$i++){
            $userName = DB::table('users')->where("id","=",$boards[$i]->user_id)->value("name");
            $id = $boards[$i]->id;
            $images = DB::table("free_board_images")->where("freeboard_id","=",$id)->get("image_path");
            $boards[$i] -> images = $images;
            $boards[$i] -> user_name = $userName;
        }

        return $boards;
    }
}
