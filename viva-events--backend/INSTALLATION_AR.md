# دليل التثبيت - VIVA Events Backend (MongoDB)

## 📋 المتطلبات

1. **Node.js** (إصدار 14+)
2. **MongoDB** (محلي أو MongoDB Atlas)

---

## 🚀 خطوات التثبيت

### الخطوة 1: استخراج الملفات

استخرج ملف `viva-events-backend-mongodb.zip` إلى مجلد على جهازك.

### الخطوة 2: تثبيت Packages

```bash
cd viva-events-backend-mongodb
npm install
```

### الخطوة 3: تثبيت MongoDB

**اختر أحد الخيارين:**

#### **الخيار 1: MongoDB محلي (Local)**

1. **حمّل MongoDB:**
   - https://www.mongodb.com/try/download/community
   - اختر نسخة Windows
   - ثبّت البرنامج

2. **شغّل MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # أو استخدم MongoDB Compass (واجهة رسومية)
   ```

3. **MongoDB Compass (اختياري - سهل جداً):**
   - حمّل من: https://www.mongodb.com/products/compass
   - افتحه
   - اتصل بـ: `mongodb://localhost:27017`
   - شوف قواعد البيانات بصرياً

#### **الخيار 2: MongoDB Atlas (سحابي - مجاني)**

هذا الخيار **أسهل** ولا يحتاج تثبيت شي!

1. **إنشاء حساب:**
   - روح على: https://www.mongodb.com/cloud/atlas
   - سجّل حساب جديد (مجاني)

2. **إنشاء Cluster:**
   - اضغط "Build a Database"
   - اختر **M0 Free** (مجاني للأبد)
   - اختر منطقة قريبة منك
   - اضغط "Create"

3. **إنشاء مستخدم:**
   - اذهب إلى: Database Access
   - Add New Database User
   - Username: `vivaadmin`
   - Password: (اختر كلمة مرور قوية واحفظها)
   - Database User Privileges: **Read and write to any database**
   - Add User

4. **السماح بالاتصال:**
   - اذهب إلى: Network Access
   - Add IP Address
   - اختر **Allow Access from Anywhere** (للتطوير)
   - Confirm

5. **الحصول على رابط الاتصال:**
   - ارجع لـ: Database → Clusters
   - اضغط **Connect**
   - اختر **Connect your application**
   - انسخ الرابط (يبدأ بـ `mongodb+srv://`)
   - **مهم:** استبدل `<password>` بكلمة مرورك الفعلية

   مثال:
   ```
   mongodb+srv://vivaadmin:كلمةالمرور@cluster0.xxxxx.mongodb.net/viva_events
   ```

---

### الخطوة 4: إعداد ملف .env

1. **انسخ الملف:**
   ```bash
   cp .env.example .env
   ```

2. **افتح `.env` وعدّله:**

   **إذا استخدمت MongoDB محلي:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/viva_events
   JWT_SECRET=my_super_secret_key_12345
   ```

   **إذا استخدمت MongoDB Atlas:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://vivaadmin:كلمةالمرور@cluster0.xxxxx.mongodb.net/viva_events
   JWT_SECRET=my_super_secret_key_12345
   ```

---

### الخطوة 5: ملء قاعدة البيانات

```bash
npm run seed
```

هذا سوف:
- ✅ ينشئ مستخدم admin
- ✅ يضيف 8 خدمات تجريبية

يجب أن ترى:
```
✅ MongoDB Connected
✅ Admin user created
✅ 8 sample services created
🎊 Database seeding completed successfully!
```

**بيانات الدخول:**
- البريد: `admin@vivaevents.com`
- كلمة المرور: `admin123`

---

### الخطوة 6: تشغيل السيرفر

```bash
npm run dev
```

يجب أن ترى:
```
🎉 ════════════════════════════════════════════════════
   VIVA Events Backend API (MongoDB)
════════════════════════════════════════════════════ 🎉

🚀 Server running on: http://localhost:5000
✅ MongoDB Connected
💾 Database: MongoDB
```

---

