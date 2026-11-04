Markdown
# タスク管理アプリ (Task Manager)
> 毎日のタスクをシンプルかつ効率的に管理するフルスタックWebアプリケーション

---

## 📱 アプリケーションの概要
直感的なUIで日常のタスクの「追加」「完了チェック」「削除」をシームレスに行えるタスク管理ツールです。
バックエンドにSpring Boot、フロントエンドにReactを採用し、軽量かつ高速な操作感を実現しています。

---

## 💡 開発した背景や理由
学習したWeb開発技術（Java / Spring Boot / React）のアウトプットおよび実践的なCRUD処理の理解を深めるために開発しました。
日々のToDo管理において、複雑な機能を省いて「とにかく素早くタスクを追加・処理できるシンプルさ」を追求しています。

---

## 🔗 アプリケーションの URL
* **本番環境**: 現在未公開（ローカル環境のみ）
* ※デプロイ完了後にURLを追記予定

---

## 🖼️ アプリケーションのデモ画像
*(※画面のスクリーンショットを掲載する場所です)*

---

## 🛠️ 主な使用技術

### バックエンド
* **言語**: Java 17
* **フレームワーク**: Spring Boot 3.x
* **データベース**: H2 Database (In-Memory)
* **ORM**: Spring Data JPA
* **ビルドツール**: Gradle

### フロントエンド
* **ライブラリ**: React 18
* **ビルドツール**: Vite
* **言語**: JavaScript (ES6+)
* **スタイル**: CSS3 (Custom CSS)

### バージョン管理・その他
* **Git / GitHub**

---

## 📐 ER図

```mermaid
erDiagram
    TASKS {
        bigint id PK "タスクID (自動採番)"
        varchar title "タスク内容"
        boolean completed "完了フラグ (true/false)"
    }

[ Frontend (React / Vite) ] 
       │  http://localhost:5173
       ▼ (REST API / JSON)
[ Backend (Spring Boot API) ] 
       │  http://localhost:8080/api/tasks
       ▼
[ H2 Database (In-Memory) ]

🚀 ローカル環境での起動方法
動作要件
Java 17 以上
Node.js 18 以上 (npm 9 以上)

1. リポジトリのクローン
Bash
git clone [https://github.com/takenoriohte-cmd/task-manager-app.git](https://github.com/takenoriohte-cmd/task-manager-app.git)
cd task-manager-app

2. バックエンド (Spring Boot) の起動
Bash
cd taskmanager
./gradlew bootRun
APIサーバーが http://localhost:8080 で起動します。

3. フロントエンド (React) の起動
新しいターミナルを開き、以下を実行します。

Bash
cd frontend
npm install
npm run dev
ブラウザで http://localhost:5173 にアクセスしてアプリケーションを使用します。


---

### 作業手順

<Steps>
<Step subtitle="2分" title="1. README.md ファイルを編集する">
1. VS Codeでプロジェクト直下（または `frontend` / `taskmanager` の親階層）にある `README.md` を開きます。
2. 上記のコードをコピーして貼り付け、保存します。
*Verification:* ファイルが正常に保存されること。
</Step>

<Step subtitle="1分" title="2. 変更をGitHubへコミット＆プッシュする">
PowerShellを開き、以下のコマンドを実行します。
```powershell
cd "C:\Users\takenori ohte\Desktop\task-manager"
git add README.md
git commit -m "Update README with project architecture and usage details"
git push -u origin main
