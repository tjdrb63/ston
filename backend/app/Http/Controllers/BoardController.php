<?php

namespace App\Http\Controllers;

use App\Models\Comment;
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
    public function ShowComment($board_id){
            $comments = DB::table("comments")->where("freeboard_id","=",$board_id)->paginate(5);
            // $len= count($comments);
            // for($i=0;$i<3;$i++){
            //     $userName= DB::table('users')->where("id","=",$comments[$i]->user_id)->value("name");
            //     $comments[$i] -> user_name = $userName;
            // }
            return $comments;
    }
    public function PostComment(Request $request){
        $comments = new Comment();
        $comments -> freeboard_id = $request->board_id;
        $comments -> comment = $request->content;
        // user_id 수정할것
        $comments -> user_id = 6;
        $comments -> save();

    }
}
