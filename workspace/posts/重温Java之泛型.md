---
title: '重温Java之泛型'
date: 2020-08-17 18:43:04
tags: [Java,知识整理]
published: true
hideInList: true
feature: https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
isTop: false
---
# 重温Java之泛型

>  注意: 知识点整理基于Java11, 不保证以前的版本可用

## 理解泛型

> 所谓泛型, 就是允许在定义类, 接口, 方法时使用类型参数, 这个类型参数(或叫做泛型)将在声明变量, 创建对象, 调用方法时动态指定

基本使用:

```java
public interface List<E> {
    void add(E x)
}
```

### 继承泛型

```java
//子类(A)不能再跟泛型参数
public class A extends List<E> { }
//继承时可以指定泛型参数
public class A extends List<String> { }
```

> 不管泛型形参传入哪种类型的实参, 对于Java来说, 它们依然被当做同一个类处理, 在内存中也只占用一块内存空间, 因此在**静态方法, 静态初始化块或者静态变量**的声明和初始化中不允许使用泛型参数

**错误示范:**

```java
public class R<T> {
    static T info;//错误
    public static void bar(T msg){ }//错误
}
```

## 类型通配符

> 在Java中, 数组与泛型有所不同, 假设`Foo`是`Bar`的一个子类型(子类或子接口), 那么`Foo[]`依然是`Bar[]`的子类型, 但泛型就不一样, `G<Foo>`并不是`G<Bar>`的子类型, `Foo[]`可以自动向上转型为`Bar[]`, 称为可型变

例如:

```java
public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        //无法将List<String>类型赋值给List<Object>类型
        //也就是说List<E>要求List里的元素类型必须是E,不能是E的子类
        objects = strings;//错误
}
```

### 使用类型通配符

像上面这种情况的解决办法就是使用通配符

```java
public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<?> objects;//使用通配符
        objects = strings;//可以赋值
}
```

**注意: 虽然`List<?>`可以接受任何`List<E>`, 但是并不代表可以添加任何元素**

```java
public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<?> objects;
        objects = strings;
        objects.add(new Object());//错误, 只能添加String类型
}
```

>  这种带有通配符的List仅仅表示它是各种泛型List的父类, 并不能把元素加入到其中

### 设定类型通配符的上下限

```java
//设定上限
public void demo(List<? extends CharSequence> str) {
        System.out.println(str);
}
//设定下限
public void demo(List<? super String> str) {
        System.out.println(str);
}
```

> 泛型参数的上下限也是这样设置

## 泛型方法

> 可以传入指定或任意类型的参数

```java
public <T> void demo(T[] args, List<T> list) {
        list.addAll(Arrays.asList(args));
}
```

> 改方法就实现了传入任意类型的参数

大多数时候, 泛型方法可以代替类型通配符, 例如:

```java
public interface Collection<E> {
    boolean containsAll(Collection<?> c);//类型通配符
    <T> boolean containsAll(Collection<T> c);//泛型方法
}
```

## 擦除与转换

> 如果在使用带泛型的类时不指定实际的类型, 如List,此时被称作原始类型(raw type)

当把一个带有泛型信息的对象赋值给另一个没有泛型信息的变量时, 所有的泛型信息将被抹去, 如`List<String>` 转为`List`时,所有的类型检查变成`Object`类型

```java
public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List list = new ArrayList();
        list = strings;
}
```

> 赋值后原来strings里的String对象都会转为Object