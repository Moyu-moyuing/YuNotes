# TypeScript

TypeScript是JavaScript的超集，TypeScript=Type+JavaScript，在JS的基础上，为JS添加了类型支持。

JavaScript类型系统天然缺陷，绝大部分bug都是类型错误（UncaughtTypeError）。从编程语言来看，TypeScript属于静态类型的编程语言，即编译时期就做类型检查；而JavaScript属于动态类型的编程语言，即在执行期就做类型检查。

TypeScript相对于JavaScript优势：

- 更早发现错误
- 程序中任何位置都有代码提示
- 强大的类型系统提升了代码的可维护性，使得重构代码更加便利
- 支持最新的ECMAScript语法
- TypeScript类型推断机制，不需要在代码中的每个地方都显示标注类型

# TypeScript常用类型

## 类型注解

```tsx
let age: number=18
```

上述代码的`:number`就是类型注解，为变量添加类型约束。类型注解约定了什么类型，就只能给变量赋值该类型的值。

## JavaScript已有类型

原始类型：number、string、boolean、null、undefined、symbol

对象类型：object，包括数组、对象、函数等对象

## **数组类型的写法**

```tsx
let numbers: number[]=[1,2,3]
let strings: Array<string>=['a','b','c']
let arr: (number | string)[]=[1,'a',2,'b']
//表示数组中可以是number或者string类型

//如果不添加()，则表示既可以是number类型，也可以是string的数组
let arr: number | string[]=[1,'a',2,'b']
```

> `|`**在TS中叫联合类型（由两个及以上类型组成的类型，表示可以是这些类型的任意一种）**

## TypeScript新增类型

联合类型、自定义类型（类型别名）、接口、元祖、字面量类型、枚举、void、any等

## 类型别名

当同一类型复杂被多次使用时，可以通过类型别名来简化该类型的使用。

一般使用type关键字来创建类型别名，类型别名可以是任意合法的变量名称，创建类型别名后，直接使用该类型别名作为变量的类型注解即可。

```tsx
type CustomArray=(number|string)[]
let arr: CustomArray=[1,'a']
```

## 函数类型

函数类型指函数参数和返回值的类型，为函数指定类型有两种方式：

1. 单独指定参数、返回值的类型
   
    ```tsx
    function add(num1: number,num2: number): number{
    	return num1+num2
    }
    
    const add(num1: number,num2: number): number=>{
    	return num1+num2
    }
    ```
    
2. 同时指定参数、返回值的类型
当函数作为表达式时，可以通过类似箭头函数形式的语法来作为函数添加类型，但这种形式只适用于函数表达式
   
    ```tsx
    const add: (num1: number,num2: number) => number = (num1,num2)=> {
    	return num1+num2
    }
    ```
   
3. 无返回值的函数
如果函数没有返回值，那么，函数返回值类型为void
   
    ```tsx
    function greet(name:string):void{
    	console.log(name)
    }
    ```
   

使用函数实现某个功能时，参数可以传也可以不传，这种情况下，在给函数参数指定类型时，需要用**可选参数，可选参数**在可传可不传的参数名称后面添加`?`。注意：可选参数只能出现在参数列表的最后，也就是指可选参数后面不能再出现必选参数。

```tsx
function mySlice(start?: number,end?:number):void{
	console.log(start,end)
}
```

## 对象类型

JavaScript的对象是由属性和方法构成的，而TypeScript中对象的类型就是在描述对象的结构（有什么类型的属性和方法）

写法：

```tsx
let person: { name:string;age:number;sayHi():void}={
	name:'jack',
	age:19,
	sayHi(){}
}
```

直接使用{}来描述对象结构 。属性采用属性名：类型的形式；方法采用方法名()：返回值类型的形式。

如果方法有参数，就在方法后面的括号种指定参数类型（比如：`greet(name: string): void`）。

在一行代码中指定对象的多个属性类型时，使用`;` 来分隔。

- 如果一行代码只指定一个属性类型（通过换行来分割多个属性类型，可以去掉分号）
- 方法的类型也可以使用箭头函数形式，比如`sayHi:()=>void`

对象的属性或方法，也是可选的，可以使用**可选属性**，比如在使用axios时，如果发送GET请求时，methods属性就可以省略。

```tsx
function myAxios( config: { url: string; method?: string }){
	...
}
```

可选属性的语法与函数可选参数的语法一致，都使用`?`表示。

## 接口

当一个对象类型被多次使用时，一般会使用接口interface来描述对象的类型，达到复用的目的。

- 使用interface关键字来声明接口
- 接口名称可以是任意合法的变量名称
- 声明接口后，直接使用接口名称作为变量的类型

```tsx
interface IPerson{
	name: string
	age: number
	sayHi(): void
}
let person: Iperson={
	name: 'jack',
	age: 23,
	sayHi() {}
}
```

### **继承**

如果两个接口之间有相同的属性或方法，可以**将公共的属性或方法抽离出来，通过继承来实现复用。**

比如，下述两个接口都有x、y两个属性，重复写两次很繁琐。

```tsx
interface Point2D {x:number;y:number}
interface Point3D {x:number;y:number;z:number}
```

使用继承：

```tsx
interface Point2D {x:number;y:number}
interface Point3D extends Point2D {z:number}
```

