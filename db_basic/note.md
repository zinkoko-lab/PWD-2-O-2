ログを見る限り、**原因はすでに PostgreSQL が起動していて、5432 番ポートを使っている**ことです。  
エラー自体はよくある＆正常な状況です。

---

## 何が起きているか

```
could not bind IPv4 address "127.0.0.1": Address already in use
Is another postmaster already running on port 5432?
```

👉 **別の PostgreSQL プロセスがすでに起動中**  
（Homebrew のサービスとして自動起動していることが多い）

その状態で `postgres -D ...` を手動実行したため、  
**二重起動になって失敗**しています。

---

## まず確認（おすすめ）

```bash
brew services list
```

もし ↓ のようになっていたら

```
postgresql@14 started
```

👉 **すでに起動済み**なので、何もしなくて OK です。

---

## PostgreSQL が本当に動いているか確認

```bash
psql postgres
```

または

```bash
pg_isready
```

これで接続できれば問題なし ✅

---

## どうしても再起動したい場合

### 方法 ①：Homebrew 経由（推奨）

```bash
brew services restart postgresql@14
```

---

### 方法 ②：いったん止めてから起動

```bash
brew services stop postgresql@14
brew services start postgresql@14
```

---

## ❌ 今回やらなくていいこと

```bash
postgres -D /usr/local/var/postgresql@14
```

これは  
👉 **手動起動用**  
👉 Homebrew 管理下では基本使わない

---

## まとめ（超重要）

-   エラーの正体：**PostgreSQL はもう起動している**
-   Homebrew 使用時は `brew services` で管理
-   `postgres -D` は使わなくて OK
-   `psql` で接続できれば完了

次は  
👉 **`social-app` から DB 接続する設定（DATABASE_URL）**  
👉 **migration / seed**  
このあたりを一緒に見れますよ 👍
