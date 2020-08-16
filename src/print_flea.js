function _20200812() {
  // 【特定のシート以外を全て削除する】
  var ash = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = SpreadsheetApp.getActive().getSheetByName('シート1');  
  //var ss = SpreadsheetApp.getActiveSpreadsheet();  //スプレッドシートAppを取得
  //var sht = ash.getActiveSheet();  //アクティブなシートを取得
  //var getid = ash.getId();  //スプレッドシートのidを取得する
  //var SPREADSHEET_ID = getid;   //スプレッドシートのIDを指定
  //  var a = Browser.inputBox("残したいシート名を入力：");
  var SHEET_NAME = "シート1";   //残したいシート名を指定する！　ここだけアナログ入力！
  //var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME); //残したいシートとシートが存在するスプレッドシートを定義
  //var ash = SpreadsheetApp.getActiveSpreadsheet(); //アクティブなスプレッドシートを取得 
  var cnt = ash.getNumSheets(); //アクティブなスプレッドシートのシート数を取得
  //SpreadsheetApp.setActiveSheet(sheet); //指定したシート名をアクティブシートにする
  //ash.moveActiveSheet(1); //アクティブシートを１番左へ移動
  sheet1.showSheet();
  for(var i = cnt; i >= 2; i=i-1 ){  //初期値の変数iはシート数を表す変数cnt、iをｰ1していき2以上の間は処理を繰り返し
    var sh = ash.getSheets()[i-1];　//アクティブなスプレッドシートに存在するシートを、[i-1]により配列の要素数で指定して取得し、変数shに代入
    ash.deleteSheet(sh); //シート削除
  } 
  
  // 【シートを作成してシート１の内容をコピーする】
  var lastRow1 = sheet1.getLastRow();
  //i = 1
  for(var i = 1; i < lastRow1+1; i++) {
    var sheet = ash.insertSheet(i + "-1")
    sheet.getRange(15,1).setValues(sheet1.getRange(i,1).getValues()).setFontSize(9);
    var sheet = ash.insertSheet(i + "-2")
    sheet.getRange(1,1).setValues(sheet1.getRange(i,2).getValues()).setFontSize(5).setHorizontalAlignment("left");
    var homeadd = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(i + "-2")
    homeadd.getRange(21 ,1).setValue("290-0501").setHorizontalAlignment("left").setFontSize(12);
    homeadd.getRange(22 ,1).setValue("千葉県市原市米沢344-10").setHorizontalAlignment("left").setFontSize(12);
    homeadd.getRange(23 ,1).setValue("齋藤　誠美").setHorizontalAlignment("left").setFontSize(18);
  }
  sheet1.hideSheet();
  return createPDF("1v1p-UlSm8kjQnYz6iTNpj6Xc9k0RBe2m", "13H4m38CC7k0-VnhkZZolPu5D1PY4Ekb1NG_-JGL2ZvQ", "print out.pdf");
};