使用extends继承关键字实现了接口Point3D继承了Point2D。继承后，Point3D就有了Point2D的所有属性和方法以及自己的属性和方法

## 类型别名和接口

type和interface都可以给对象指定类型

接口只能为对象指定类型

类型别名不仅能为对象指定类型，实际上可以为任意类型指定别名

```tsx
interface IPerson{
	name:string
	age:number
	sayHi():void
}
```

```tsx
type IPerson = {
	name:string
	age: number
	sayHi(): void
}
```

```tsx
type NumStr = number | string
```

## 元组

有时在地图中常使用经纬坐标来标记位置信息，可以使用数组来记录坐标，两个元素都是数值类型，但是使用number[]并不严谨，因为该类型的数组可以出现任意多个数字。

```tsx
let position: number[]=[27.54,116.45]
```

可以使用元祖来存储。元祖类型是另一种类型的数组，它**确切地知道包含多少元素，以及特定索引对应的类型**。

```tsx
let position:[number, number]=[27.54,116.45]
let NumStr:[number,string]=[1,'a']
```

## 类型推论

在TypeScript中，某些没有明确指出类型的地方，TS的类型推论机制会帮助提供类型，换句话说，由于类型推论的存在，这些地方的类型注解可以省略。

发生类型推论的2种常见场景：

- 声明变量初始化时
- 决定函数返回值时

```tsx
let age=18
//鼠标有提示
```

如果声明变量但没有立即 初始化值 ，此时还必须手动添加类型注解

```tsx
function add(num1:number,num2:number){
	return num1+num2
}
//鼠标有提示
```

**能省略类型注解的地方尽量省略**。

## 类型断言

使用类型断言可以指定更具体的类型。

```tsx
<a href="https://www.baidu.com" id="link">百度</a>

const alink=document.getElementById('link')
```

getElementById方法返回值的类型是HTMLElement，该类型只包含所有标签公共的属性或方法，不包含<a>标签特有的href属性。

因此，这个类型太宽泛，无法操作href等<a>标签特有的属性或方法，这种情况下就需要使用类型断言指定更加具体的类型。

使用类型断言：

```tsx
const alink=document.getElementById('link') as HTMLAnchorElement
```

使用as关键字来实现类型断言。

关键字as后面的类型是一个更加具体的类型（HTMLAnchorElement是HTMLElement子类型）。

通过类型断言，alink的类型变得更加具体，这样就可以访问<a>标签特有的属性或方法了。

当然还有另一种语法，使用<>语法：

```tsx
const alink=<HTMLAnchorElement>document.getElementById('link')
```

使用命令`console.dir($0)`即为选中的DOM元素，可以查看其JavaScript类型属性。

## 字面量类型

```tsx
let str1='Hello TS'
const str2='Hello Ts'
```

通过TS的类型推论机制，上述代码的`str1`的类型是`string`，`str2`的类型是`'Hello TS'`。str1是一个变量let，它的值可以是任意字符串，所以类型是string；str2是一个const常量，它的值不能变化只能是`'Hello TS'` ，所以类型是`'Hello TS'` 。

此处的`'Hello TS'` 就是一个字面量类型，也就是说某个特定的字符串也可以作为TS中的类型。除字符串外，任意字面量都可以作为类型使用。

### 使用场景

字面量类型通常配合联合类型一起使用，用来表示一组明确的可选值列表。

例如，贪吃蛇游戏中，游戏的方向可选值只能是上下左右的任意一个。

```tsx
function changeDirection(direction:'up'|'down'|'left'|'right'){
	console.log(direction)
}
```

相比于string类型，使用字面量类型更加精确、严谨。

## 枚举类型

枚举的功能类似于字面量类型+联合类型组合的功能，也可以表示一组明确的可选值。

枚举定义一组命名常量，描述一个值，该值可以是这些命名常量中的一个。

```tsx
enum  Direction{Up,Down,Left,Right}
function changeDirection(direction:Direction){
	console.log(direction)
}
```

使用enum关键值定义枚举，约定枚举名称，枚举中的值以大写字母开头。枚举中的多个值之间通过逗号分隔。定义好枚举后，直接使用枚举名称作为类型注解。

上述代码的形参direction的类型为枚举Direction，那么实参的值就应该是枚举Direction成员的任意一个，访问枚举成员：

```tsx
changeDirection(Direction.Up)
```

类似于JS中的对象，直接通过`.`语法访问枚举成员。

枚举成员是有值的，默认为：从0开始自增的数值。枚举成员的值为数字的枚举是数字枚举。当然，也可以给枚举中的成员初始化值。

```tsx
enum Direction {Up=10,Down,Left,Right}
//Down->11、Left->12、Right->13
enum Direction {Up=2,Down=4,Left=8,Right=16}
```

枚举成员也可以是字符串，但是字符串枚举无自增行为，因此字符串枚举的每个成员必须有初始值。

```tsx
enum  Direction {
	Up='UP',
	Down='DOWN',
	Left='LEFT',
	Right='RIGHT'
}
```

枚举是TS为数不多的非JavaScript类型级扩展（不仅仅是类型）的特性之一。

其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值，即，其他类型会在编译为JS代码时自动移除，但是，枚举类型会被编译为JS代码。

上述代码会被编译成：