### الخطوة 7: اختبار

1. افتح المتصفح
2. روح على: `http://localhost:5000/health`
3. يجب أن ترى:
   ```json
   {
     "success": true,
     "message": "VIVA Events API (MongoDB) is running",
     "database": "MongoDB"
   }
   ```

---

## ✅ تم! السيرفر شغال

### 🎯 اختبار تسجيل الدخول

**باستخدام Postman:**

1. Method: **POST**
2. URL: `http://localhost:5000/api/auth/login`
3. Body → raw → JSON:
   ```json
   {
     "email": "admin@vivaevents.com",
     "password": "admin123"
   }
   ```
4. Send

يجب أن تحصل على `token` في الرد.

---

## 🔧 حل المشاكل

### مشكلة: MongooseServerSelectionError

**السبب:** MongoDB غير متصل

**الحل:**

**إذا MongoDB محلي:**
```bash
# تأكد أن MongoDB يعمل
mongod --version

# شغّله
mongod
```

**إذا MongoDB Atlas:**
1. تأكد من رابط الاتصال صحيح في `.env`
2. تأكد من كلمة المرور صحيحة
3. تأكد من IP مسموح في Network Access

### مشكلة: npm install يفشل

**الحل:**
```bash
# امسح المجلد وحاول مرة ثانية
rm -rf node_modules
npm cache clean --force
npm install
```

---

## 📊 عرض البيانات

### استخدام MongoDB Compass

1. حمّل: https://www.mongodb.com/products/compass
2. افتح البرنامج
3. اتصل:
   - **محلي:** `mongodb://localhost:27017`
   - **Atlas:** استخدم نفس رابط `.env`
4. افتح قاعدة `viva_events`
5. شوف الـ collections (users, services, orders, etc.)

### استخدام mongosh (Terminal)

```bash
# افتح MongoDB shell
mongosh

# استخدم قاعدة البيانات
use viva_events

# شوف المجموعات
show collections

# شوف المستخدمين
db.users.find()

# شوف الخدمات
db.services.find()

# عدّ الطلبات
db.orders.countDocuments()
```

---

## 🌐 مقارنة MongoDB vs MySQL

### لماذا MongoDB أسهل:

1. ✅ **لا يحتاج SQL** - استخدام JavaScript فقط
2. ✅ **إعداد أسرع** - لا حاجة لـ XAMPP
3. ✅ **Atlas مجاني** - استضافة سحابية مجانية
4. ✅ **مرن** - سهل تغيير البنية
5. ✅ **JSON** - طبيعي مع Node.js

### الفرق في الكود:

```javascript
// MySQL
const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

// MongoDB
const user = await User.findOne({ email });
```

أبسط وأوضح! 🎉

---

## 📝 الأوامر المفيدة

```bash
# تشغيل للتطوير (مع إعادة تشغيل تلقائي)
npm run dev

# تشغيل عادي
npm start

# ملء قاعدة البيانات
npm run seed

# تثبيت packages
npm install
```

---

## 🎓 تعلم المزيد عن MongoDB

- **دورات مجانية:** https://university.mongodb.com
- **التوثيق:** https://docs.mongodb.com
- **Mongoose:** https://mongoosejs.com

---

## ✅ قائمة التحقق

- [ ] Node.js مثبت
- [ ] MongoDB يعمل (محلي أو Atlas)
- [ ] npm install تم
- [ ] ملف .env معدّل
- [ ] npm run seed نجح
- [ ] npm run dev يعمل
- [ ] /health يفتح في المتصفح
- [ ] تسجيل الدخول يعمل

---

## 💡 نصائح

1. **استخدم MongoDB Atlas** - أسهل وأسرع من التثبيت المحلي
2. **استخدم MongoDB Compass** - لعرض البيانات بصرياً
3. **احفظ بيانات Atlas** - رابط الاتصال وكلمة المرور
4. **غيّر JWT_SECRET** - استخدم قيمة عشوائية قوية

---

**بالتوفيق! 🎉**

أي أسئلة، راجع README.md للتفاصيل الكاملة.
