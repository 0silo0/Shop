import React, { useState, useEffect } from 'react';
import './Calc.css';

function Calc() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [output, setOutput] = useState('');

  // Массив допустимых символов для каждой системы счисления
  const validChars = {
    2: '01',
    3: '012',
    4: '0123',
    5: '01234',
    6: '012345',
    7: '0123456',
    8: '01234567',
    9: '012345678',
    10: '0123456789',
    11: '0123456789A',
    12: '0123456789AB',
    13: '0123456789ABC',
    14: '0123456789ABCD',
    15: '0123456789ABCDE',
    16: '0123456789ABCDEF',
  };

  // Обработка нажатия цифровых кнопок
  const handleButtonClick = (value) => {
    if (validChars[fromBase].includes(value)) {
      setInput((prevInput) => prevInput + value);
    }
  };

  // Удаление последнего символа
  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  // Очистка поля ввода
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  // Конвертация числа
  const handleConvert = () => {
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) {
        setOutput('Ошибка ввода');
        return;
      }
      const result = decimal.toString(toBase).toUpperCase();
      setOutput(result);
    } catch (error) {
      setOutput('Ошибка конвертации');
    }
  };

  // Обработка ввода с клавиатуры
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (validChars[fromBase].includes(key)) {
      setInput((prevInput) => prevInput + key);
    } else if (key === 'BACKSPACE') {
      handleDelete();
    } else if (key === 'ENTER') {
      handleConvert();
    }
  };

  // Вешаем и убираем обработчик события для клавиатуры
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fromBase, input]);

  return (
    <div className="calculator">
        <div className="calc">
            <div className="calc-screen">
            <div className="input-field">{input || '0'}</div>
            <span className="parameters">
                <select value={fromBase} onChange={(e) => setFromBase(parseInt(e.target.value))}>
                {Array.from({ length: 15 }, (_, i) => i + 2).map((base) => (
                    <option key={base} value={base}>
                    {base}
                    </option>
                ))}
                </select>
                <select value={toBase} onChange={(e) => setToBase(parseInt(e.target.value))}>
                {Array.from({ length: 15 }, (_, i) => i + 2).map((base) => (
                    <option key={base} value={base}>
                    {base}
                    </option>
                ))}
                </select>
            </span>
            <div className="output-field">{output}</div>
            </div>

            <span className="buttons">
            <div className="number-buttons">
                {['7', '8', '9', 'F', '4', '5', '6', 'E', '1', '2', '3', 'D', '0', 'A', 'B', 'C'].map(
                (num) => (
                    <div key={num} className="btn light" onClick={() => handleButtonClick(num)}>
                    {num}
                    </div>
                )
                )}
            </div>
            <div className="action-buttons">
                <div className="btn dark" onClick={handleDelete}>
                del
                </div>
                <div className="btn dark" onClick={handleClear}>
                AC
                </div>
                <div className="btn dark" onClick={handleConvert}>
                =
                </div>
            </div>
            </span>
        </div>
    </div>
  );
}

export default Calc;
