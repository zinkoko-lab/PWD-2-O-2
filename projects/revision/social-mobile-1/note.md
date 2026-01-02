Mac で **Xcode をアンインストール → 再インストール**する手順を、  
**確実＆トラブルが起きにくい方法**でまとめます。

---

## ① Xcode をアンインストールする

### 1️⃣ アプリ本体を削除

Finder → **アプリケーション** → `Xcode.app` を削除

```bash
sudo rm -rf /Applications/Xcode.app
```

---

### 2️⃣ 関連ファイル（キャッシュ・設定）を削除（重要）

そのままだと不具合が残ることがあります。

```bash
rm -rf ~/Library/Developer/Xcode
rm -rf ~/Library/Caches/com.apple.dt.Xcode
rm -rf ~/Library/Preferences/com.apple.dt.Xcode.plist
```

必要に応じて 👇 も削除

```bash
sudo rm -rf /Library/Developer/CommandLineTools
```

---

### 3️⃣ Xcode のパスをリセット

```bash
sudo xcode-select --reset
```

---

## ② Mac を再起動（推奨）

ここで一度 **再起動**するとクリーンになります 👍

---

## ③ Xcode を再インストール

### 方法 ①（おすすめ）：App Store

1. App Store を開く
2. **Xcode** を検索
3. インストール

✔ 安定  
✔ 署名エラーが起きにくい

---

### 方法 ②：Apple Developer サイト（特定バージョンが必要な場合）

https://developer.apple.com/download/all/

-   Apple ID でログイン
-   Xcode `.xip` をダウンロード
-   解凍 → `/Applications` に移動

---

## ④ 初期設定（必須）

### ライセンス同意

```bash
sudo xcodebuild -license accept
```

---

### Command Line Tools を設定

```bash
sudo xcode-select --switch /Applications/Xcode.app
```

確認：

```bash
xcode-select -p
```

👉

```
/Applications/Xcode.app/Contents/Developer
```

になっていれば OK

---

## ⑤ 正常確認

```bash
xcodebuild -version
```

```bash
clang --version
```

エラーが出なければ成功 🎉

---

## よくあるトラブルと対処

### ❌ `xcode-select: error`

```bash
sudo xcode-select --install
```

---

### ❌ Command Line Tools だけ入ってしまう

```bash
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --switch /Applications/Xcode.app
```

---

### ❌ npm / node-gyp / Prisma / bcrypt が動かない

👉 **Xcode 再インストールでほぼ解決します**

---

## まとめ（最短手順）

```bash
sudo rm -rf /Applications/Xcode.app
rm -rf ~/Library/Developer/Xcode
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --reset
# 再起動
# App Store で Xcode 再インストール
sudo xcodebuild -license accept
sudo xcode-select --switch /Applications/Xcode.app
```

---

もし

-   **Node / Prisma / bcrypt / tsx** 関連で再インストールしたなら  
    👉 その後にやるべき確認コマンドも整理しますよ。
