---
title: '重温Java之IO'
date: 2020-08-22 22:56:42
tags: [Java,知识整理]
published: true
hideInList: true
feature: https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
isTop: false
---
# 重温Java之IO

>  注意: 知识点整理基于Java11, 不保证以前的版本可用

## File类

> File类是java.io包下代表与平台无关的文件和目录

File类可以使用文件路径字符串来创建File实例, 文件路径可以是绝对路径也可以是相对路径

### 常见方法

File类提供了很多方法来操作文件和目录, 常见方法如下:

- 文件名相关
  - String getName(): 返回此File对象所表示的文件或目录的名字
  - File getPath(): 返回此File对象对应的路径名
  - File getAbsolutePath(); 返回完整路径名
  - String getParent(): 返回此对象所对应目录的父目录名
  - boolean renameTo(File newName): 重命名此File对象
- 文件检测相关
  - boolean exists(): 判断File对象所对应的文件或目录是否存在
  - boolean canWrite();
  - boolean canRead():
  - boolean isFile():
  - boolean isDirectory():
  - boolean isAbsolute(): 判断此File对象对应的文件或目录是否为绝对路径
- 文件信息相关
  - long lastModified(): 文件最后修改时间
  - long length(): 返回文件内容的长度
- 文件操作相关
  - boolean createNewFile():
  - boolean delete():
  - static File createTempFile(String prefix, String suffix): 在默认的临时文件目录中创建一个临时空文件, 使用给定的前缀, 系统生成的随机数和给定后缀作为文件名\
  - static File createTempFile(String prefix, String suffix, File directory): 和上一个方法功能一样, 指定目录而已
  - void deleteOnExit(): 注册一个删除钩子, 当JVM退出时, 删除File对象所对应的文件和目录
- 目录操作相关
  - boolean mkdir():创建File对象对应的目录
  - String[] list(): 列出File对象的所有子文件名和路径名
  - File[] listFiles(): 列出File对象的所有子文件名和路径名
  - static File[] listRoots(): 列出系统所有的根路径

### 文件过滤器

> File类的list()方法可以接受一个FilenameFilter参数, 通过该参数可以只列出符合条件的文件

FilenameFilter接口里包含一个accept(File dir, String name)方法

```java
public static void main(String[] args) {
        File file = new File("d:/");
        String[] ts = file.list((dir, name) -> name.endsWith("t"));
        System.out.println(Arrays.toString(ts));
}
```

## 字节流与字符流

### InputStream和Reader

> InputStream与Reader是所有输入流的抽象基类, 所以他们的方法是所有输入流都可用的方法

- InputStream中常见方法:
  - int read(): 从输入流中读取单个字节, 返回所读取的字节数据
  - int read(byte[] b): 从输入流中最多读取b.length个字节的数据, 并将其储存在字节数组b中, 返回实际读取的字节数
  - int read(byte[] b, int off, int len): 从输入流中最多读取len个字节的数据, 并将其储存在数组b中, 放入数组b中时不是从起始位置开始, 而是从 off位置开始, 返回实际读取的字节数
- Reader中常见方法:
  - int read(): 从输入流中读取单个字符, 返回所读取的字符数据
  - int read(char[] cbuf): 从输入流中最多读取cbuf.length个字符的数据, 并将其储存在字符数组cbuf中, 返回实际读取到的字符数
  - int read(char[] cbuf, int off, int len): 与InputStream的对应
- 移动记录指针相关(InputStream和Reader皆可)
  - void mark(int readAheadLimit): 在记录指针当前位置记录一个标记(mark)
  - boolean markSupported(): 判断该输入流是否支持mark()操作
  - void reset(): 将此流的记录指针重新定位到上一次记录标记的位置
  - long skip(long n): 记录指针向前移动n个字节/字符

> InputStream与Reader都是抽象类, 本身不难创建实例, 但它们分别有一个用于读取文件的输入流FileInputStream和FileReader

```java
public static void main(String[] args) {
        try (FileInputStream fs = new FileInputStream("./src/main/java/test/Test01.java")) {
            byte[] bytes = new byte[1024];
            while (fs.read(bytes) > 0) {
                System.out.println(new String(bytes));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
}
```

### OutputStream和Write

> OutputStream和Write是所有输出流的抽象基类 

常见方法: 

- void write(int c): 将指定的字节/字符输出到输出流中, 其中c既可以代表字节, 也可以代表字符
- void write(byte[]/char[] buf): 将字节数组/字符数组中的数据输出到指定输出流中
- void write(byte[]/char[] buf, int off, int len): 将字节数组/字符数组中从off位置开始, 长度为len的字节/字符输出到输出流中

