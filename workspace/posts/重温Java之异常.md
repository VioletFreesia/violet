---
title: '重温Java之异常'
date: 2020-08-19 12:05:58
tags: [Java,知识整理]
published: true
hideInList: true
feature: https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
isTop: false
---
# 重温Java之异常

>  注意: 知识点整理基于Java11, 不保证以前的版本可用

## 基本使用

> Java的异常机制主要依赖try, catch, finally, throw, throws五个关键字, 异常主要分为运行时异常(RuntimeException)和非运行时异常(Checked), 非运行时异常必须处理,否则无法通过编译

```java
try {
    //业务代码
} catch(Exception e) {
    //异常处理代码
} finally {
    //始终会执行的代码, 可有可无
}
```

> 有时候会在try中打开一些物理资源(如数据库连接, 网络连接, 磁盘文件等), 这些物理资源都必须显式的回收; Java的垃圾回收机制不会回收任何物理资源, 只能回收堆内存中对象所占的内存, 所以回收物理资源就需要在finally块中执行

### 捕捉多个异常

```java
try {
    //业务代码
} catch(SubException1 | SubException2 e) {
    //子异常1或2的异常处理代码
} catch(SubException3 e) {
	//子异常3的异常处理代码
} catch(Exception e) {
    //父异常处理代码
}
```

> 在捕捉多个异常时, 应该按照异常的继承关系先捕捉小异常再捕捉大异常

### 异常对象常用方法

- `getMessage()`: 返回该异常的详细描述字符串
- `printStackTrace()`: 将该异常的跟踪栈信息输出到标准错误输出
- `printStackTrace(PrintStream s)`: 将该异常的跟踪栈信息输出到指定输出流
- `getStackTrace():` 返回该异常的跟踪栈信息

## Java9增强的自动关闭资源的try语句

> 为保证try语句可以正常的关闭资源, 这些资源实现类必须实现AutoCloseable或Closeable接口, 实现这两个接口就必须实现close()方法, Closeable是AutoCloseable的子接口, Closeable的close()方法只声明了抛出IOException, 实现close()方法时就只能抛出IOException或其子类; 而AutoCloseable的close()方法可以抛出任何异常

自动关闭资源示例

```java
public static void main(String[] args) {
        try (
                BufferedReader br1 = new BufferedReader(new FileReader("a.txt"));
                BufferedReader br2 = new BufferedReader(new FileReader("b.txt"))
        ) {
            System.out.println(br1.readLine());
            System.out.println(br2.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        }
}
```

## throw与throws

> throw用于抛出异常, throws用于声明抛出异常

```java
public static void main(String[] args) throws IOException {
        throw new IOException();
}
```

## 自定义异常

> 定义异常类时通常需要提供两个构造器: 无参构造器, 带一个字符串参数的有参构造器,这个字符串是异常对象的描述信息

```java
public class MyException extends Exception {
    public MyException() {
    }

    public MyException(String message) {
        super(message);
    }
}
```

