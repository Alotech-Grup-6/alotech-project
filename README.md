
# ALOTECH FULLSTACK BOOTCAMP BİTİRME PROJESİ


Projemiz bir web uygulaması olup, bu web uygulaması SSO (Single-Sign-On) istemci ve servisini içerir. Authorization (yetkilendirme),  authentication (kimlik doğrulama), kullanıcı üretme, kullanıcı bilgileri güncelleme, kullanıcı silme ve kullanıcı bilgilerinin MySQL ile saklanmasını içerir. React, Node.js ile oluşturulmuştur.

<br/>

## 🚩 Projenin Amacı

---

Projemiz basit bir web uygulaması olup bu web uygulaması, 
sayfa her yüklendiğinde, access token'a sahip olup olmadığını 
kontrol edecek. Access token'ın aktif olup olmama durumuna ve 
kullanıcının tipine göre kullanıcıyı sayfalara yönlendirecektir.

Aşağıdaki tabloyu inceleyecek olursak kullanıcı sso-consumer'dan giriş yaptığını varsayalım. sso-consumer'da kullanıcının cookie'sinde token kontrolü yapılır. Kullanıcının token ı yoksa sso-consumer kullanıcıyı sso-auth'a yani "Login Sayfası"na yönlendirir. Kullanıcı Login Sayfası'nda giriş yapar. Kullanıcının kullanıcı adı ve şifresi kontrol edilir. Eğer veritabanına kayıtlı ise kullanıcıya yeni token üretilir ve kullanıcı sso-consumer sayfasına yönlendirilir. sso-consumer'da kullanıcıya ait kullanıcı ilgileri gösterilir.

Kullanıcı sso-consumer'dan giriş yaptığında token'ı var ise kullanıcının admin veya user olup olmadığı kontrol edilir. Kullanıcı admin değil ise sadece sso-consumer sayfasına ulaşabilir. Kullanıcı admin ise tüm sayfalara erişebilme yetkisi vardır.

Kullanıcı ilk user-manager'dan giriş yapmış olduğunu varsayalım. Bu durumda kullanıcının user-manager'da token'ın aktif olup olmadığı kontrol edilir.
Kullanıcının token'ı aktif değil veya token'ı yoksa kullanıcı sso-auth'a yani "Login Sayfası" na yönlendirilir. Kullanıcı Login Sayfası'ndan giriş yaparak yeni bir token'a sahip olur. Eğer kullanıcı admin ise tüm sayfalara erişim hakkı vardır. Ayrıca user-manager'da kullanıcı listesini görme, kullanıcı silme, kullanıcı bilgileri ile güncellleme yapabilir.

Kullanıcı user-manager'dan giriş yaptığında  token'ı var ise kullanıcının admin veya user olup olmadığı kontrol edilir. Kullanıcı admin değil ise sadece sso-consumer sayfasına ulaşabilir. Kullanıcı admin ise tüm sayfalara erişebilme yetkisi vardır.


<br/>

<img src="image/shema.jpeg">

<br/>

## 💣 Kullanılan Teknolojiler

---

**İstemci:** React

**Sunucu:** Node, Express

**Database:** MySQL

<br/>

## 💻 Kurulum

---

Github Repository'e bir ⭐ bırakın.

🔗 [Node.js](https://nodejs.org/en/) yükleyin.

GIT istemcinizde projeyi klonlayın.

```bash
  git clone https://github.com/Alotech-Grup-6/alotech-project.git
```

Proje dizininde "sso-auth" a gidin.

```bash
  cd sso-auth
```

Proje dizininde "sso-auth server" a gidin.

```bash
  cd server
```

Gerekli paketleri yükleyin.

```bash
  npm install package.json
```

Proje dizininde "sso-auth" a gidin.

```bash
  cd sso-auth
```

Proje dizininde "sso-auth client" a gidin.

```bash
  cd client
```

Gerekli paketleri yükleyin.

```bash
  npm install package.json
```

Proje dizininde "user-manager" a gidin.

```bash
  cd user-manager
```

Proje dizininde "user-manager server" a gidin.

```bash
  cd server
```

Gerekli paketleri yükleyin.

```bash
  npm install package.json
```

Proje dizininde "user-manager" a gidin.

```bash
  cd user-manager
```

Proje dizininde "user-manager client" a gidin.

```bash
  cd client
```

Gerekli paketleri yükleyin.

```bash
  npm install package.json
```
Proje dizininde "sso-consumer" a gidin.

```bash
  cd sso-consumer
```

Proje dizininde "sso-consumer client" a gidin.

```bash
  cd client
```

Gerekli paketleri yükleyin.

```bash
  npm install package.json
```

".env-sample"  kontrol edilir. Gerekli bilgileri girin.


Tüm client ve server'larda sunucuyu çalıştırın.

```bash
  npm run start
```
🔗 "http://localhost:3020" adresini ziyaret edin.


URL Tablosu Bilgileri:

<img src="image/urlinfo.PNG"/>

Kullanıcı user bilgileri şunlardır:

<img src="image/userinfo.PNG"/>



<br/>

## 	🔑 Ortam Değişkenleri

---

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini ".env" dosyanıza eklemeniz gerekecek.
("PORT", "HOST", "USER", "PASSWORD", "DATABASE")


Server'ın çalıştığı port: "PORT"

Çalışılan Host: "HOST"

MySQL Kullanıcı Adı: "USER"

MySQL Kullanıcı Şifresi: "PASSWORD"

MySQL Kullanılan Dosya Adı: "DATABASE"

<br/>

## 📁 Gereklilikler

---

🔹 Node.js v16.13.1

🔹 React

🔹 Express

🔹 Mysql

🔹 Bcrypt

🔹 Cors

🔹 Dotenv

🔹 Uuid

🔹 Axios

🔹 js-cookie

🔹 Jest

🔹 Süper Test


<br/>

## ❗ Testler

---

Proje dizininde "sso-auth" a gidin.

```bash
  cd sso-auth
```

Proje dizininde "sso-auth server" a gidin.

```bash
  cd server
```

Testi başlatın.

```bash
  npm test
```

Proje dizininde "user-manager" a gidin.

```bash
  cd user-manager
```

Proje dizininde "user-manager server" a gidin.

```bash
  cd server
```

Testi başlatın.

```bash
  npm test
```

**Test Sonuçları**

SSO - Auth İçin Test Sonuçları 

<div style="text-align:center"><img src="image/routetest.jpeg" /></div>

<br/>

User - Manager İçin Test Sonuçları 

<div style="text-align:center"><img src="image/crudtest.jpeg" /></div>

<br/>

## 📝 Yazarlar

---

✏️ [Büşra BİNER](https://github.com/busssu)

✏️ [Doğancan ÜLGÜ](https://github.com/dogancanulgu)

✏️ [Emre PALA](https://github.com/emrpla)

✏️ [İlkay Murat ERTEKİN](https://github.com/imertekin)

<br/>

## Teşekkür

---

Projemizde herzaman bize destek olan ve sorularımıza büyük 
bir sabırla cevap veren Alotech ekibinden Ali Koyuncu'ya ve Alotech
ekibine sonsuz teşekkürlerimizi sunarız.

<br/>

## 📜 Lisans

---

🔹 [MIT](https://choosealicense.com/licenses/mit/)

  
