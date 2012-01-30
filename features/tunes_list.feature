# language: ja

フィーチャ: 自分の楽曲リストを表示する
  ユーザとして、自分の楽曲リスト以外の画面から
  自分の楽曲リストの画面に戻りたい

  シナリオ: ランキング画面から自分の楽曲リストを表示する
    前提    ユーザ "volpe" が登録されている
    前提    ユーザ "volpe" の楽曲リストを表示している
    もし　  "ランキング" リンクをクリックする
    ならば　"ランキング画面" を表示すること
    もし　  "自分の楽曲リスト" リンクをクリックする
    ならば　"volpe" 楽曲リストを表示すること

