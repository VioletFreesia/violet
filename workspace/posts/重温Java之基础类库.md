---
title: '重温Java之基础类库'
date: 2020-08-08 00:30:09
tags: [Java,知识整理]
published: true
hideInList: true
feature: https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
isTop: false
---
# 重温Java之基础类库

> 注意: 知识点整理基于Java11, 不保证以前的版本可用

## Scanner

Scanner是一个基于正则表达式文本扫描器, 可从文件, 输入流, 字符串读取数据

### 获取键盘输入

```java
public static void main(String[] args) {
        //以标准输入流作为数据源
        Scanner scanner = new Scanner(System.in);
    }
```

### 读取文件

```java
 public static void main(String[] args) throws FileNotFoundException {
        //以文件作为数据源
        Scanner scanner = new Scanner(new File("test.txt"));
    }
```

## System

`System`类代表当前Java程序运行的平台,一般用于与系统有关的信息; 如系统环境变量, 指定环境变量(JAVA_HOME), 系统所有属性, 系统当前时间等具体方法查JDK API

## Runtime

每个Java程序都有一个与之对应的`Runtime`实例, 应用程序通过该实例与其运行时环境相连. 应用程序不能自己创建`Runtime`实例, 但可以通过`getRuntime()`方法获取与之相关的`Runtime`对象. 

`Runtime`对象可以用来通知系统进行垃圾回收,清理系统资源, 并且提供了`load`和`loadLibrary`方法来加载文件和动态链接库

`Runtime`类还可以访问JVM的相关信息, 如处理器数量,内存信息等

除此之外,`Runtime`还可以单独启动一个进程来运行操作系统的命令

```java
public static void main(String[] args) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process cmd = runtime.exec("notepad.exe");
    }
```

## 常用类

### Object类

`Object`类是所有类, 数组, 枚举类的父类

常用方法

- `boolean equals(Object obj)`
- `Class<?> getClass()`: 返回该对象的运行时类
- `int hashCode()`: 返回该对象的hashCode值
- `String toString()`
- `clone()`: 用于实现自我克隆,要实现自我克隆需要完成以下步骤
  - 首先要实现`Cloneable`接口
  - 自定义实现`clone()`方法
  - 实现`clone()`方法时通过`super.clone()`, 调用Object实现的`clone()`方法来得到对象的副本
  - 注意:这样实现的克隆是"浅克隆", 只能克隆非引用类型的成员变量, 引用类型的成员变量只能浅拷贝

### Object工具类Objects

> 注意: Java为工具类的命名时候习惯是添加一个字母s,比如数组的工具类为Arrays,操作集合的工具库是Collections

`Objects`提供的方法大多是"空指针安全的",比如你不能确定一个引用变量是否为`null`,不能贸然调用`toString`方法,就可以使用`Objects`提供的`toString`方法来避免`NullPointerException`

`Objects`里的方法都是静态的

所有方法:

```java
public static boolean equals(Object a, Object b) {
    return (a == b) || (a != null && a.equals(b));
}

public static boolean deepEquals(Object a, Object b) {
    if (a == b)
        return true;
    else if (a == null || b == null)
        return false;
    else
        return Arrays.deepEquals0(a, b);
}

public static int hashCode(Object o) {
    return o != null ? o.hashCode() : 0;
}

public static int hash(Object... values) {
    return Arrays.hashCode(values);
}

public static String toString(Object o) {
    return String.valueOf(o);
}

public static String toString(Object o, String nullDefault) {
    return (o != null) ? o.toString() : nullDefault;
}

public static <T> int compare(T a, T b, Comparator<? super T> c) {
    return (a == b) ? 0 :  c.compare(a, b);
}

public static <T> T requireNonNull(T obj) {
    if (obj == null)
        throw new NullPointerException();
    return obj;
}

public static <T> T requireNonNull(T obj, String message) {
    if (obj == null)
        throw new NullPointerException(message);
    return obj;
}

public static boolean isNull(Object obj) {
    return obj == null;
}

public static boolean nonNull(Object obj) {
    return obj != null;
}
```

### String / StringBuffer / StringBuilder

- 三者皆实现了`CharSequence`接口
- `String` 为不可变类,一旦对象创建,包含在这个对象中的字符序列是不可改变的,直到这个对象被销毁
- `StringBuffer` 对象则代表一个字符序列可变的字符串, 可通过`StringBuffer`提供的`append`, `insert`, `reverse`, `setCharAt`, `setLength`等方法改变这个字符串, 可通过`toString`方法转换为普通`String`
- `StringBuilder`也代表可变字符串对象, 与`StringBuffer`基本类似, 不同的是`StringBuffer`是线程安全的, `StringBuilder`则没有实现线程安全功能, 所以性能略高
- java9以后字符串采用`byte[]`来存储,之前采用的是`char[]`来保存, Java里的`char`是2个字节, `byte`是一个字节

