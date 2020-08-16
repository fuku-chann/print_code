//function printToPDF() {
  //return createPDF("1v1p-UlSm8kjQnYz6iTNpj6Xc9k0RBe2m", "13H4m38CC7k0-VnhkZZolPu5D1PY4Ekb1NG_-JGL2ZvQ", "print out.pdf");
//}


// PDF作成関数　引数は（folderid:保存先フォルダID, ssid:PDF化するスプレッドシートID, sheetid:PDF化するシートID, filename:PDFの名前）
function createPDF(folderid, ssid, filename) {

  // スプレッドシートをPDFにエクスポートするためのURL。このURLに色々なオプションを付けてPDFを作成
  var url = "https://docs.google.com/spreadsheets/d/SSID/export?".replace("SSID", ssid);

  // 範囲をURL風に変換
  var printRange = encodeURIComponent("A1:A106");

  // PDF作成のオプションを指定
  var opts = {
    exportFormat: "pdf",  // ファイル形式の指定 pdf / csv / xls / xlsx
    format: "pdf",        // ファイル形式の指定 pdf / csv / xls / xlsx
    size: "A4",           // 用紙サイズの指定 legal / letter / A4 など
    portrait: "true",    // true → 縦向き、false → 横向き
    fitw: "true",         // ページをフィットさせるかどうか。trueでフィット、falseで原寸大。
    sheetnames: "false",  // シート名をPDF上部に表示するか
    printtitle: "false",  // スプレッドシート名をPDF上部に表示するか
    pagenumbers: "false", // ページ番号の有無
    gridlines: "false",   // グリッドラインの表示有無
    fzr: "false",         // 固定行の表示有無
//    gid: sheetid,         // シートIDを指定 sheetidは引数で取得
    range: printRange,    // 範囲
    top_margin: "4",      // 上余白
    bottom_margin: "0",   // 下余白
    left_margin: "3",     // 左余白
    right_margin: "0",    // 右余白
    scale: "3"            // なんか幅に合わせたり高さに合わせたりできるらしい。
  };

  var url_ext = [];

  // 上記のoptsのオプション名と値を「=」で繋げて配列url_extに格納
  for (optName in opts) {
    url_ext.push(optName + "=" + opts[optName]);
  }

  // url_extの各要素を「&」で繋げる
  var options = url_ext.join("&");
  // API使用のためのOAuth認証
  var token = ScriptApp.getOAuthToken();
  // PDFファイルの保存先となるフォルダをフォルダIDで指定
  var folder = DriveApp.getFolderById(folderid);
  SpreadsheetApp.flush();
  // PDF作成
  var blob = UrlFetchApp.fetch(url + options, { headers: { 'Authorization': 'Bearer ' + token }, muteHttpExceptions: true }).getBlob().setName(filename);
  // 存在するなら削除
  delExistsFile(folder, filename);
  // 保存
  var newFile = folder.createFile(blob);
  // 共有設定をする：「リンクを知っている人」が「閲覧可能」
  newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  // ダウンロードリンクを取得
  var newFileUrl = newFile.getUrl();
  // リンクを編集してPDFを埋め込むためのURLにする。そしてそれを返却。
  return newFileUrl.slice(0, -17) + "preview";
}

// 同じ名前のファイルが存在するなら削除する関数
function delExistsFile(folder, fileName) {
  var files = folder.getFilesByName(fileName);

  while (files.hasNext()) {
    var file = files.next();
    if(fileName == file.getName()) {
      folder.removeFile(file);
      return true;
    }
  }

  return false;
}