Write特有: 

- void write(String str): 将str输出到输出流中
- void write(String str, int off, int len): 类比上面的

```java
public static void main(String[] args) {
        try (FileWriter fw = new FileWriter("./src/main/java/test/User.java")) {
            fw.write("//我来给你加点注释");
        } catch (IOException e) {
            e.printStackTrace();
        }
}
```

## 输入/输出流体系

### java.io包下的流

|    分类    |      字节输出流      |      字节输出流       |       字符输入流        |        字符输出流        |
| :--------: | :------------------: | :-------------------: | :---------------------: | :----------------------: |
|  抽象基类  |     InputStream      |     OutputStream      |         Reader          |          Writer          |
|  访问文件  |   FileInputStream    |   FileOutputStream    |       FileReader        |        FileWriter        |
|  访问数组  | ByteArrayInputStream | ByteArrayOutputStream |     CharArrayReader     |     CharArrayWriter      |
|  访问管道  |   PipedInputStream   |   PipedOutputStream   |       PipedReader       |       PipedWriter        |
| 访问字符串 |                      |                       |      StringReader       |       StringWriter       |
|   缓冲流   | BufferedInputStream  | BufferedOutputStream  |     BufferedReader      |      BufferedWriter      |
|   转换流   |                      |                       | InputStream<br />Reader | OutputStream<br />Writer |
|   对象流   |  ObjectInputStream   |  ObjectOutputStream   |                         |                          |
|  抽象基类  |  FilterInputStream   |  FilterOutputStream   |      FilterReader       |       FilterWriter       |
|   打印流   |                      |      PrintStream      |                         |       PrintWriter        |
| 推回输入流 | PushbackInputStream  |                       |     PushbackReader      |                          |
|   特殊流   |   DataInputStream    |   DataOutputStream    |                         |                          |

### 处理流

> 之前介绍的4个字节流与字符流都是节点流, 节点流的操作往往比较繁琐, 因此需要处理流来包装节点流来简化操作

#### PrintSteam示例

```java
public static void main(String[] args) {
        try (PrintStream ps = new PrintStream(new FileOutputStream("text.txt"))) {
            ps.println("处理流测试");
        } catch (IOException e) {
            e.printStackTrace();
        }
}
```

> 使用处理流包装底层节点流之后, 关闭输入/输出流资源时, 只要关闭最上层的处理流即可, 被包装的节点流会自动关闭

### 管道流

> 管道流是用来实现进程间的通信功能的, 在多线程时会用到, 所以在多线程时介绍

### 转换流

> 输入/输出流体系中提供了两个转换流(InputStreamReader, OutputStreamWriter), 用于将字节流转换为操作更方便的字符流

```java
public static String readLine() {
        StringBuilder inputStr = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            int character;
            while ((character = br.read()) != 10) {
                inputStr.append((char) character);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return inputStr.toString();
}
```

### 推回输入流

> PushbackInputStream/PushbackReader: 带有推回缓冲区的流, 能够将内容推回到推回缓冲区中, 从而允许重复读取刚刚读取的内容

提供了如下推回方法: 

- void unread(byte[]/char[] buf): 将一个字节/字符数组推回到推回缓冲区
- void unread(byte[]/char[] buf, int off, int len): 将一个字节/字符数组从off开始, 长度为len推回到推回缓冲区
- void unread(int b): 将一个字节推回到推回缓冲区

## 重定向标准输入/输出

> Java的标准输入/输出分别通过System.in/System.out表示, 默认情况下, 分别代表键盘和显示器

在System类里提供如下三个重定向标准输入/输出的方法

- static void setErr(PrintSteam err): 重定向"标准"错误输出流
- static void setIn(InputStream in): 重定向"标准"输入流
- static void setOut(PrintStream out): 重定向"标准"输出流

```java
public static void main(String[] args) {
        try (PrintStream ps = new PrintStream(new FileOutputStream("text.txt"))) {
            System.setOut(ps);
            System.out.println("重定向标准输出流");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
}
```

## Java虚拟机读写其他进程的数据

> 使用Runtime对象的exec()方法可以运行平台上的其他程序, 该方法产生一个Process对象, Process对象代表由该Java程序启动的子进程

Process类提供如下方法让程序和其子进程进行通信:

- InputStream getErrorStream(): 获取子进程的错误流
- InputStream getInputStream(): 获取子进程的输入流
- OutputStream getOutputStream: 获取子进程的输出流

