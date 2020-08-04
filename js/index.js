let app = new Vue({
  el: ".pwd_box",
  data: {
    // 判断是否开启选项
    y_upper: true,
    y_lower: true,
    y_number: true,
    y_symbol: false,
    //长度
    y_length: 8,
    // 显示密码
    y_password: "",
    // 密码数组
    numArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    upperArr: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    lowerArr: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    symArr: ["_", "-", "$", "%", "&", "@", "+", "!"],

    isCopyText: true,
  },

  methods: {
    isCopy() {
      document.querySelector("#pwd").select();

      if (
        this.y_password != "" &&
        (this.y_upper || this.y_lower || this.y_number || this.y_symbol)
      ) {
        document.execCommand("Copy");
        alert("复制成功");
      }
    },
    // 获取随机数字

    getUpper() {
      return this.getFunc(this.upperArr);
    },
    getLower() {
      return this.getFunc(this.lowerArr);
    },
    getNumber() {
      return this.getFunc(this.numArr);
    },
    getSymbol() {
      return this.getFunc(this.symArr);
    },

    //封装
    getFunc(type) {
      // 获取传过来的密码类型的数字索引值
      let x = Math.floor(Math.random() * type.length);
      //   返回该类型的索引值为x的元素
      return type[x];
    },

    // y_upper: true,
    // y_lower: true,
    // y_number: true,
    // y_symbol: false,

    isUpper() {
      this.y_upper = !this.y_upper;
    },
    isLower() {
      this.y_lower = !this.y_lower;
    },
    isNumber() {
      this.y_number = !this.y_number;
    },
    isSymbol() {
      this.y_symbol = !this.y_symbol;
    },

    // 点击
    submit() {
      // 获取调用取得单个密码的集合
      let getRandomPwd = {
        upper: this.getUpper,
        lower: this.getLower,
        number: this.getNumber,
        symbol: this.getSymbol,
      };

      this.y_password = createPwd(
        this.y_length,
        this.y_upper,
        this.y_lower,
        this.y_number,
        this.y_symbol
      );

      function createPwd(length, upper, lower, number, symbol) {
        //创建临时变量 接受临时密码
        let createPwd = "";
        // 判断激活了多少个选项
        let typeCount = upper + lower + number + symbol;
        // 判断具体激活的选项
        let activeTypeArr = [
          { upper },
          { lower },
          { number },
          { symbol },
        ].filter(function (item) {
          return Object.values(item)[0];
        });
        if (typeCount === 0) {
          alert("请至少选择一项");
          return;
        }
        // 循环遍历密码 根据长度循环
        for (let i = 0; i < length; i++) {
          activeTypeArr.forEach(function (type) {
            // 获取键名
            let typeName = Object.keys(type)[0];
            // 根据键名创建相应密码
            // console.log(typeName);

            createPwd += getRandomPwd[typeName]();
          });
        }
        return createPwd.slice(0, length);
        // console.log(createPwd.slice(0,length))
        // console.log(createPwd);
        // console.log(activeTypeArr);
      }
    },
  },
});