```tsx
var Direction;
(function (Direction){
		Direction["Up"]="UP";
		Direction["Down"]="DOWN";
		Direction["Left"]="LEFT";
		Direction["Right"]="RIGHT"
})(Direction||(Direction={}))
```

枚举与字面量类型+联合类型类似的功能相似，都用来表示一组明确的可选值列表。推荐使用字面量类型+联合类型组合方式，因为相比枚举，这种方式更加直观、高效。

## any类型

原则上不推荐使用any！这会让TypeScript变成AnyScript，失去TS 类型保护的优势，因为当值是any时，可以对该值进行任意操作，并且不会有代码提示。

```tsx
let obj:any ={x:0}
obj.bar=111
obj()
const n:number=obj
```

上述代码的操作都不会有任何类型错误提示，即便可能会出现错误。开发中，应该尽量避免使用any类型，除非临时使用any来避免书写很长很复杂的类型。其他隐式具有any类型的情况：声明变了不提供类型也不提供默认值；函数参数不加类型。

因为不推荐使用any，因此这两种情况都应该提供类型。

## typeof

JS中提供了typeof操作符，用来在JS中获取数据的类型。

```tsx
console.log(typeof "hello world")
//string
```

实际上，TS也有typeof操作符，可以在类型上下文中引用变量或属性的类型。

使用场景：根据已有变量的值，获取该值的类型，来简化类型书写。

```tsx
let p={x:1,y:2}
function formatPoint(point:{x:numberm,y:number}){}

function formatPoint(point:typeof p){}
```

使用上述代码的typeof操作符来获取变量p的类型，结果与对象字面量形式的数据相同。

typedof出现在类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文

typeof只能用来查询变量或属性的类型，无法查询其他形式的类型（例如函数调用的类型），例如：

```tsx
function add(num1:numeber,num2:number){
	return num1+num2
}
let ret:typeof add(1,2)
//报错
```

# TypeScript高级类型

## `class`类

TypeScript全面支持ES2015中引入的c`lass`关键字，并为其添加了类型注解和其他语法，比如可见性修饰符等等。

```tsx
class Person{}
const p=new Person()
```

上述代码中，根据TS中的类型推论可以知道`Person`类的实例对象`p`类型是`Person`。TS中的`class`不仅提供了`class`的语法功能，也作为一种类型存在。

实例属性初始化：

```tsx
class Person{
	age: number
	gender='男'
//gender: string='男'
}
```

上述代码声明成员`age`，类型为`number`，无初始值。声明成员是`gender`，并设置初试值，此时可以省略类型注解（TS类型推论为`string`类型）。

### `class`类的构造函数

```tsx
class Person{
	age: number
	gender:string

	constructor(age:number,gender:string){
		this.age=age
		this.gender=gender
	}
}
const p=new Person(18,'男')
```

上述代码：成员初始化（`age: number`）后，才可以通过`this.age`访问实例成员。需要为构造函数指定类型注解，否则会被隐式推断为`any`，构造函数不需要返回值类型。

### `class`实例方法

```tsx
class Point{
	x=10
	y=10

	scale(n:number):void{
		this.x*=n
		this.y*=n
	}
}

const p=new Point()
p.scale(10)
```

方法的类型注解（参数和返回值）与函数用法相同。

### `class`类继承

类继承有两种方式，一是`extends`关键字继承父类，二是使用`implements`关键字实现接口。JavaScript中只有extends关键字，而implements是TS提供的。

```tsx
class Animal{
	move(){console.log('moving')}
}
class Dog extends Animal{
	name='二哈'
	bark(){console.log('汪')}
}
const dog=new Dog()
dog.move()
```

上述代码通过`extends`关键字实现继承，子类`Do`g继承父类`Animal`，则`Dog`的实例对象`dog`就同时具有了父类`Animal`和子类`Dog`的所有属性和方法。

另一种方式就是使用`implements`关键字实现接口。

```tsx
interface Singable{
	sing();void
	name:string
}
class Person implements Singable{
	name='张三'
	sing(){
		console.log('穿梭时间的画面的钟~')
	}
}

```

上述代码通过`implements`关键字让class实现接口。`Person`类实现接口`Singable` 意味着，Person类中必须提供Singable接口中指定的所有方法和属性。

### 可见修饰性

类成员可见性：可以使用TS来控制class的方法或属性对于class外的代码是否可见。

可见修饰性包括`public`（公有的）、`protected`（受保护的）、`private`（私有的）。

1. `public`：表示公开的、公有的，公有成员可以被任何地方访问，是默认可见性。
   
    ```tsx
    class Animal{
    	public move(){
    		console.log('moving')
    	}
    }
    const a=new Animal()
    a.move()
    ```
    
    在类属性或方法前面添加`public`关键字，来修饰该属性或方法是共有的。`public`是默认可见性，因此可以直接省略。
    
2. `protected`：表示受保护的，仅对其声明所在类和子类中（非实例对象）可见。

   
    ```tsx
    class Animal{
    	protected move(){
    		console.log('moving')
    	}
    }
    class Dog extends Animal{
    	bark(){
    		console.log("汪")
    		this.move()
    	}
    }
    const a=new Animal()
    a.move()//报错
    //属性move受保护，只能在类Animal及其子类中访问
    const dog=new Dog()
    Dog.move()//报错
    ```
    
    在类属性或方法前面添加`protected`关键字，来修饰该属性或方法是受保护的。在子类的方法内部可以通过`this`来访问父类受保护的成员，但是，**对实例都不可见（包括父类和子类的实例对象）**。
    
