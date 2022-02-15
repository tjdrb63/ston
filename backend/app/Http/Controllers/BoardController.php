<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\FreeBoard;
use App\Models\User;
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
            $comments = DB::table("comments")
                ->where('freeboard_id','=',$board_id)
                ->join('users','comments.user_id','=','users.id')
                ->select('comments.*','users.name')
                ->latest()
                ->paginate(5);
            return $comments;

    }

    public function ShowUserName($user_id){

    }
    public function PostComment(Request $request){
        $comments = new Comment();
        $comments -> freeboard_id = $request->board_id;
        $comments -> comment = $request->content;
        $comments -> user_id = $request->user_id;
        $comments -> save();

    }
    public function UpdateComment(Request $request){
        $comment = Comment::find($request->comment_id);
        $comment -> comment = $request -> updateText;
        $comment -> save();
    }
    public function ShowPapago(Request $request){
        $text = $request-> text;

        $client_id = "W67VxGiecQuxoWQaqZ02"; // 네이버 개발자센터에서 발급받은 CLIENT ID
        $client_secret = "BxA1eiUXuT";// 나중에 가릴것 ㅋㅋ
        $encText = urlencode($text);
        $postvars = "source=ko&target=en&text=".$encText;
        $url = "https://openapi.naver.com/v1/papago/n2mt";
        $is_post = true;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, $is_post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $postvars);
        $headers = array();
        $headers[] = "X-Naver-Client-Id: ".$client_id;
        $headers[] = "X-Naver-Client-Secret: ".$client_secret;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec ($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        // echo "status_code:".$status_code."<br>";
        curl_close ($ch);
        if($status_code == 200) {
            return $response;
        } else {
            return "Error!!";
        }
    }
}
