function getFollowerNum() {
  //スプレッドシートの指定
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート１")
  
  var lastRow = sheet.getLastRow()
  var lastColumn = sheet.getLastColumn()

  // 最終行に取得日付を入力
  var today = Utilities.formatDate(new Date(), "JST","yyyy/MM/dd")
  var todayCell = sheet.getRange(lastRow + 1, 1)
  todayCell.setValue(today)

  for (i = 2; i <= lastColumn; i++) {
    // ID取得
    var TwitterIdCell = sheet.getRange(2, i)
    var twitterId = TwitterIdCell.getValue()
    twitterId = twitterId.replace( /@/g , "" )

    // フォロワー数取得
    var response = UrlFetchApp.fetch("https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=" + twitterId)
    if (response.getResponseCode() == 200) {
      var contentText = response.getContentText("utf-8")
      if (contentText != "") {
        var data = JSON.parse(contentText)
        var followerNum = data[0].followers_count
      }
    }
    
    // 最終行にフォロワー数を入力
    var followerNumCell = sheet.getRange(lastRow + 1, i)
    followerNumCell.setValue(followerNum)
  }
  
}