3. `private`：表示私有的，只在当前类中可见，对实例对象以及子类也是不可见的。
   
    ```tsx
    class Animal{
    	private move(){console.log('moving')}
    	walk(){
    		this.move()
    	}
    }
    ```
    
    在类属性或方法前面添加private关键字，来修饰该属性或方法是私有的。私有的属性或方法只在当前类中可见，对子类和实例对象均不可见。
    
    ```tsx
    class Animal{
    	private __run__(){
    		console.log('Animal 内部辅助函数')	
    	}
    
    	//受保护的
    	protected move(){
    		console.log('moving')
    	}
    	
    	//公开的
    	run(){
    		this.__run__()
    		this.move()
    		console.log('running')
    	}
    }
    const animal=new Animal()
    animal.__run__()
    //不可见，报错
    ```
    
4. `readonly`：表示只读，用来防止在构造函数之外对属性进行赋值。
   
    ```tsx
    class Person{
    	readonly age: number=18
      constructor(age: number){
    		this.age=age
    	}
    }
    ```
    
    使用`readonly`关键字修饰该属性是只读的，注意**只能修饰属性不能修饰方法**。属性`age`后面的类型注解（`number`）如果不加，则`age`的类型为`18`（字面量类型）。
    
    接口或者`{}`表示的对象类型也可以使用`readonly`。
    
    ```tsx
    interface IPerson{
    	readonly name:string
    }
    let obj: IPerson={
    	name:'jack'
    //报错
    }
    
    let obj:{readonly name:string}={
    	name:'jack'
    }
    obj.name='rose'
    //当前属性只读，报错
    ```
    
    只要是`readonly`来修饰的属性，必须手动提供明确的类型。
    

## 类型兼容性

一共有两种类型系统：

- Structural Type System（结构化类型系统）
- Nominal Type System（标明类型系统）

TS采用的是结构化类型系统，也叫duck typing（鸭子类型）（叫起来像鸭子，走路像鸭子，长得也像鸭子，那么就称其为鸭子），类型检查关注的是值所具有的形状。也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

```tsx
class Point {x:number;y:number}
class Point2D {x；number;y:number}

const p:Point=new Point2D()
```

上述代码中，Point和Point2D是两个名称不同的类，变量p的类型被显示标注为Point类型，但是值确实Point2D的实例，没有类型错误。

这是因为TS是结构化类型系统，只检查Point和Point2D的结构是否相同，显然都具有x和y两个属性且属性类型也相同，因此相同。

但是如果在Nominal Type System中（C#、Java等）就是不同的类，类型无法兼容。

### 对象之间的类型兼容性

在结构化类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型，这种说法并不准确。对于对象类型来说，y的成员至少与x相同，则x兼容y（成员多的可以赋值给成员少的）。

```tsx
class Point {x:number;y:number}
class Point3D {x:number;y:number;z:number}
const p:Point=new Point3D()
```

上述代码中，`Point3D`的成员至少与`Point`相同，则`Point`兼容`Point3D`，成员多的`Point3D`可以赋值给成员少的`Point`。

### 接口之间的类型兼容性

接口之间的兼容性类似于`class`，并且`class`和`interface`之间也可以相互兼容。

```tsx
interface Point {x:number;y:number}
interface Point2D {x:number;y:number}
let p1: Point
let p2: Point2D=p1

interface Point3D{x:number;y:number;z:number}
let p3:Point3D
p2=p3
```

```tsx
class Point3D {x:number;y:number;z:number}
let p3:Point2D=new Point3D()
```

### 函数之间的类型兼容性

函数之间的兼容性较为复杂，需要考虑是哪个方面：

1. 参数个数
对于参数个数来说，参数多的兼容参数少的（或者说，参数少的可以赋值给多的）
   
    ```tsx
    type F1=(a:number)=>void
    type F2=(a:number,b:number)=>void
    let f1:F1
    let f2:F2=f1
    ```
   
    ```tsx
    const arr=['a','b','c']
    arr.forEach(()=>{})
    arr.fotEach((item)=>{})
    ```
   
    参数少的可以给赋值给参数多的，f1可以赋值给f2。
   
    数组forEach方法的第一个参数是回调函数，该实例中类型为：`(value: string, index: number, arr: string[]) => void` 。
   
    在JS中省略用不到的函数参数的做法实际上非常常见，这样的使用方式，促成了TS中函数类型之间的兼容性。并且由于回调函数是有类型的，因此TS会自动推导出参数`item`，`index`，`array`的类型。
   
2. 参数类型
参数类型，相同位置的参数类型要相同（原始类型）或兼容（对象类型）
   
    ```tsx
    type F1=(a:number)=> string
    type F2=(a:number)=> string
    let f1:F1
    let f2:F2=f1
    ```
   
    ```tsx
    interface Point2D {x:number;y:number}
    interface Point3D{x:number;y:number;z:number}
    type F2=(p:Point2D)=> void//相当于有2个参数
    type F3=(p:Point3D)=> void//相当于有3个参数
    let f2:F2
    let f3:F3=f2
    
    f2=f3//报错
    ```
   
   ![Untitled](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081855826.png)
   
    此处与上述接口兼容性冲突，接口`Point3D`成员至少与`Point2D`成员相同，也就是说接口`Point3D`兼容`Point2D`，可以将`Point3D`赋值给`Point2D`，但是当其作为函数参数报错。
   
    实际上，将对象拆开看，把每个属性看作一个个参数，则参数少的`f2`可以赋值给参数多的`f3` 。
   