#### String常用方法

```java
//构造器
String();//返回包含0个字符的String对象
String(byte[] bytes, Charset chareset);//使用指定字符集将指定的byte[]解码成新的字符串
String(byte[] bytes, String charesetName);//使用指定字符集将指定的byte[]解码成新的字符串
String(byte[] bytes, int offset, int length);//使用系统默认字符集将bytes从下标offset开始长度为length的子数组解码成新的String对象
String(byte[] bytes, int offset, int length, String charsetName);//使用指定字符集将bytes从下标offset开始长度为length的子数组解码成新的String对象
String(cahr[] value, int offset, int count);//将指定的字符数组从offset开始, 长度为count的字符元素连成字符串
String(String original);//克隆字符串
String(StringBuffer buffer);
String(StringBuilder buffer);
//常用方法
char charAt(int index);//返回指定位置的字符
int compareTo(String anotherString);//比较两个字符串的大小,序列相等返回0,不相等时,从两个字符第0个字符开始比较,返回第一个不相等的字符差,如果短的字符串是长的字符串的前半截则返回两个字符串的长度差
String concat(String str);//将该字符串与str连接
boolean contentEquals(StringBuffer sb);//将该String对象与sb进行比较,当字符序列相等时返回true
boolean endsWith(String suffix);//返回该String对象是否以suffix结尾
boolean equals(Object anObject);//将该字符串与指定字符串对象比较,字符序列相等就返回true
boolean equalsIgnoreCase(String str);//与前一个方法基本相识,忽略字符的大小写
byte[] getBytes();//将String对象转换成byte数组
void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin);//将该字符串从srcBegin开始到srcEnd结束的字符串复制到dst字符数组,其中dstBegin为目标字符数组的起始复制位置
int indexOf(int ch);//找出ch在该字符串中第一次出现的位置
int indexOf(int ch, int fromIndex);//找出ch字符在该字符串中从fromIndex开始后第一次出现的位置
int indexOf(String str);//找出str子字符串在该字符串中第一次出现的位置
int indexOf(String str, int fromIndex);//找出str子字符串在该字符串从fromIndex开始第一次出现的位置
//与indexOf对应的有lastIndexOf, 找的是最后一次出现的位置
int length();//返回字符串的长度
String replace(char oldChar, char newChar);//将字符串中的第一个oldChar替换成newChar
boolean startWith(String prefix);
boolean startWith(String prefix, int toffset);
String subString(int beginIndex);
String subString(int beginIndex, int endIndex);
char[] toCharArray();
String toLowercase();
String UpperCase();
String valueOf(X x);//将基本类型转为字符串
```

#### StringBuffer与StringBuilder常用方法

```java
//除了拥有String的常用方法外,还有额外的用于改变字符串的方法
//StringBuffer与StringBuilder有两个属性: length与capacity, 其中的length表示其包含的字符序列的长
//度,其中的length是可变的, 可通过setLength(int len)方法来改变
append();//追加
insert();//插入
replace();//替换
reverse();//翻转
```

### Math类

`Math`的所有方法均为类方法, 除了方法外还有两个类变量`PI`和`E`

`Math`中有关于三角函数, 对数运算, 指数运算等复杂的数学计算方法, 具体函数查看JDK API

### TheadLocalRandom 与 Random

`Random`类专门用于生成一个伪随机数, 它有连个构造器, 一个构造器使用默认的种子(以当前时间为种子), 另一个构造器需要程序员显式传入一个long型整数的种子

`TheadLocalRandom`是`Random`的增强版, 在并发访问下使用`TheadLocalRandom` 代替`Random`可以减少多线程资源竞争, 最终保证系统具有更好的线程安全性

### BigDecimal类

常用方法

```java
//构造器
BigDecimal(String val);//尽量使用基于字符串的构造函数
valueOf(X x);//将其他基本类型转为BigDecimal
add();//加
subtract();//减
multiply();//乘
divide();//除
pow();//乘方
```

> 注意: 在创建`BigDecimal`对象时,不要使用`double`类型的数据作为构造器参数,同样会发生精度丢失

## 日期, 时间类

### Date(java.util包下)

>  `Date`类是一个糟糕的时间类, 现在已经基本废弃

### Calendar

> `Calendar`类是一个接口,并且使用起来也很不方便

### Java8中新的日期与时间类

> Java8专门新增了一个`java.time`包,该包下包含了许多常用的类

#### Clock

> 该类用于获取指定指定时区的当前日期, 时间. 可以取代`System`类的`currentTimeMillis()`方法

常用函数

