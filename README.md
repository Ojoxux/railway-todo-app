# Railway中級編 Todoアプリをアップデートしよう

## 初期設定

### 必要なツール

1. Node.js v16以降
2. Yarn v1

このRailwayに取り組む方はすでにインストールできていると思いますがされていない方はインストールしてください。  
初期設定は原則HTML/CSS/JavaScript Railway, React.js Railwayと同様となります。

#### railway-todo-appリポジトリのFork

画面右上にあるForkより[railway-todo-app](https://github.com/TechBowl-japan/railway-todo-app)のリポジトリを自分のアカウントにForkしてください。

#### railway-todo-appリポジトリのClone

作成したリポジトリを作業するディレクトリにクローンしましょう。

- Macなら Terminal.app(iTerm2などでも良い)
- Windowsなら PowerShell(GitBashなどのインストールしたアプリでもう良いです。アプリによってはコマンドが異なることがあります)  
  で作業するディレクトリを開き、次のコマンドでForkしたReact.js　Railwayのリポジトリをローカルにクローンしてください。

```powershell
git clone https://github.com/{GitHubのユーザー名}/railway-todo-app.git
```

SSHでクローンを行う場合には、次のようになります

```powershell
git clone git@github.com:[GitHubのユーザー名]/railway-todo-app.git
```

#### .envファイルの設定

クローンしたリポジトリには.env.sampleというファイルがあります。それをコピーしたものを.envにファイル名を変更してください。  
フォークして最初の状態ではAPIのURLを.envファイルから読み込むようになっています。それを自身の.envに追記してください。
APIのURLはTechTrainサービスにログインし、問題文の中で案内されているものを使用してください。

#### パッケージのインストール

クローンしたばかりのリポジトリは歯抜けの状態なので、必要なファイルをダウンロードする必要があります。 10 分程度掛かることもあるため、気長に待ちましょう。上から順番に **１つずつ** コマンドを実行しましょう：

```powershell
cd railway-todo-app

yarn install
```

#### ローカルサーバの起動

以下コマンドを実行します。

```powershell
yarn start
```

#### やったことのメモ

1.yarn upgrade --latestでパッケージを最新にしました。(done) 2.

#### やることリスト

- react-router-domをアップデートしたせいで、大量のエラーが出ているので、それを解消する
- とりまESLintとPrettierはOK(だったはず)

#### メモ

- EditTask.jsx
- NewList.jsx
- SignIn.jsx
- SignUp.jsx
- Router.jsx
