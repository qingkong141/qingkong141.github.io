---
title: js中的数据类型检测
date: 2021-4-22
sidebar: 'auto'
publish: false
---

  + **简单数据类型(原始类型)**
    + undefined 
    + Null
    + Boolean
    + String
    + Number
    + symbol

  + **引用类型**
    + Object
    + Array
    + Set
    + Map

  + **typeof**
     ``` javascript
          console.log(typeof null) // object
          console.log(typeof [1,2]) // object
      ```
      1.  当检测null时,得到的结果为object(逻辑上讲,null值表示一个空对象指针,这也是typeof null 会返回"object"的原因);   
      2.  引用类型只能检测得到结果为object(包括:日期,数组,正则等);  
      3.  严格来讲,函数在ECMAScript中被认为是对象,并不代表一种数据类型,可是函数也有自己特殊的属性;为此,就有必要通过typeof操作符来区分函数和其他对象;  
  + **instanceof**
      + 原理: 只要当前类出现在现在实例的原型链上,结果就为true(实例.\_\_proto\_\_ === 类.prototype)
      1. 不能检测基本数据类型;  
      2. 由于能够手动修改原型链的指向,所以结果可能不准确; 
      3. 写函数实现 instanceof
      ``` javascript
        function cloneInstanceof(example,category) {
            let   categoryProtoType = category.prototype,
            proto = Object.getPrototypeOf(example)  // getPrototypeOf兼容IE
            while(true) {
              if( proto === null) return false  
              if(proto === categoryProtoType) return true
              proto = Object.getPrototypeOf(proto)
            }
        }
        console.log(cloneInstanceof([1,2],Array)) // true
        console.log(cloneInstanceof([1,2],Object)) // true
      ```
  + **constructor**
      1. 可以检测基本类型;  
      2. 可以修改prototype上的constructor ,所以检测结果也不准备
      ```js
          let num= 1
          console.log(num.constructor === Number); // true
          Number.prototype.constructor = 'String'
          console.log(num.constructor === Object); // false
      ```
  + **Object.prototype.toString.call(\[value\])**
    + Object.prototype.toString 返回当前实例所属类的信息,并不是转换成字符串;  
    + 能检测出所有类型( "Boolean Number String Function Array Date RegExp Object Error Symbol" )

  + **总结**
    ```js
      (function () {
      let calss2type = {};
      var toString = calss2type.toString;
      'Boolean Number String Function Array Date RegExp Object Error Symbol'
        .split(' ')
        .forEach((name) => {
          calss2type[`[object ${name}]`] = name.toLowerCase();
        });
      function toType(obj) {
        // 传递的值是undefined 或者 null 都能返回对应的类型
        if (obj == null) return obj + '';
        // 基本类型 使用typeof 检测 其他的
        return typeof obj === 'object' || typeof obj === 'function'
          ? calss2type[toString.call(obj)] || 'object'
          : typeof obj;
      }
      window.toType = toType;
    })();
    console.log(toType(1)); //number
    console.log(toType([])); // array
    console.log(toType({})); // object
    console.log(toType(function () {})); //function
    console.log(toType(new Date())); // date
    ```