```java
//获取clock对象
var clock = Clock.systemUTC();
//获取当前时间
clock.instant();
//获取毫秒数
clock.millis();
//在某个clock时间上加一段时间
Clock.offset(clock,Duration.ofSeconds(8000));
```

#### Duration

> 该类代表持续时间,可以方便的获取一段时间

常用方法

```java
//将8000秒转为转为分钟,小时,天等 注意转换后为整型
Duration duration = Duration.ofSeconds(8000);
System.out.println(duration.toMinutes());
System.out.println(duration.toHours());
System.out.println(duration.toDays());
```

#### Instant

> 代表一个具体的时刻,可以精确到纳秒

常用方法

```java
Instant.now();//获取当前时刻
Instant.now().plusSeconds(6000);//在现在时刻上加上6000秒得到新时刻
var instant = Instant.parse("2020-08-07T11:04:20.539072900Z");//字符串解析为Instant对象
instant.plus(Duration.ofHours(5));//在instant上加5个小时
instant.minus(Duration.ofHours(2));//在instant上减2个小时
```

#### LocalDate

> 该类代表不同时区的日期

常用方法

```java
//当前时间
now();
now(Clock clock);
//减法,减去几年,几月,几周,几日
minusXxx();
//加法,加上几年,几月,几周,几日
plusXxx();
```

#### LocalTime

> 该类代表不带时区的时间,使用方法与LocalDate类似

#### LocalDateTime

> 该类代表不带时区的日期,时间, 使用方法与LocalDate类似

#### MothDay

> 该类仅代表月日

#### Year

> 该类仅代表年

#### YearMonth

> 该类仅代表年月

#### ZonedDateTime

> 该类代表一个时区化的日期, 时间

#### ZoneId

> 该类代表一个时区

#### DayOfWeek

> 这是一个枚举类, 定义了周日到周六的枚举值

#### Month

> 这个一个枚举类, 定义了一月到十二月的枚举值

## 变量处理与方法处理相关类

### 方法处理MethodHandle

> `MethodHandle`为Java增加了方法引用的功能, 方法引用的概念有点类似于C语言的"函数指针". 这种方法引用是一种轻量级的引用方式, 他**不会检查方法的访问权限**, 也不管方法所属的类, 实例方法或静态方法, `MethodHandle`就是简单代表特定方法, 并可通过MethodHandle来调用

使用MethodHandle需要涉及以下类

- `MethodHandles`: `MethodHandle`的工厂类, 提供了一系列的静态方法用于获取`MethodHandle`
- `MethodHandles.Lookup:` `Lookup`静态内部类也是`MethodHandle`, `VarHandle`的工厂类, 专门用于获取`MethodHandle`和`VarHandle`
- `MethodType`: 代表一个方法类型. `MethodType`根据方法的形参, 返回值类型来确定方法类型

示例:

```java
public class Test01 {
    public static void hello() {
        System.out.println("你好! 世界");
    }

    public String hello(String name) {
        return "你好" + name;
    }

    public static void main(String[] args) throws Throwable {
        MethodType type = MethodType.methodType(void.class);
        MethodHandle hello = MethodHandles.lookup().findStatic(Test01.class, "hello", type);
        hello.invoke();
        MethodHandle hello1 = MethodHandles.lookup().findVirtual(Test01.class, "hello",
                MethodType.methodType(String.class, String.class));
        Object result = hello1.invoke(new Test01(),"小明");
        System.out.println(result);
    }
}
```

> 从上面程序可以知道, 程序使用`MethodHandles.Lookup`对象根据类名, 方法名, 方法类型来获取`MethodHandle`对象. 由于此处的方法只是一个字符串, 该字符串可以来源于变量, 配置文件等,意味着可以动态的调用不同的方法

### 变量处理VarHandle

> `VarHandle`主要用于动态操作数组元素或对象的成员变量. `VarHandle`与`MethodHandle`非常相似. 他需要通过`MethodHandles`来获取实例, 接下来调用`VarHandle`的方法即可动态操作指定数组的元素或指定对象的成员变量, 操作成员变量时**会检查访问权限**

示例:

```java
public class User {
    public String name;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                '}';
    }
}

public class Test01 {
    public static void main(String[] args) throws Throwable {
        String[] strings = {"java", "python", "javascript"};
        VarHandle varHandle = MethodHandles.arrayElementVarHandle(String[].class);
        boolean b = varHandle.compareAndSet(strings, 1, "python", "kotlin");
        System.out.println(b);//true
        System.out.println(Arrays.toString(strings));//[java, kotlin, javascript]
        VarHandle name = MethodHandles.lookup().findVarHandle(User.class, "name", String.class);
        User user = new User();
        System.out.println(name.get(user));
        name.set(user,"violetfreesia");
        System.out.println(name.get(user));
    }
}
```