3. 返回值类型
返回值类型，只关注返回值类型本身即可：
   
    ```tsx
    type F5=()=>string
    type F6=()=>string
    let f5:F5
    let f6:F6=f5
    ```
   
    如果返回值类型是原始类型，此时两个类型要相同
   
    ```tsx
    type F7=()=>{name:string}
    type F8=()=>{name:string,age:number}
    let f7:F7
    let f8:F8
    f7=f8
    ```
   
    如果返回值类型是对象类型，此时成员多的可以赋值给成员少的。
   
    ::: warning 注意

    这里的`type`关键字是指给函数类型定义别名。
   
    :::
   

## 交叉类型`&`

功能类似于接口继承，用于组合多个类型为一个类型。常用于对象类型。

```tsx
interface Person {name: string}
interface Contact {phone: string}
type PersonDetail= Person & Contact
//类似于下面
type PersonDetail={name:string,phone:string}

let obj: PersonDetail={
	name:'jack',
	phone:'133...'
}
```

使用交叉类型后，新的类型PersonDetail就同时具备了Person和Contact所有属性类型。

### 交叉类型`&`和接口`extends`的对比

相同点：都可以实现对象类型的组合。

不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同。

```tsx
interface A{
	fn:(value:number)=>string
}
interface B extends A{
	fn:(value:string)=>string
}

```

```tsx
interface A{
	fn:(value:number)=>string
}
interface B{
	fn:(value:string)=>string
}
type C= A & B 
```

![Untitled 1](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081857260.png)

上述代码中，接口继承会报错（类型不能兼容）；而交叉类型没有报错，可以简单理解为：

```tsx
let c:C={
	fn:(value:string|number){
		return ''
	}
}
```

![Untitled 2](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081857665.png)

## 泛型

泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用。常用于函数、接口、类中。

举例说明，假如这里有一个需求是创建一个函数，传入什么数据就返回该数据本身（参数和返回值类型相同）。

```tsx
function id(value: number): number{return value}
```

比如`id(num)`就会返回`num`本身，但是该函数只接收数值类型，无法用于其他类型。

为了能让函数能够接受任意类型，可以将参数类型修改为`any`，但是这样就失去了TS的类型保护，类型不安全。

```tsx
function id(value:any):any{return value}
```

而泛型中在保证类型安全（不丢失类型信息）的同时，可以让函数等与多种不同类型一起工作，灵活可复用。实际上，在C++、Java等语言中，泛型编程一直是用来实现可复用组件功能代码的主要工具。

创建泛型函数：

```tsx
function id<Type>(value: Type): Type {return value}
```

上述代码中，在函数名称的后面添加`<>` ，在其他添加类型变量`Type`。类型变量`Type`是一种特殊类型的变量，它处理类型而不是值。

该类型变量相当于一个容器，能够捕获用户提供的类型，具体是什么类型由用户调用该函数时指定。

因为`Type`是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型。类型变量`Type`可以是任意合法的变量名称。

调用泛型函数：

```tsx
const num=id<number>(10)
const str=id<string>('a')
```

在函数名称的后面添加`<>`，`<>`中指定具体类型，可以是`number`，也可以是`string`。当传入类型`number`或`string`后，这个类型就会被函数声明时指定的类型变量`Type`捕获，此时`Type`的类型就是`number`或`string`。

这样，通过泛型就做到了让函数与多种不同类型一起工作，实现了复用的同时保证了类型安全。

### 简化

简化调用泛型函数：

```tsx
function id<Type>(value: Type): Type {return value}
const num=id<number>(10)
//简化
const num=id(10)
```

在调用泛型函数时，可以省略<类型>来简化泛型函数的调用。

此时，TS内部会采用一种类型参数推断的机制，来根据传入的实参自动推断出类型变量`Type`的类型。

但是当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数。

### 泛型约束

默认情况下，泛型函数的类型变量`Type`可以代表多个类型，这导致无法访问任何属性。

例如，`id('a')`调用函数时获取参数的长度：

```tsx
function id<Type>(value:Type):Type{
	console.log(value.length)
//报错
	return value
}
```

`Type`可以代表任意类型，无法保证一定存在`length`属性，此时就需要为泛型添加约束来收缩类型（缩窄类型取值范围）。

添加泛型约束收缩类型，主要有以下两种方式：

1. 指定更加具体的类型
   
    ```tsx
    function id<Type>(value:Type[]):Type[]{
    	console.log(value.length)
    	return value
    }
    ```
    
    上述代码将类型修改为Type[]，Type类型的数组，只要是数组就一定存在length属性。
    
2. 添加约束
   
    ```tsx
    interface ILength{length: number}
    function id<Type extends ILength>(value:Type):Type{
    	console.log(value.length)
    	return value
    }
    ```
    
    上述代码创建描述约束的接口ILength，该接口要求提供length属性。通过extends关键字使用该接口，为泛型（类型变量）添加约束。该约束表示：传入的类型必须具有length属性。传入的实参只要有length属性即可，符合接口的类型兼容性。
    

