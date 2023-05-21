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

  return record;
};

export const conversionForwardProps = {
  convertString: convertStringForward,
  title: FORWARD,
  description: (
    <span style={{ whiteSpace: "pre-wrap" }}>
      {
        'На данной странице вы можете использовать встроенную функцию для преобразования строки содержащей любой набор из следующих символов:\n- любой нечисловой символ\n- [1-9]\n- "\\"\nЦифры и "\\" могут быть "активными".\n"Активный" "\\" превращает любой "активный" символ в "неактивный", а сам из строки удаляется.\n"Активная" цифра повторяет предыдущий символ в строке по своему значению, а сама из строки удаляется.\nПреобразование невозможно, если цифра - первый символ в строке (ей попросту нечего повторять).\nПример: строка "ab6c8\\56" будет преобразована в строку "abbbbbbcccccccc555555"'
      }
    </span>
  ),
};

export const conversionBackProps = {
  convertString: convertStringBack,
  title: BACK,
  description: (
    <span style={{ whiteSpace: "pre-wrap" }}>
    {
      'На данной странице вы можете использовать встроенную функцию для преобразования строки содержащей любой набор из следующих символов:\n - любой нечисловой символ\n - [1-9]\n - "\\"\nСимвол "\\" и число N преобразуются в "\\\\" и в "\\N" соответственно.\nЕсли любой символ, например "а", повторяется N раз, то вся эта подстрока преобразуется в "аN".\nПример: строка "5bnnn\\gg3\\\\\\\\" будет преобразована в строку "\\5bn3\\\\g2\\3\\\\4"' 
    }
  </span>
  )
    };