> 这里的输入流/输出流应该从Java程序角度看, 若要获得子进程的输出,则应该获取输入流, 输入到Java程序, 所以错误流是返回输入流

Windows简易终端

```java
public static void main(String[] args) {
        System.out.println("欢迎使用SB终端");
        try (BufferedReader userIn = new BufferedReader(new InputStreamReader(System.in, "GBK"))) {
            String command;
            for (; ; ) {
                System.out.print("> ");
                command = userIn.readLine();
                if ("exit".equals(command) || "quit".equals(command))
                    break;
                exec(command);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
}

public static void exec(String command) {
        try {
            Process cmd = Runtime.getRuntime().exec(command);
            BufferedReader br = new BufferedReader(new InputStreamReader(cmd.getInputStream(), "GBK"));
            BufferedReader err = new BufferedReader(new InputStreamReader(cmd.getErrorStream(), "GBK"));
            br.lines().forEach(System.out::println);
            err.lines().forEach(System.out::println);
            cmd.destroy();
        } catch (IOException e) {
            System.out.println("无法识别的命令: " + command);
        }
}
```

> 只能运行一些简单的系统命令

## RandomAccessFile

> RandomAccessFile是Java输入/输出流系中功能最丰富的文件内容访问类, 提供了众多的方法来访问文件内容
>
> 既可以读取文件内容, 又可以写入内容, 与普通输入流不同的是, RandomAccessFile支持"随机访问"的方式, 也就是程序可以跳转到文件的任意位置来读写数据

RandomAccessFile移动指针的方法: 

- long getFilePointer(): 返回文件记录指针的位置
- void seek(long pos): 将文件记录指针定位到pos位置

其他读写文件的方法与其他输入输出流的read/write方法相同

> RandomAccessFile类有两个构造器, 一个使用String参数指定文件名, 一个使用File参数指定文件本身, 除此之外, 创建RandomAccessFile对象时还需要指定一个mode参数, 可选值如下

- "r": 以只读方式打开文件, 尝试写会报错
- "rw": 以读写方式打开文件, 如果文件不存在会尝试创建文件地方
- "rws":相对于"rw"模式, 还要求对文件的内容或元数据的每个更改都同步写入到底层储存设备(磁盘)
- "rwd": 相对于"rw"模式, 还要求对文件内容的每个更新都同步写入到底层储存设备(磁盘)

> 注意: RandomAccessFile不能向指定位置插入数据, 当指定位置之后, 写入的数据会覆盖后面的数据, 所以要实现插入, 需要在指定位置之后将后面的内容读入缓冲区, 然后再写入, 最后再把缓冲区里的数据写入

## 对象序列化(Java9改)
> 序列化机制允许将实现序列化的Java对象转换成字节序列, 这些字节序列可以保存在磁盘上, 或通过网络传输
>
> 对象序列化(Serialize)指将一个Java对象写入到IO流中, 与之对应的是, 对象反序列化(Deserialize)则指从IO流中恢复该Java对象

Java9增强了序列化机制, 允许对读入的序列化数据进行过滤, 这种过滤可以在反序列化之前对数据进行校验, 从而提高安全性和健壮性

如果要让某个对象支持序列化机制, 则该对象必须是可序列化的, 即需要实现以下两个接口之一

- Serializable
- Externalizable

```java
public static void main(String[] args) {
        try (
                ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("User.txt"));
                ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.txt"))
        ) {
            User user = new User("张三", 18, Sex.MALE);
            oos.writeObject(user);
            User rUser = (User) ois.readObject();
            System.out.println(rUser);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
}
```

> 注意: User的成员变量中如果有不是基本类型或String类型, 是另外的引用类型, 那这个引用类型必须也是可序列化的

### 新增的过滤功能

> Java9为ObjectInputStream增加了setObjectInputFilter(), getObjectInputFilter()两个方法, 第一个是设置对象输入流过滤器的, 当反序列化时, 过滤器的checkInput()方法会自动触发, 检查序列化数据是否有效, 执行后有三种返回值

- Status.REJECTED: 拒接恢复
- Status.ALLOWED: 允许恢复
- Status.UNDECIDED: 未决定状态, 程序继续执行检查

### 自定义序列化

> 暂不介绍

### 版本

> Java序列化机制允许为序列化类提供一个私有静态不可变长整型类型的SerialVersionUID来标识Java类的序列化版本

```java
public class User implements Serializable {
	private static final long serialVersionUID = 520L;
    ...
}
```


