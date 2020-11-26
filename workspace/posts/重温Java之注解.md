---
title: '重温Java之注解'
date: 2020-08-19 21:40:42
tags: [Java,知识整理]
published: true
hideInList: true
feature: https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
isTop: false
---


# 重温Java之注解

>  注意: 知识点整理基于Java11, 不保证以前的版本可用

## 基本注解

- `@Override:` 限定重写父类方法
- `@Deprecated:` 标明某个程序元素(类, 方法)已经过时, 可传入参数since表示从哪个版本开始过时, forRemoval=true表示未来会删除该方法
- `@SuppressWarnings`: 抑制编译器警告
- `@SafeVarargs`; 抑制"堆污染"警告
- `@FunctionalInterface`: 指定某个接口必须是函数式接口

## 元注解

> 元注解: 修饰注解 (注解定义) 的注解

### @Retention

> 只能用于修饰注解定义, 用于指定被修饰的注解可以保留多长时间, @Retention包含一个RetentionPolicy类型的value成员变量, 所以使用@Retention是必须为该value成员变量指定值

value的值只能是以下三种:

- `RetentionPolicy.CLASS`: 注解被记录在class文件中, 运行时, JVM不可获得注解信息, 这是默认值
- `RetentionPolicy.RUNTIME:` 注解被记录在class文件中, 运行时, JVM可以获得注解信息, 程序可以通过反射获取该注解信息
- `RetentionPolicy.SOURCE:`  注解只保留在源代码中, 编译器直接丢弃这种注解

### @Target

> 只能修饰注解定义, 用于指定被修饰的注解能用于修饰哪些程序单元, 包含一个名为value的成员变量

value的取值如下: 

- `ElementType.TYPE:`指定注解可以修饰类, 接口 (包括注解类型) 或枚举定义
- `ElementType.FIELD:`指定注解只能修饰成员变量
- `ElementType.METHOD:`指定注解只能修饰方法
- `ElementType.PARAMETER:`指定注解可以修饰参数
- `ElementType.CONSTRUCTOR:`指定注解只能修饰构造器
- `ElementType.LOCAL_VARIABLE:`指定注解只能修饰局部变量
- `ElementType.ANNOTATION_TYPE:`指定注解只能修饰注解
- `ElementType.PACKAGE:`指定注解只能修饰包定义
- `ElementType.TYPE_PARAMETER:`指定注解只能修饰类型参数声明 (泛型) (java8)

```java
//在类型声明时使用
public class MailBox<@Test T> {
    //code here
}
```

- `ElementType.TYPE_USE:`指定注解只能修饰类型使用声明,即任何使用类型的地方都可以(java8)

```java
List<@Test Comparable> list1 = new ArrayList<>();   
List<? extends Comparable> list2 = new ArrayList<@Test Comparable>();
@Test String text;
text = (@Test String) new Object();
@Test Scanner console;
console = new @Test11 Scanner(System.in);
```

- `ElementType.MODULE:`指定注解只能修饰模块定义 (java9)

### @Documented

> 指定被该元注解修饰的注解类将被Javadoc工具提取成文档,如果定义注解类是使用了@Documented修饰, 则所有使用该注解修饰的程序元素的API文档中将会包含该注解说明

### @Inherited

> 指定被修饰的注解将具有继承性, 如果某个类使用了@Xxx注解(定义该注解时使用@Inherited修饰)修饰, 则其子类将自动被@Xxx修饰

## 自定义注解

### 注解定义

定义注解使用关键字`@interface`, 定义注解跟定义接口非常像

```java
public @interface Test {
}
```

默认情况下, 注解可以修饰任何程序元素(类, 接口, 方法, 变量等等)

带有成员变量的注解,

```java
public @interface Test {
    String name();
    int age() default 5;//可以为其指定一个默认值
}
//使用时就可以传入参数
@Test(name="aaa", age=2)
public void info() {
}
```

> 注意: 注解的成员变量是以函数的形式定义的

### 提取注解信息

> 使用注解修饰了类, 方法, 成员变量等程序元素后, 注解不会自己生效, 必须由开发者提供相应的工具来提取并处理注解信息

Java使用`java.lang.annotation.Annotation` 接口来代表程序元素前面的注解, 该接口是所有注解的父接口. Java5新增了`java.lang.reflect.AnnotatedElement` 接口, 该接口代表程序中可以接受注解的程序元素, 该接口主要有如下几个实现类: 

- Class: 类定义
- Constructor: 构造器定义
- Field: 类的成员变量定义
- Method: 类的方法定义
- Module: 模块定义
- Package: 类的包定义
- Parameter: 方法参数定义

Java可以通过反射获取某个类的AnnotatedElement对象(如Class, Constructor等), 通过获取到的对象就可以使用如下几个方法来访问注解信息

- `<T extends Annotation> T getAnnotation(Class<T> annotationClass)`: 返回程序元素上存在的指定类型的注解, 如果该类型的注解不存在则返回null
- `<T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)`: 尝试获取直接修饰该程序元素, 指定类型的注解, 如果该类型的注解不存在则返回null
- `Annotation[] getAnnotations()`: 返回该程序元素上存在的所有注解
- `Annotation[] getDeclaredAnnotations()`: 返回直接修饰该程序元素的所有注解
- `boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)`: 判断该程序元素上是否存在指定类型的注解, 存在返回true, 反之为false
- `<T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)`: 该方法与getAnnotation()方法基本类似, 但由于Java8增加了重复注解功能, 因此需要使用该方法获取修饰该程序元素, 指定类型的多个注解
- `<T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)`: 该方法与`getDeclaredAnnotations()`方法的关系跟`getAnnotationsByType()`与`getAnnotations()`的关系相同

```java
 Annotation[]  annotations = Class.forName("test.User").getMethod("getName").getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }
```

```java
public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {
        User user = new User();
        Annotation[] annotations = user.getClass().getMethod("getName").getAnnotations();
        for (Annotation annotation : annotations) {
            if (annotation instanceof Test) {
                Test test = (Test) annotation;
                System.out.println(test.name());
            }
        }
    }
```

> 至此, 可以发现注解其实就是对源代码增加的一些特殊标记, 这些特殊标记通过反射获取, 当程序获取到这些特殊标记后, 程序可以做出相应的处理

## 重复注解

> 从Java8开始, 允许使用多个相同类型的注解修饰同一个类

开发重复注解需要使用@Repeatable修饰,并且必须为其指定value值, 该value值是一个"容器"注解

例如要一个开发一个Tag重复注解

```java
//先定义一个容器注解用来存放Tag
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Tags {
    Tag[] value();
}

//再定义Tag可重复注解
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Tags.class)
public @interface Tag {
    String value();
}
```

## 类型注解

> Java8为ElementType枚举增加了TYPE_PARAMETER, TYPE_USE两个枚举值, 这样就允许定义注解时使用@Target(ElementType.TYPE_USE)修饰, 这种注解被称为类型注解, 类型注解可以修饰在任何地方出现的类型

类型注解可以修饰在任何地方出现的类型, 比如: 

- 创建对象时(用new关键之创建)
- 类型转换时
- 使用implements实现接口时
- 使用throws声明抛出异常时

```java
//创建一个简单的类型注解
@Target(ElementType.TYPE_USE)
public @interface Tag { }

//简单使用
public static void main(String[] args) {
        @Tag User user = new @Tag User();
        throw new @Tag NullPointerException();
}
```

## 注解处理工具

> Annotation Processing Tool

未完...