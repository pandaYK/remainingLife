# 1. APIがもつ機能
取り扱うデータの種類や操作内容により、以下の７つの機能を提供します。  

* 統計表情報取得
* メタ情報取得
* 統計データ取得
* データセット登録
* データセット参照
* データカタログ情報取得
* 統計データ一括取得

## 各機能
### 統計表情報取得
e-Stat で提供している統計表の情報を取得します。リクエストパラメータの指定により条件を絞った情報の取得も可能です。
### メタ情報取得
指定した統計表IDに対応するメタ情報（表章事項、分類事項、地域事項等）を取得します。  
### 統計データ取得
指定した統計表ID又はデータセットIDに対応する統計データ（数値データ）を取得します。  
### データセット登録
統計データを取得する際の取得条件を登録します。統計データの取得における絞り込み条件を「データセット」として指定することで、取得条件を省略することができます。
### データセット参照
登録されているデータセットの絞り込み条件等を参照します。データセットIDが指定されていない場合は、利用者が使用できるデータセットの一覧が参照可能です。  
###データカタログ情報取得
政府統計の総合窓口（e-Stat）で提供している統計表ファイルおよび統計データベースの情報を取得できます。統計表情報取得機能同様に、リクエストパラメータの指定により条件を絞った情報の取得も可能です。  
### 統計データ一括取得
複数の統計表ID又はデータセットIDを指定して一括で統計データ（数値データ）を取得します。  

# 2. APIの利用方法
指定されたURLに対してリクエストを送信することで、各APIを利用することができます。URLで取得するデータ形式を選択できます。httpsによるリクエストも可能となっております。  
各APIを利用するには、アプリケーションIDを必ず指定する必要があります。利用登録を行い、アプリケーションIDを取得して下さい。  
<!-- myself -->
REST web API  
## APIs
URL: http(s)://api.e-stat.go.jp/rest/<バージョン>/app/<format>/<do>?<query_param>  
e.g.: http(s)://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?<query_param>  
available versions: 1？, 2？, **2.1**  

available format:  
* xml: no (should delete empty directory, like **~/app/getStatsList**)
* json: /json
* jsonp: /jsonp

| purpose                | method | do             | param | ways                  | specific                                      |
| ---------------------- | ------ | -------------- | ----- | --------------------- | --------------------------------------------- |
| 統計表情報取得         | GET    | getStatsList   | Yes   | xml, json, jsonp      |                                               |
| メタ情報取得           | GET    | getMetaInfo    | Yes   |                       |                                               |
| 統計データ取得         | GET    | getStatsData   | Yes   | xml, json, jsonp, csv | csv (app/getSimpleStatsData?<パラメータ群>)   |
| データセット登録       | POST   | postDataset    | NO    |                       | application/x-www-form-urlencoded             |
| データセット参照       | GET    | refDataset     | Yes   | xml, json, jsonp      |                                               |
| データカタログ情報取得 | GET    | getDataCatalog | Yes   | xml, json, jsonp      |                                               |
| 統計データ一括取得     | POST   | getStatsDatas  | Yes   | xml, json             | csv (/app/getSimpleStatsDatas?<パラメータ群>) |

# 3. APIパラメータ
各APIは、リクエスト送信時にパラメータの指定が必要です。  
各パラメータは「パラメータ名=値」のように名称と値を’=’で結合し、複数のパラメータを指定する場合は「パラメータ名=値&パラメータ名=値&…」のようにそれぞれのパラメータ指定を’&’で結合して下さい。また、パラメータ値は必ずURLエンコード(文字コードUTF-8)してから結合して下さい。  
リクエスト方式がGETの場合は「2.APIの利用方法」の各リクエストURLの<パラメータ群>の位置に、POSTの場合はリクエストのボディ部に、それぞれ 結合した文字列を指定して下さい。  

<!-- myself -->
parameter as **URL query** for GET, **request body** for POST.   
needs URL encoding  

# 4. APIの出力データ
