function myFunction() {
// 【特定のシート以外を全て削除】する
  var ss = SpreadsheetApp.getActiveSpreadsheet();  //スプレッドシートAppを取得
  var sht = ss.getActiveSheet();  //アクティブなシートを取得
  var getid = ss.getId();  //スプレッドシートのidを取得する
  var SPREADSHEET_ID = getid;   //スプレッドシートのIDを指定

//  var a = Browser.inputBox("残したいシート名を入力：");
  var SHEET_NAME = "シート1";   //残したいシート名を指定する！　ここだけアナログ入力！

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME); //残したいシートとシートが存在するスプレッドシートを定義
  var ash = SpreadsheetApp.getActiveSpreadsheet(); //アクティブなスプレッドシートを取得 
  var cnt = ash.getNumSheets(); //アクティブなスプレッドシートのシート数を取得
  SpreadsheetApp.setActiveSheet(sheet); //指定したシート名をアクティブシートにする
  ash.moveActiveSheet(1); //アクティブシートを１番左へ移動
  for(var i = cnt; i >= 2; i=i-1 ){  //初期値の変数iはシート数を表す変数cnt、iをｰ1していき2以上の間は処理を繰り返し
    var sh = ash.getSheets()[i-1];　//アクティブなスプレッドシートに存在するシートを、[i-1]により配列の要素数で指定して取得し、変数shに代入
    ash.deleteSheet(sh); //シート削除
  } 
// 【特定のシート以外を全て削除】
}
