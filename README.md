# 📚 Student Exam Demo

**Student Exam Demo** — orta məktəb şagirdlərinin imtahan nəticələrinin idarə edilməsi üçün hazırlanmış veb tətbiqidir.  
Layihə **ASP.NET Core Web API** (backend) və **Angular** (frontend) texnologiyaları üzərində qurulmuşdur.

---

## 🗂️ Layihə Strukturu

```
/
├── StudentExamDemo.API/            → ASP.NET Core Web API (backend)
├── StudentExamDemo.Application/    → Servis və DTO-lar
├── StudentExamDemo.Domain/         → Entity-lər (modellər)
├── StudentExamDemo.Infrastructure/ → DbContext, Migration-lar
└── client/                         → Angular frontend
```

---

## ⚙️ Tələblər

Layihəni işlətməzdən əvvəl aşağıdakı proqramların quraşdırılmış olduğundan əmin olun:

| Proqram | Versiya | Yükləmə linki |
|---|---|---|
| .NET SDK | 9.0+ | https://dotnet.microsoft.com/download |
| Node.js | 18.0+ | https://nodejs.org/en/download |
| Angular CLI | 17.0+ | `npm install -g @angular/cli` |
| SQL Server | istənilən | https://www.microsoft.com/sql-server |
| Git | istənilən | https://git-scm.com |

---

## 🚀 Quraşdırma və İşə Salma

### 1. Frontend — Kodu Clone edin

```bash
git clone https://github.com/fehminqurbanli/StudentExamManagementSystem_UI.git
cd StudentExamManagementSystem_UI
```

Asılılıqları quraşdırın:

```bash
npm install -g @angular/cli
npm install
```

---

### 2. Backend — ASP.NET Core API

Aşağıdakı linki Visual Studio-da clone edin:

```
https://github.com/fehminqurbanli/StudentExamManagementSystem.git
```

#### 2.1. Verilənlər bazası bağlantısını konfiqurasiya edin

`StudentExamDemo.API` qovluğundakı `appsettings.json` faylını açın və `ConnectionStrings` hissəsini öz SQL Server məlumatlarınıza uyğun dəyişin:

```json
{
  "ConnectionStrings": {
    "StudentExamConnection": "Server=YOUR_SERVER_NAME;Database=StudentExamDemoDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> 💡 `YOUR_SERVER_NAME` əvəzinə SQL Server adınızı yazın. Məsələn: `localhost\SQLEXPRESS` və ya `.\SQLEXPRESS`

#### 2.2. Migration-ların tətbiqi

Proyekt run olduqda auto migration avtomatik olaraq məlumat bazası və seed data yaradacaq.

#### 2.3. API-ni işə salın

```bash
dotnet run
```

API uğurla başladıqda terminaldə aşağıdakına bənzər bir çıxış görəcəksiniz:

```
Now listening on: https://localhost:7286
Now listening on: http://localhost:5115
```

> ⚠️ Port nömrələri (`7286`, `5115`) hər maşında fərqli ola bilər. Terminalda görünən portu yadda saxlayın — Angular tərəfində lazım olacaq.

#### 2.4. Swagger — API Sənədləşməsi

API işə düşdükdən sonra bütün endpointləri interaktiv şəkildə test etmək üçün Swagger UI-ə daxil ola bilərsiniz:

```
https://localhost:7286/swagger
```

---

### 3. Frontend — Angular

#### 3.1. API URL-ini konfiqurasiya edin

`client/src/environments/environment.ts` faylını açın və `apiUrl` dəyərini backend-in işlədiyi porta uyğun dəyişin:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7286/api'
};
```

> 💡 Port nömrəsi backend terminalında gördüyünüz nömrə ilə eyni olmalıdır.

#### 3.2. Angular tətbiqini işə salın

```bash
ng serve
```

Tətbiq uğurla başladıqda brauzerdə aşağıdakı ünvana keçin:

```
http://localhost:4200
```

---

## 🖥️ Tətbiqin İstifadəsi

Tətbiq 3 əsas bölmədən ibarətdir:

### 📖 Fənnlər (`/subjects`)
- Yeni fənn əlavə etmək
- Mövcud fənni redaktə etmək
- Fənni silmək

### 🎓 Şagirdlər (`/students`)
- Yeni şagird qeydiyyatı
- Şagird məlumatlarını yeniləmək
- Şagirdi silmək

### 📝 İmtahanlar (`/exams`)
- İmtahan nəticəsi əlavə etmək (fənn və şagird seçilir)
- İmtahan məlumatlarını yeniləmək
- İmtahan qeydini silmək

---

## 🔧 Ümumi Problemlər və Həlləri

### ❌ Verilənlər bazası yaranmır
SQL Server-in işlədiyini yoxlayın və `appsettings.json` faylındakı connection string-in düzgün olduğundan əmin olun.

### ❌ Angular API-yə qoşula bilmir (CORS xətası)
Backend-in `Program.cs` faylında CORS siyasətinin `http://localhost:4200` ünvanına icazə verdiyindən əmin olun:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});
```

### ❌ Port uyğunsuzluğu
Backend portu dəyişibsə `environment.ts` faylındakı `apiUrl`-i yeniləyin.

---

## 🛠️ İstifadə Edilən Texnologiyalar

**Backend:**
- ASP.NET Core 9 Web API
- Entity Framework Core
- AutoMapper
- SQL Server
- Repository Pattern / Service Layer

**Frontend:**
- Angular 17+
- Angular Material
- RxJS
- TypeScript

---