### 多个泛型类型变量之间的约束

泛型的类型变量可以有多个，并且类型变量之间还可以约束。

创建一个函数来获取对象中属性的值。

```tsx
function getProp<Type, Key extends keyof Type>(obj:Type,key:Key){
	return obj[key]
}

let person ={name:'jack',age:18}
getProp{person,'name'}
```

上述代码添加了第二个类型变量`Key`，两个类型变量之间使用逗号分隔。`keyof`关键字接收一个对象类型，生成其键名称（可能是字符串或者数字）的联合类型。

这个实例中`keyof Type`实际上获取的是`person`对象所有键的联合类型，也就是`'name'|'age'` 。类型变量`Key`受`Type`约束，可以理解为`Key`只能是`Type`所有键中的任意一个，或者说只能访问对象中存在的属性。

### 泛型接口

接口也可以配合泛型使用，以增加其灵活性和复用性。

```tsx
interface IdFunc<Type>{
	id:(value:Type)=>Type
	ids:()=>Type[]
}

let obj:IdFunc<number>={
	id(value){return value},
	ids(){return [1,3,5]}
}
```

上述代码在接口名称的后面添加<类型变量>，这个接口就成为了泛型接口。接口的类型变量对接口中所有的其他成员可见，也就是接口中所有成员都可以使用类型变量。

使用泛型接口时，需要显示的指定具体的类型。

实际上，JS中的数组在TS中就是一个泛型接口。

```tsx
const strs=['a','b','c']
strs.forEach
```

![Untitled 3](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081858712.png)

```tsx
const nums=[1,3,5]
nums.forEach(item=>{})
```

![Untitled 4](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081858302.png)

当我们使用数组时，TS根据数组的不同类型，来自动将类型变量设置为相应的类型。

### 泛型类

class也可以配合泛型使用。

React的class组件的基类Component就是泛型类，不同的组件有不同的props和state。

```tsx
interface IState {count: number}
interface IProps { maxLength:number}
class InputCount extends React.Component<IProps,IState>{
	state:IState={
		count:0
	}
	render(){
		return <div>{this,props.maxLength}</div>
		
	}
}
```

上述代码表示，React.Component泛型类两个类型变量，分别指定props和state类型。

创建泛型类：

```tsx
class GenericNumber<NumType>{
	defaultValue:NumType
	add:(x:NumType,y:NumType)=>NumType

	//constructor(value:NumType){
		//this.defaultValue=value
	//}
//使用构造函数时可以不用在实例化时指定类型，TS可以根据传入参数自动推断类型
}
```

类似于泛型接口，在class名称后面添加<类型变量>，这个类就变成了泛型类。此处的ad

d方法，采用的是箭头函数形式的类型书写形式。

```tsx
const myNum=new GenericNumber<number>()
myNum.defaultValue=10
```

类似于泛型接口，在创建class实例时，在类名后面通过<类型>来指定明确的类型。

### 泛型工具类型

TS内置了一些常用的工具类型，来简化TS中的一些常见操作。

它们都是基于泛型实现的（泛型适用于多种类型，更急通用），并且是内置的，可以直接在代码中使用，主要有以下：

1. **`Partial<Type>
Partial<Type>`** 用来构造一个类型，将Type所有属性设置为可选。主要转化已有的类型。
   
    ```tsx
    interface Props{
    	id:string
    	children:number[]
    }
    type PartialProps=Partial<Props>
    
    let p1:Props={
    	id:'',
    	children:[1]
    }
    let p2:PartialProps={
    	id:''
    }
    ```
   
    构造出来的新类型PartialProps结构与Props相同，但所有属性变为可选。
   
2. **`Readonly<Type>`**
`Readonly<Type>`用来构造一种类型，将Type的所有属性都设置为readonly只读。
   
    ```tsx
    interface Props{
    	id:string
    	children:number[]
    }
    type ReadonlyProps=Readonly<Props>
    
    let pops:ReadonlyProps={id:'1',children"[]}
    pops.id='2'//报错,无法修改
    ```
   
    构造出了的新类型ReadonlyProps结构和Props相同，但是所有属性都变为只读。当重新给id属性赋值时，报错：无法分配到“id”，因为是只读属性。
   
3. **`Pick<Type, Keys>`
`Pick**<Type, Key>`从Type中选择一组属性来构造新类型。
   
    ```tsx
    interface Props{
    	id:string
    	title:string
    	children:number[]
    }
    type PickProps=Pick<Props,'id'|'title'>
    ```
   
    上述代码中Pick工具类有两个类型变量：Type表示谁的属性，Key表示选择那几个属性。其中第二个类型变量，如果只选择一个则只传入该属性名即可。第二个类型变量传入的属性只能是第一个类型变量中存在的属性。构造出的新类型PickProps只有id和title两个属性。
   
4. `Record<Keys, Type>`
`Record<Keys, Type>`构造一个对象类型，属性键为Keys，属性类型是Type。
   
    ```tsx
    type RecordObj=Record<'a'|'b'|'c', string[]>
    let obj:RecordObj={
    	a:['1'],
    	b:['2'],
    	c:['3']
    }
    ```
   
    Record工具类型有两个类型变量，Keys表示对象有哪些属性，Type表示对象属性的类型。构建的新对象类型`RecordObj`表示，这个对象有三属性分别是a/b/c，属性类型都是`string[]`。
   