> `VarHandle`与`MethodHandle`一样, 是一种动态调用机制, 当程序通过`MethodHandles.Lookup`对象来获取成员变量时, 可根据字符串名称来获取成员变量, 这个字符串名称同样可以是动态改变的, 因此非常灵活

## 格式化相关

### NumberFormat格式化数字

> `Format`抽象类有两个子类`NumberFormat`和`DateFormat`, 分别实现数字和日期的格式化
>
> `NumberFormat`是一个抽象基类, 无法直接创建其实例,可以通过如下方法来获取实例对象

```java
getCurrencyInstance();//获取一个默认Locale的货币格式器, 也可指定Locale则获取对应的货币格式器
getIntegerInstance();//获取默认Locale的整数格式器, 也可指定Locale则获取对应的整数格式器
getNumberInstance();//获取默认Locale的通用数值格式器, Locale则获取对应的通用数值格式器
getPercente();//获取默认Locale的百分数格式器, 也可指定Locale则获取对应的百分数格式器
```

> 获得的`NumberFormat`对象都通过`format()`进行格式化, parse()进行转换为原格式

### DateFormat格式化日期, 时间

> 与`NumberFormat`类似, `DateFormat`是一个抽象基类, 无法直接创建其实例,可以通过如下方法来获取实例对象

```java
getDateInstance();//日期格式化
getTimeInstance();//时间格式化
getDateTimeInstance();//日期时间格式化
//三个函数皆可传入样式, Locale等参数, 不传则使用默认的
```

> `DateFormat`有4个静态常量: `FULL`, `LONG`, `MEDIUM`, `SHORT`, 分别代表格式化后的四种样式, 在调用获取`DateFormat`对象的函数 (上面三个) 时传入对应的格式
>
> 获得的`DateFormat`对象都通过`format()`进行格式化, parse()进行转换为原格式

### SimpleDateFormat格式化日期时间

> `SimpleDateFormat`是`DateFormat`的子类, 功能更强大, 使用更方便

```java
public static void main(String[] args) throws ParseException {
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("Gyyyy年中第D天");
        String dateStr = format.format(date);
        System.out.println(dateStr);//公元2020年中第220天
        String date01="2020****八月****07";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy****MMM****d");
        System.out.println(simpleDateFormat.parse(date01));//Fri Aug 07 00:00:00 CST 2020
}
```

> 这里只展示简单用法, 详细用法查询JDK API

### Java8新增的日期, 时间格式器

> `DateTimeFormatter`是Java8新增的格式器类, 在`java.time.format`包下, 该类比前面的`SimpleDateFormat`类的功能还要强大

获取`DateTimeFormatter`对象的常见方式

- 直接使用静态常量创建`DateTimeFormatter`对象. `DateTimeFormatter`类中包含了大量形如`ISO_LOCAL_DATE`, `ISO_LOCAL_TIME`, `ISO_LOCAL_DATE_TIME`等静态常量, 这些常量本身就是`DateTimeFormatter`的实例
- 使用代表不同风格的枚举值来创建`DateTimeFormatter`格式器. 在`FormatStyle`枚举类中定义了`FULL`, `LONG`, `MEDIUM`, `SHORT`四个枚举值, 分别代表日期, 时间的不同风格
- 根据模式字符串来创建`DateTimeFormatter`格式器, 该方法类似于`SimpleDateFormat`

#### 使用DateTimeFormatter格式化

格式化的方式有两种:

- 调用使用`DateTimeFormatter`的`format(TemporalAccessor temporal)`方法执行格式化, 其中`LocalDate`, `LocalTime`, `LocalDateTime`等类都是`TemporalAccessor`接口的实现类
- 调用`LocalDate`, `LocalTime`, `LocalDateTime`等日期, 时间对象的`format(DateTimeFormatter formatter)`方法执行格式化

示例: 

```java
public static void main(String[] args) throws ParseException {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter isoDateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME;
        System.out.println(isoDateTimeFormatter.format(now));//2020-08-08T00:16:54.8887408
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL, FormatStyle.MEDIUM);
        System.out.println(dateTimeFormatter.format(now));//2020年8月8日星期六 上午12:16:54
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("Gyyyy年MM月dd日 HH:mm:ss");
        System.out.println(timeFormatter.format(now));//公元2020年08月08日 00:16:54
}
```

#### 使用DateTimeFormatter解析字符串

> 解析字符串需要通过日期, 时间对象提供的parse(CharSequence text, DateTimeFormatter formatter)方法进行解析

示例:

```java
public static void main(String[] args) throws ParseException {
        String dateTime = "公元2020年08月08日 00:16:54";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("Gyyyy年MM月dd日 HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(dateTime, formatter);
        System.out.println(localDateTime);//2020-08-08T00:16:54
}
```

