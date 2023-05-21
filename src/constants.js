const FORWARD = "Развертывание",
  BACK = "Свертывание";

const decodeString = (input) => {
  let output = "";
  let i = 0;

  while (i < input.length) {
    if (input[i] === "\\") {
      let nextChar = input[i + 1];
      output += nextChar;
      i += 2;
    } else {
      if (isNaN(input[i])) {
        output += input[i];
        i++;
      } else if (input[i] === " ") {
        output += input[i];
        i++;
      } else if (!isNaN(input[i])) {
        if (output.length) {
          output += output[output.length - 1].repeat(Number(input[i]) - 1);
          i++;
        } else throw "1";
      }
    }
  }

  return output;
};

const encodeString = (input) => {
  let output = "";
  let i = 0;
  let count = 1;

  while (i < input.length) {
    if (input[i] === input[i - 1]) {
      count += 1;
      i++;
    } else {
      if (input[i] === "\\") {
        if (count === 1) {
          output += "\\" + input[i];
          i++;
        } else {
          output += count;
          output += "\\" + input[i];
          count = 1;
          i++;
        }
      } else if (!isNaN(input[i]) && input[i] !== " ") {
        if (count === 1) {
          output += "\\" + input[i];
          i++;
        } else {
          output += count;
          output += "\\" + input[i];
          count = 1;
          i++;
        }
      } else if (isNaN(input[i])) {
        if (count === 1) {
          output += input[i];
          i++;
        } else {
          output += count;
          output += input[i];
          count = 1;
          i++;
        }
      } else if (input[i] === " ") {
        if (count === 1) {
          output += input[i];
          i++;
        } else {
          output += count;
          output += input[i];
          count = 1;
          i++;
        }
      }
    }
  }

  if (count > 1) {
    output += count;
  }

  return output;
};

const convertStringForward = (value) =>
  convertStringBase(FORWARD, value, decodeString);

const convertStringBack = (value) =>
  convertStringBase(BACK, value, encodeString);

const convertStringBase = (title, value, func) => {
  const record = {
    title,
    date: new Date().toLocaleString(),
    text: "",
    success: true,
    value,
  };
  try {
    record.text = func(value);
  } catch (e) {
    if (e === "1") {
      record.text = "Некорректная строка";
      record.success = false;
    }
  }
  const prevActions = JSON.parse(localStorage.getItem("actionsList") || "[]");
  localStorage.setItem("actionsList", JSON.stringify([...prevActions, record]));

  const { text, success } = record;

  return { text, success };
};

export const conversionForwardProps = {
  convertString: convertStringForward,
  title: FORWARD,
  description:
    "На данной странице вы можете использовать встроенную функцию для преобразования строки формата xxNxNxxx\\N в развернутую строку, где x - любая буква алфавита(английская), N - любое число от 1 до 9, а обратный слеш \\ является экранирующим, т.е. делает следующий символ неизменным. \n Строка будет 'Развернута', т.е. цифра будет повторять символ перед ней N раз, в случае, если она не экранируется, а буква, не имеющая после себя цифры, будет просто помещена в итоговую строку(если это число - оно не будет повторять предыдущий символ, а просто останется числом, а если это обратный слэш - то он просто будет отображен, не экранируя следующий символ). В случае, если перед N отсутствует какой-либо символ, и она не экранируется, заданная строка будет считаться некорректной, т.к. цифре будет нечего повторять. \n Пример: строка 'ab6c8\\56' будет преобразована в строку 'abbbbbbcccccccc555555'",
};

export const conversionBackProps = {
  convertString: convertStringBack,
  title: BACK,
  description:
    "На данной странице вы можете использовать встроенную функцию для преобразования строки формата xxxxN\\\\\\xxN в свернутую строку, где x - любая буква алфавита(английская), N - любое число от 1 до 9, а первый обратный слеш \\ является экранирующим, т.е. делает следующий символ неизменным. \n Строка будет 'Свернута', т.е. любая буква x(английский алфавит), которая повторяется более 1 раза подряд, будет преобразована в xN, где N - количество повторений буквы x, а в случае наличия цифры в строке, она будет выводиться в итоговую строку с добавлением перед ней экранирующего символа \\. То же самое будет работать и с обратным слэшем \\. \n Пример: строка '5bnnn\\gg3\\\\\\\\' будет преобразована в строку '\\5bn3\\\\g2\\3\\\\4'",
};