## 索引签名类型

绝大多数情况下，都可以在使用对象前就确定对象的结构，并为对象添加准确的类型。

使用场景：当无法确定对象中有哪些属性（或者对象中可以出现任意多个属性），此时需要索引签名类型。

```tsx
interface AnyObject{
	[key:string]: number
}
let obj:AnyObject={
	a:1,
	b:2
}
```

使用`[key:string]` 来约束该接口中允许出现的属性名称。表示只要是`string`类型的属性名称，都可以出现在对象中。这样，对象`obj`中就可以出现任意多个属性。`key`只是一个占位符，可以换成任意合法的变量名称。JavaScript中对象（`{}`）的键是string类型的。

同样，在JavaScript中数组也是一类特殊的对象，特殊在数组的键（索引）是数值类型，并且数组也可以出现任意多个元素，在数组对应的泛型接口中，也用到了索引签名类型。

```tsx
interface MyArray<T>{
	[n: number]:T
}
let arr:MyArray<number>=[1,3,5]
```

上述代码中，`MyArray`接口模拟原生的数组接口，并使用`[n:number]` 来作为索引签名类型。该索引签名类型表示：只要是`number`类型的键（索引）都可以出现在数组中，或者说数组中可以有任意多个元素。同时也符合数组索引是`number`类型这个前提。

## 映射类型

映射类型是基于旧类型创建新类型（对象类型），减少重复。

例如，类型PropKeys有x/y/z，另一个类型Type1中也有x/y/z，并且Type1中x/y/z的类型相同：

```tsx
type PropKeys='x'|'y'|'z'
type Type1={x:number;y:number;z:number}
```

这样书写方式将x/y/z书写了两次,像这种情况，可以使用映射类型来进行简化.。

```tsx
type PropKeys='x'|'y'|'z'
type Type2={[Key in PropKeys]:number}
```

映射类型是基于索引签名的，所以该语法类似于索引签名类型，使用`[]` 。

`Key in PropKeys`表示`Key`可以是`PropKeys`**联合类型**中的任意一个，类似于`for in`（`let k in obj`）。使用映射类型创建的新对象类型`Type2`和类型`Type1`结构完全相同。**映射类型只能在类型别名中使用，不能在接口中使用。**

```tsx
interface Type3{
	[Key in PropKeys]:number
}//报错
```

映射类型除了根据联合类型创建新类型外，还可以根据**对象类型**来创建：

```tsx
type Props ={a:number;b:string;c:boolean}
type Type3={[Key in keyof Props]:number}
```

首先先执行keyof Props获取到对象类型Props中所有键的联合类型，`'a'|'b'|'c'` 。

然后`Key in...` 表示`Key`可以是`Props`中所有键名称中的任意一个。

## 分析泛型工具类型Partial的实现

实际上，上述的泛型工具类型都是基于映射类型实现的。比如，`Partial<Type>`的实现。

```tsx
type Partial<T> ={
	[P in keyof T]?: T[P]
}
type Props={a:number;b:string;c:boolean}
type PartialProps=Partial<Props>
```

`keyof T`即`keyof Props`表示获取`Props`的所有键，也就是`'a'|'b'|'c'` 。在`[]`后面添加?表示将这些属性变为可选的，以此实现`Partial`的功能。冒号后面的`T[P]`表示获取`T`中每个键对应的类型。最终，新类型`PartialProps`和旧类型`Props`结构完全相同，只是让所有类型都变为可选的。

## 索引查询类型

`T[P]`语法，在TS中叫做索引查询（访问）类型，作用是用来查询属性的类型。

```tsx
type Props={a:number;b:string;c:boolean}

type TypeA=Props['a']
//type TypeA=number
```

`Props['a']` 表示查询类型Props中属性`'a'` 对应的类型是`number`，`[]`中的属性必须要存在于被查询类型中，否则报错。

索引查询类型还可以同时查询多个索引的类型。

```tsx
type Props={a:number;b:string;c:boolean}

type TypeA=Props['a'|'b']
//string | number
```

使用字符串字面量的联合类型，获取属性a和b对应的类型结果是`string | number` 。

```tsx
type TypeA=Props[keyof Props]
//string | number | boolean
```

使用keyof操作符获取Props中所有键对应的类型，结果是`string | number | boolean` 。

# 类型声明文件

## 概述

如今几乎所有的JavaScript应用都会引入许多第三方库来完成任务需求。这写第三方库无论是否是TS编写，最终都要编译成JS代码，才能发布使用。

TS提供了类型，才有了代码提示和类型保护等机制。但在项目开发中使用第三方库时，它们几乎都有相对应的TS类型，这些类型如何来的？

## TS的两种文件类型

TS中有两种文件类型，`.ts`文件和`.d.ts`文件。

- .ts文件
    - 既包含类型信息又可执行代码
    - 可以被编译成.js文件，然后执行代码
    - 用于编写程序代码的地方
- .d.ts文件
    - 只包含类型信息的类型声明文件
    - 不会生成.js文件，仅用于提供类型信息
    - 用于为JS提供类型信息

.ts文件是implementation代码实现文件，.d.ts是declaration类型声明文件。

## 类型声明文件

类型声明文件是用来为已存在的JS库提供类型信息，即`index.d.ts`文件。

在使用TS开发项目时，类型声明文件的使用包括以下两种方式：

- 使用已有的类型声明文件
- 创建自己的类型声明文件

### 使用已有的类型声明文件

1. 内置类型声明文件
TS为JS运行时可用的所有标准化内置API都提供了声明文件。
比如在使用数组时，数组所有方法都会有相应的代码提示以及类型信息：
   
   ![Untitled 5](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081900246.png)
   
    实际上这都是TS提供的内置类型声明文件。
    可以通过Ctrl+鼠标左键来查看内置类型声明文件内容。
   
    比如查看forEach方法的类型声明，在VSCode中自动跳转到lib.es5.d.ts类型声明文件中。像window、document等BOM、DOM  API也有相应的类型声明lib.dom.d.ts。
   
2. 第三方库的类型声明文件
目前几乎所有的第三方库都有相应的类型声明文件。第三方库的类型声明文件有两种存在形式：
    - 库自带类型声明文件
    例如axios
       
       ![Untitled 6](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081900171.png)
       
        这种情况下正常导入该库，TS就会自动加载库自己的类型声明文件，以提供该库的类型声明。
       
        在axios库中的package.json文件中有对类型声明文件的配置项：`"typings":"./index.d.ts"` 。
       
       ![Untitled 7](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081900106.png)
       
    - 由DefinitelyTyped提供
    DefinitelyTyped是一个github仓库，用来提供高质量的TypeScript类型声明。
    可以通过npm/yarn来下载该仓库的TS类型声明包，这些包的名称格式为：`@types/*`。比如`@types/react`、`@types/lodash`等。
    在实际开发式，如果使用的第三方库没有自带的声明文件，VSCode会给出明确的提示信息。
       
       
        ![Untitled 8](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081901559.png)
       
        ![Untitled 9](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081901254.png)
       
        ![Untitled 10](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308081901085.png)
       
        当安装`@types/*` 类型声明包后，TS也会自动加载该类声明包，以提供该库的类型声明。
       
        TS官网提供了DOC文档可以查询对应的`@types/*`库。[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
       

### 创建自己的类型声明文件

1. 项目内共享类型
如果多个.ts文件中都用到同一类型，此时可以创建.d.ts文件提供该类型，实现类型共享。
操作步骤：
   
    1. 创建index.d.ts类型声明文件
    2. 创建需要共享的类型，并使用export导出，TS中的类型也可以使用import/export实现模块化功能。
    3. 在需要使用共享类型的.ts文件中，通过import导入即可，.d.ts后缀导入时可以直接忽略。
   
    例如：
   
    ```tsx
    type Props={x:number;y:string}
    export {Props}
    ```
   
    ```tsx
    import {Props} from "./index"
    let p1:Props={
    	x:1,
    	y:'a'
    }
    ```
   
    ```tsx
    import {Props} from "./index"
    let p2:Props={
    	x:2,
    	y:'b'
    }
    ```
   
2. 为已有的JS文件提供类型声明
    1. 在JS项目迁移到TS项目时，为了让已有的.js文件有类型声明。
    2. 成为库作者，创建库为其他人使用。
    
    ::: warning 注意

    类型声明文件的编写与模块化方式相关，不同的模块化方式有不同的写法。JS模块化的发展历经多种变化（AMD、CommonJS、UMD、ESModule等），而TS支持各种模块化形式的类型声明。这就导致类型声明文件[相关内容](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)又多又杂。
    
    :::
    
    TS项目中也可以使用.js文件，在导入.js文件时，TS会自动加载与.js同名的.d.ts文件，以提供类型声明。
    
    declare关键字：用于类型声明，为其他地方（.js文件）已存在的变量声明类型而不是创建一个新的变量。
    
    - 对于type、interface等明确是TS类型只能在TS中使用的，可以省略declare关键字。
    - 对于let、function等具有双层含义（js、ts都能使用）应该使用declare关键字，明确指定此处用于类型声明
    
    举例：
    
    ```tsx
    import {count,name,position,add,changeDirection,formartPoint} from "./utils"
    //使用上述属性和方法
    ```
    
    ```tsx
    //js内容
    let count=10
    let name='凌晨三点的修狗'
    let position={
    	x:0,
    	y:0
    }
    function add(x,y){
    	return x+y
    }
    function changeDirection(direction){
    	console.log(direction)
    }
    const formartPoint=point=>{
    	console.log(point)
    }
    export{count,name,position,add,changeDirection,formartPoint}
    ```
    
    ```tsx
    //为utils.js提供类型声明
    declare let count: number
    declare let name: string
    interface Point{
    	x:number
    	y:number
    }
    declare let position: Point
    declare function add(x:number,y:number):number
    declare function changeDirection(
    	direction: 'up'|'down'|'left'|'right'
    ):void
    type FomartPoint=(point:Point)=>void
    declare const fomartPoint: FomartPoint
    //注意：类型提供好以后，需要使用模块化方案中提供的模块化
    //语法来导出声明好的类型，然后才能在其他的.ts文件中使用
    export {count,name,position,add,changeDirection,formartPoint}
    ```